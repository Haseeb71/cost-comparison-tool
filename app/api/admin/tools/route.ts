import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: tools, error } = await supabase
      .from("tools")
      .select(`
        *,
        category:categories(id, name, slug),
        vendor:vendors(id, name, slug)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(tools)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
      meta_description: meta_description || null
    }

    const { data, error } = await supabase
      .from("tools")
      .insert([toolData])
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

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
