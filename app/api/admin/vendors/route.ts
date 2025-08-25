import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: vendors, error } = await supabase
      .from("vendors")
      .select("*")
      .order("name")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(vendors)
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
    const { name, slug, description, website_url, logo_url, founded_year, headquarters } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    const vendorData = {
      name,
      slug,
      description: description || null,
      website_url: website_url || null,
      logo_url: logo_url || null,
      founded_year: founded_year ? parseInt(founded_year) : null,
      headquarters: headquarters || null
    }

    const { data, error } = await supabase
      .from("vendors")
      .insert([vendorData])
      .select()
      .single()

    if (error) {
      if (error.code === "23505") { // Unique constraint violation
        return NextResponse.json({ error: "Vendor with this name or slug already exists" }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
