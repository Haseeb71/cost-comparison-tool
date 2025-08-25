import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug,
      description,
      short_description,
      logo_url,
      website_url,
      category_id,
      vendor_id,
      pricing_model,
      starting_price,
      pricing_currency,
      pricing_period,
      features,
      use_cases,
      integrations,
      supported_platforms,
      api_available,
      free_trial,
      trial_days,
      is_featured,
      is_published,
      affiliate_url,
      affiliate_commission,
      meta_title,
      meta_description
    } = body

    if (!name || !slug || !short_description) {
      return NextResponse.json({ error: "Name, slug, and short description are required" }, { status: 400 })
    }

    const toolData = {
      name,
      slug,
      description,
      short_description,
      logo_url,
      website_url,
      category_id: category_id || null,
      vendor_id: vendor_id || null,
      pricing_model: pricing_model || "freemium",
      starting_price: starting_price ? parseFloat(starting_price) : null,
      pricing_currency: pricing_currency || "USD",
      pricing_period: pricing_period || "monthly",
      features: features || [],
      use_cases: use_cases || [],
      integrations: integrations || [],
      supported_platforms: supported_platforms || [],
      api_available: api_available || false,
      free_trial: free_trial || false,
      trial_days: trial_days ? parseInt(trial_days) : null,
      is_featured: is_featured || false,
      is_published: is_published !== undefined ? is_published : true,
      affiliate_url: affiliate_url || null,
      affiliate_commission: affiliate_commission ? parseFloat(affiliate_commission) : null,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("tools")
      .update(toolData)
      .eq("id", params.id)
      .select(`
        *,
        category:categories(id, name, slug),
        vendor:vendors(id, name, slug)
      `)
      .single()

    if (error) {
      if (error.code === "23505") { // Unique constraint violation
        return NextResponse.json({ error: "Tool with this name or slug already exists" }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if tool has reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("id")
      .eq("tool_id", params.id)
      .limit(1)

    if (reviewsError) {
      return NextResponse.json({ error: reviewsError.message }, { status: 500 })
    }

    if (reviews && reviews.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete tool that has reviews. Please delete the reviews first." 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from("tools")
      .delete()
      .eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Tool deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
