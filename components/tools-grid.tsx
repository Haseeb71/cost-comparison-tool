import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Zap } from "lucide-react"
import Link from "next/link"

interface ToolsGridProps {
  searchParams: Promise<{ search?: string; category?: string; pricing?: string }>
}

export async function ToolsGrid({ searchParams }: ToolsGridProps) {
  const supabase = await createClient()
  const params = await searchParams

  let query = supabase
    .from("tools")
    .select(`
      *,
      category:categories(name, slug),
      vendor:vendors(name, slug)
    `)
    .eq("is_published", true)

  // Apply filters
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  if (params.category) {
    query = query.eq("category.slug", params.category)
  }

  if (params.pricing) {
    query = query.eq("pricing_model", params.pricing)
  }

  const { data: tools, error } = await query
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false })
    .limit(24)

  if (error) {
    console.error("Error fetching tools:", error)
    return <div>Error loading tools</div>
  }

  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No tools found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool: any) => (
        <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                {tool.logo_url ? (
                  <img
                    src={tool.logo_url || "/placeholder.svg"}
                    alt={`${tool.name} logo`}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
                    {tool.name}
                  </h3>
                  {tool.vendor && <p className="text-xs text-muted-foreground truncate">by {tool.vendor.name}</p>}
                </div>
              </div>
              {tool.is_featured && (
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              {tool.category && (
                <Badge variant="secondary" className="text-xs">
                  {tool.category.name}
                </Badge>
              )}
              {tool.rating && (
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-xs">{tool.rating}</span>
                  {tool.review_count > 0 && (
                    <span className="text-muted-foreground text-xs">({tool.review_count})</span>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tool.short_description}</p>

            <div className="flex items-center justify-between mb-4">
              <Badge variant={tool.pricing_model === "free" ? "default" : "outline"} className="text-xs">
                {tool.pricing_model === "free"
                  ? "Free"
                  : tool.pricing_model === "freemium"
                    ? "Freemium"
                    : tool.starting_price
                      ? `From $${tool.starting_price}`
                      : "Paid"}
              </Badge>
              {tool.free_trial && (
                <Badge variant="secondary" className="text-xs">
                  Free Trial
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                <Link href={`/tools/${tool.slug}`}>Details</Link>
              </Button>
              {tool.website_url && (
                <Button asChild size="sm" className="flex-1 text-xs">
                  <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
