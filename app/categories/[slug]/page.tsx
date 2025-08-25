import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import {
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
} from "@/lib/seo"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: { slug: string }
  searchParams: { page?: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { data: category } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    }
  }

  const title = generateMetaTitle(`${category.name} - AI Tools`)
  const description = generateMetaDescription(
    category.description || `Discover the best ${category.name.toLowerCase()} for your needs`,
  )
  const canonical = generateCanonicalUrl(`/categories/${category.slug}`)

  return {
    title,
    description,
    keywords: [category.name, "AI tools", "artificial intelligence", "software", "comparison"],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const supabase = await createClient()

  // Get category
  const { data: category, error } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (error || !category) {
    notFound()
  }

  // Get tools in this category
  const { data: tools } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(name, slug),
      vendor:vendors(name, slug)
    `)
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false })

  // Generate structured data
  const collectionSchema = generateCollectionPageSchema(category, tools || [])
  const breadcrumbItems = [
    { name: "Categories", href: "/categories" },
    { name: category.name, href: `/categories/${category.slug}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: `https://aitoolshub.com${item.href}`,
    })),
  )

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={[collectionSchema, breadcrumbSchema]} />
      <Header />
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems.slice(0, -1)} />
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{category.icon || "🤖"}</div>
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
            <div className="mt-4">
              <span className="text-muted-foreground">
                {tools?.length || 0} tool{tools?.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>

          {tools && tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool: any) => (
                <div key={tool.id}>
                  {/* Tool card component would go here */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.short_description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground">We haven't added any tools to this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
