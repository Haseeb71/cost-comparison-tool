"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink, Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ComparisonTableProps {
  toolIds: string[]
}

export function ComparisonTable({ toolIds }: ComparisonTableProps) {
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTools = async () => {
      if (toolIds.length === 0) return

      setLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from("tools")
        .select(`
          *,
          category:categories(name),
          vendor:vendors(name),
          pricing_plans(*)
        `)
        .in("id", toolIds)
        .eq("is_published", true)

      if (!error && data) {
        // Maintain order based on toolIds
        const orderedTools = toolIds.map((id) => data.find((tool) => tool.id === id)).filter(Boolean)
        setTools(orderedTools)
      }
      setLoading(false)
    }

    fetchTools()
  }, [toolIds])

  if (loading) {
    return <div className="text-center py-8">Loading comparison...</div>
  }

  if (tools.length === 0) {
    return <div className="text-center py-8">No tools to compare</div>
  }

  const comparisonRows = [
    {
      label: "Overview",
      key: "overview",
      render: (tool: any) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {tool.logo_url ? (
              <img src={tool.logo_url || "/placeholder.svg"} alt={tool.name} className="h-8 w-8 rounded object-cover" />
            ) : (
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium">{tool.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h4 className="font-medium">{tool.name}</h4>
              {tool.vendor && <p className="text-xs text-muted-foreground">by {tool.vendor.name}</p>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{tool.short_description}</p>
        </div>
      ),
    },
    {
      label: "Category",
      key: "category",
      render: (tool: any) => <Badge variant="secondary">{tool.category?.name || "Uncategorized"}</Badge>,
    },
    {
      label: "Rating",
      key: "rating",
      render: (tool: any) =>
        tool.rating ? (
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{tool.rating}</span>
            <span className="text-muted-foreground text-sm">({tool.review_count})</span>
          </div>
        ) : (
          <span className="text-muted-foreground">No rating</span>
        ),
    },
    {
      label: "Pricing Model",
      key: "pricing_model",
      render: (tool: any) => (
        <Badge variant={tool.pricing_model === "free" ? "default" : "outline"}>{tool.pricing_model}</Badge>
      ),
    },
    {
      label: "Starting Price",
      key: "starting_price",
      render: (tool: any) =>
        tool.starting_price ? (
          <span className="font-medium">
            ${tool.starting_price}/{tool.pricing_period}
          </span>
        ) : tool.pricing_model === "free" ? (
          <span className="text-green-600 font-medium">Free</span>
        ) : (
          <span className="text-muted-foreground">Custom</span>
        ),
    },
    {
      label: "Free Trial",
      key: "free_trial",
      render: (tool: any) =>
        tool.free_trial ? (
          <div className="flex items-center space-x-1 text-green-600">
            <Check className="h-4 w-4" />
            <span>{tool.trial_days ? `${tool.trial_days} days` : "Yes"}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-muted-foreground">
            <X className="h-4 w-4" />
            <span>No</span>
          </div>
        ),
    },
    {
      label: "API Available",
      key: "api_available",
      render: (tool: any) =>
        tool.api_available ? (
          <div className="flex items-center space-x-1 text-green-600">
            <Check className="h-4 w-4" />
            <span>Yes</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-muted-foreground">
            <X className="h-4 w-4" />
            <span>No</span>
          </div>
        ),
    },
    {
      label: "Key Features",
      key: "features",
      render: (tool: any) => (
        <div className="space-y-1">
          {tool.features?.slice(0, 5).map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          {tool.features?.length > 5 && (
            <p className="text-xs text-muted-foreground">+{tool.features.length - 5} more features</p>
          )}
        </div>
      ),
    },
    {
      label: "Actions",
      key: "actions",
      render: (tool: any) => (
        <div className="space-y-2">
          <Button asChild size="sm" className="w-full">
            <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit Website
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
            <a href={`/tools/${tool.slug}`}>View Details</a>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 border-b font-medium w-48">Feature</th>
                {tools.map((tool) => (
                  <th key={tool.id} className="text-left p-4 border-b font-medium min-w-64">
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.key} className="border-b">
                  <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4">
                      {row.render(tool)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
