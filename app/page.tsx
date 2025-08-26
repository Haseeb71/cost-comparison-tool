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
  const supabase = await createClient()
  const params = await searchParams

  // Get categories for filters
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  // Get featured tools
  const { data: featuredTools } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(name, slug),
      vendor:vendors(name, slug)
    `)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("rating", { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />

        <Suspense fallback={<div className="py-16 px-4 text-center">Loading...</div>}>
          <AnimatedSections 
            featuredTools={featuredTools || []} 
            categories={categories || []} 
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
