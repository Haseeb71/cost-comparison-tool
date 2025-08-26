import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Zap } from "lucide-react"
import { motion } from "framer-motion"
import type { Tool } from "@/lib/database"

interface FeaturedToolsProps {
  tools: Tool[]
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          variants={cardVariants}
          whileHover={{ 
            y: -8,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {tool.logo_url ? (
                    <motion.img
                      src={tool.logo_url || "/placeholder.svg"}
                      alt={`${tool.name} logo`}
                      className="h-12 w-12 rounded-lg object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  ) : (
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className="h-6 w-6 text-primary" />
                    </motion.div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{tool.name}</h3>
                    {tool.category && (
                      <Badge variant="secondary" className="text-xs">
                        {tool.category.name}
                      </Badge>
                    )}
                  </div>
                </div>
                {tool.rating && (
                  <motion.div 
                    className="flex items-center space-x-1 text-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tool.rating}</span>
                  </motion.div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tool.short_description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge variant={tool.pricing_model === "free" ? "default" : "outline"}>
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
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/tools/${tool.slug}`}>View Details</Link>
                </Button>
                {tool.website_url && (
                  <Button asChild size="sm" className="flex-1">
                    <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
