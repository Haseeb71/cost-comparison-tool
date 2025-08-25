"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ExternalLink, Check, Globe, Calendar, Users, Zap } from "lucide-react"
import Link from "next/link"

interface ToolDetailProps {
  tool: any // Tool with relations
}

export function ToolDetail({ tool }: ToolDetailProps) {
  const handleAffiliateClick = async () => {
    // Track affiliate click
    if (tool.affiliate_url) {
      try {
        await fetch("/api/affiliate-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId: tool.id }),
        })
      } catch (error) {
        console.error("Failed to track affiliate click:", error)
      }
      window.open(tool.affiliate_url, "_blank")
    } else if (tool.website_url) {
      window.open(tool.website_url, "_blank")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex items-center space-x-4">
            {tool.logo_url ? (
              <img
                src={tool.logo_url || "/placeholder.svg"}
                alt={`${tool.name} logo`}
                className="h-20 w-20 rounded-xl object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="h-10 w-10 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{tool.short_description}</p>
              <div className="flex items-center space-x-4">
                {tool.category && (
                  <Badge variant="secondary" className="text-sm">
                    {tool.category.name}
                  </Badge>
                )}
                {tool.vendor && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>by</span>
                    <Link href={`/vendors/${tool.vendor.slug}`} className="hover:text-primary">
                      {tool.vendor.name}
                    </Link>
                  </div>
                )}
                {tool.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tool.rating}</span>
                    <span className="text-muted-foreground">({tool.review_count} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:ml-auto">
            <Button onClick={handleAffiliateClick} size="lg" className="min-w-40">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/compare?tools=${tool.id}`}>Compare</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Use Cases */}
          {tool.use_cases && tool.use_cases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.use_cases.map((useCase: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {tool.pricing_model === "free" ? "Free" : tool.starting_price ? `$${tool.starting_price}` : "Custom"}
                </div>
                {tool.pricing_period && tool.starting_price && (
                  <div className="text-sm text-muted-foreground">per {tool.pricing_period}</div>
                )}
                <Badge variant={tool.pricing_model === "free" ? "default" : "secondary"} className="mt-2">
                  {tool.pricing_model}
                </Badge>
              </div>

              {tool.free_trial && (
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300">
                    {tool.trial_days ? `${tool.trial_days}-day` : ""} Free Trial Available
                  </div>
                </div>
              )}

              {tool.pricing_plans && tool.pricing_plans.length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  <div className="text-sm font-medium">Available Plans:</div>
                  {tool.pricing_plans.map((plan: any) => (
                    <div key={plan.id} className="flex justify-between items-center">
                      <span className="text-sm">{plan.name}</span>
                      <span className="text-sm font-medium">{plan.price ? `$${plan.price}` : "Custom"}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tool.api_available && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">API Available</span>
                </div>
              )}
              {tool.supported_platforms && tool.supported_platforms.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Platforms:</div>
                    <div className="text-sm text-muted-foreground">{tool.supported_platforms.join(", ")}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Added {new Date(tool.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
