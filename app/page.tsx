import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { AnimatedSections } from "@/components/animated-sections"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; pricing?: string }>
}) {
  try {
    const supabase = await createClient()
    const params = await searchParams

    // Get categories for filters
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .order("name")

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError)
    }

    // Get featured tools with new schema - handle missing overall_score field
    let { data: featuredTools, error: featuredError } = await supabase
      .from("tools")
      .select(`
        *,
        category:categories(name, slug),
        vendor:vendors(name, slug)
      `)
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("rating", { ascending: false }) // Use rating instead of overall_score
      .limit(12)

    if (featuredError) {
      console.error("Error fetching featured tools:", featuredError)
    }

    // If no featured tools, get any published tools as fallback
    if (!featuredTools || featuredTools.length === 0) {
      console.log("No featured tools found, fetching any published tools...")
      const { data: fallbackTools, error: fallbackError } = await supabase
        .from("tools")
        .select(`
          *,
          category:categories(name, slug),
          vendor:vendors(name, slug)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(12)

      if (fallbackError) {
        console.error("Error fetching fallback tools:", fallbackError)
      } else {
        featuredTools = fallbackTools
        console.log(`Found ${fallbackTools?.length || 0} fallback tools`)
      }
    }

    // If still no tools, try to get ANY tools regardless of flags
    if (!featuredTools || featuredTools.length === 0) {
      console.log("Still no tools found, fetching ALL tools...")
      const { data: allTools, error: allToolsError } = await supabase
        .from("tools")
        .select(`
          *,
          category:categories(name, slug),
          vendor:vendors(name, slug)
        `)
        .order("created_at", { ascending: false })
        .limit(12)

      if (allToolsError) {
        console.error("Error fetching all tools:", allToolsError)
      } else {
        featuredTools = allTools
        console.log(`Found ${allTools?.length || 0} total tools`)
      }
    }

    // Get a sample of tools for the search section
    const { data: sampleTools, error: sampleError } = await supabase
      .from("tools")
      .select(`
        *,
        category:categories(name, slug),
        vendor:vendors(name, slug)
      `)
      .eq("is_published", true)
      .order("rating", { ascending: false })
      .limit(8)

    if (sampleError) {
      console.error("Error fetching sample tools:", sampleError)
    }

    // Debug logging
    console.log("=== DEBUG INFO ===")
    console.log("Featured tools count:", featuredTools?.length || 0)
    console.log("Sample tools count:", sampleTools?.length || 0)
    console.log("Categories count:", categories?.length || 0)
    
    // Log first tool for debugging
    if (featuredTools && featuredTools.length > 0) {
      console.log("First tool data:", {
        id: featuredTools[0].id,
        name: featuredTools[0].name,
        is_published: featuredTools[0].is_published,
        is_featured: featuredTools[0].is_featured,
        category: featuredTools[0].category,
        vendor: featuredTools[0].vendor
      })
    } else {
      console.log("No tools found in featuredTools")
    }

    return (
      <div className="min-h-screen bg-gray-900">
        <Header />

        <main>
          <Hero />

          <Suspense fallback={<div className="py-16 px-4 text-center text-white">Loading...</div>}>
            <AnimatedSections 
              featuredTools={featuredTools || []} 
              sampleTools={sampleTools || []}
              categories={categories || []} 
            />
          </Suspense>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error in HomePage:", error)
    
    // Return a fallback UI if there's an error
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          <Hero />
          <div className="py-16 px-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300">We're experiencing some technical difficulties. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
