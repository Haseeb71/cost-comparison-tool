import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolDetail } from "@/components/tool-detail"
import { RelatedTools } from "@/components/related-tools"
import { ToolReviews } from "@/components/tool-reviews"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import {
  generateSoftwareApplicationSchema,
  generateReviewSchema,
  generateBreadcrumbSchema,
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
} from "@/lib/seo"
import type { Metadata } from "next"

interface ToolPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { data: tool } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(name, slug),
      vendor:vendors(name, slug)
    `)
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!tool) {
    return {
      title: "Tool Not Found",
      robots: { index: false, follow: false },
    }
  }

  const title = generateMetaTitle(tool.meta_title || tool.name)
  const description = generateMetaDescription(tool.meta_description || tool.short_description || tool.description)
  const canonical = generateCanonicalUrl(`/tools/${tool.slug}`)

  return {
    title,
    description,
    keywords: [
      tool.name,
      ...(tool.features || []),
      ...(tool.use_cases || []),
      tool.category?.name,
      tool.vendor?.name,
      "AI tool",
      "artificial intelligence",
    ].filter(Boolean),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: tool.logo_url
        ? [
            {
              url: tool.logo_url,
              width: 400,
              height: 400,
              alt: `${tool.name} logo`,
            },
          ]
        : undefined,
      publishedTime: tool.created_at,
      modifiedTime: tool.updated_at,
      authors: tool.vendor?.name ? [tool.vendor.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: tool.logo_url ? [tool.logo_url] : undefined,
    },
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const supabase = await createClient()

  // Get tool details
  const { data: tool, error } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(id, name, slug),
      vendor:vendors(id, name, slug, website_url),
      pricing_plans(*)
    `)
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (error || !tool) {
    notFound()
  }

  // Get reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("tool_id", tool.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get related tools
  const { data: relatedTools } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(name, slug),
      vendor:vendors(name, slug)
    `)
    .eq("category_id", tool.category_id)
    .neq("id", tool.id)
    .eq("is_published", true)
    .limit(4)

  // Generate structured data
  const toolSchema = generateSoftwareApplicationSchema(tool)
  const reviewSchemas = reviews?.map((review) => generateReviewSchema(review, tool)) || []

  // Generate breadcrumbs
  const breadcrumbItems = [
    { name: "Tools", href: "/tools" },
    ...(tool.category ? [{ name: tool.category.name, href: `/categories/${tool.category.slug}` }] : []),
    { name: tool.name, href: `/tools/${tool.slug}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: `https://aitoolshub.com${item.href}`,
    })),
  )

  const allSchemas = [toolSchema, breadcrumbSchema, ...reviewSchemas]

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={allSchemas} />
      <Header />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <Breadcrumbs items={breadcrumbItems.slice(0, -1)} />
        </div>
        <ToolDetail tool={tool} />
        <ToolReviews toolId={tool.id} reviews={reviews || []} />
        {relatedTools && relatedTools.length > 0 && <RelatedTools tools={relatedTools} />}
      </main>
      <Footer />
    </div>
  )
}
