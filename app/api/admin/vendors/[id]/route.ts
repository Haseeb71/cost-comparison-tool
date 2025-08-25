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
      headquarters: headquarters || null,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("vendors")
      .update(vendorData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      if (error.code === "23505") { // Unique constraint violation
        return NextResponse.json({ error: "Vendor with this name or slug already exists" }, { status: 400 })
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

    // Check if vendor has tools
    const { data: tools, error: toolsError } = await supabase
      .from("tools")
      .select("id")
      .eq("vendor_id", params.id)
      .limit(1)

    if (toolsError) {
      return NextResponse.json({ error: toolsError.message }, { status: 500 })
    }

    if (tools && tools.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete vendor that has tools. Please reassign or delete the tools first." 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from("vendors")
      .delete()
      .eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Vendor deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
