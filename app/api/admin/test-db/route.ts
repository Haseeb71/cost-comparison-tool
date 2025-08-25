import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test basic connection and table existence
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name")
      .limit(1)

    if (categoriesError) {
      return NextResponse.json({ 
        error: "Categories table access failed", 
        details: categoriesError.message,
        code: categoriesError.code,
        hint: categoriesError.code === 'PGRST116' ? 'Table might not exist' : 'Other database error'
      }, { status: 500 })
    }

    // Test vendors table
    const { data: vendorsData, error: vendorsError } = await supabase
      .from("vendors")
      .select("id, name")
      .limit(1)

    if (vendorsError) {
      return NextResponse.json({ 
        error: "Vendors table access failed", 
        details: vendorsError.message,
        code: vendorsError.code
      }, { status: 500 })
    }

    // Test tools table
    const { data: toolsData, error: toolsError } = await supabase
      .from("tools")
      .select("id, name")
      .limit(1)

    if (toolsError) {
      return NextResponse.json({ 
        error: "Tools table access failed", 
        details: toolsError.message,
        code: toolsError.code
      }, { status: 500 })
    }

    return NextResponse.json({ 
      message: "All database tables accessible",
      categoriesCount: categoriesData?.length || 0,
      vendorsCount: vendorsData?.length || 0,
      toolsCount: toolsData?.length || 0
    })
  } catch (error) {
    return NextResponse.json({ 
      error: "Unexpected error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
