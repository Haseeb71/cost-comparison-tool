import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Zap } from "lucide-react"

interface RelatedToolsProps {
  tools: any[]
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3 mb-2">
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
                  {tool.rating && (
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-xs">{tool.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              {tool.category && (
                <Badge variant="secondary" className="text-xs w-fit">
                  {tool.category.name}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tool.short_description}</p>

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
    </div>
  )
}
