import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: categories, error } = await supabase
      .from("categories")
      .select(`
        *,
        tools:tools(count)
      `)
      .order("name")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/admin/categories called")
    
    const supabase = await createClient()
    console.log("Supabase client created")
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.log("Auth error:", authError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.log("User authenticated:", user.email)

    const body = await request.json()
    console.log("Request body:", body)
    
    const { name, slug, description, icon } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    console.log("Inserting category:", { name, slug, description, icon })

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, slug, description, icon }])
      .select()
      .single()

    if (error) {
      console.log("Database error:", error)
      if (error.code === "23505") { // Unique constraint violation
        return NextResponse.json({ error: "Category with this name or slug already exists" }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("Category created successfully:", data)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.log("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
