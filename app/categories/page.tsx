import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryGrid } from "@/components/category-grid"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import {
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Tools Categories - Browse by Type",
  description: "Explore AI tools organized by category. Find the perfect AI solution for writing, image generation, coding, analytics, and more.",
  keywords: ["AI tools", "categories", "artificial intelligence", "software", "comparison"],
  openGraph: {
    title: "AI Tools Categories - Browse by Type",
    description: "Explore AI tools organized by category. Find the perfect AI solution for writing, image generation, coding, analytics, and more.",
    type: "website",
  },
}

export default async function CategoriesPage() {
  const supabase = await createClient()

  // Get all categories
  const { data: categories } = await supabase
    .from("categories")
    .select(`
      *,
      tools:tools(count)
    `)
    .order("name")

  // Generate structured data
  const collectionSchema = generateCollectionPageSchema(
    { name: "AI Tools Categories", description: "Browse AI tools by category" },
    categories || []
  )
  const breadcrumbItems = [{ name: "Categories", href: "/categories" }]
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: `https://aitoolshub.com${item.href}`,
    }))
  )

  return (
    <div className="min-h-screen bg-gray-900">
      <StructuredData data={[collectionSchema, breadcrumbSchema]} />
      <Header />
      
      <main className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { name: "Home", href: "/" },
              { name: "Categories", href: "/categories" }
            ]} 
          />
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Tools Categories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive collection of AI tools organized by category. 
              Find the perfect solution for your specific needs and use cases.
            </p>
          </div>

          {/* Categories Grid */}
          <CategoryGrid categories={categories || []} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
