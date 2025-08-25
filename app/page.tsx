import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { FeaturedTools } from "@/components/featured-tools"
import { CategoryGrid } from "@/components/category-grid"
import { ToolsGrid } from "@/components/tools-grid"
import { SearchAndFilters } from "@/components/search-and-filters"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"

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

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured AI Tools</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturedTools tools={featuredTools || []} />
            </Suspense>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <CategoryGrid categories={categories || []} />
            </Suspense>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All AI Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover and compare thousands of AI tools across different categories
              </p>
            </div>

            <SearchAndFilters categories={categories || []} />

            <Suspense fallback={<LoadingSpinner />}>
              <ToolsGrid searchParams={Promise.resolve(params)} />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
