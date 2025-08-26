import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Zap, ArrowRight } from "lucide-react"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
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
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-600 h-full bg-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {tool.logo_url ? (
                    <motion.img
                      src={tool.logo_url || "/placeholder.svg"}
                      alt={`${tool.name} logo`}
                      className="h-12 w-12 rounded-lg object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  ) : (
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-lg">
                        {tool.name.charAt(0).toUpperCase()}
                      </span>
                    </motion.div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                    {tool.category && (
                      <Badge variant="secondary" className="text-xs bg-gray-600 text-gray-200 border-gray-500">
                        {tool.category.name}
                      </Badge>
                    )}
                  </div>
                </div>
                {tool.rating && (
                  <motion.div 
                    className="flex items-center space-x-1 text-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-white">{tool.rating}</span>
                  </motion.div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tool.short_description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={tool.pricing_model === "free" ? "default" : "outline"}
                    className={tool.pricing_model === "free" 
                      ? "bg-green-900 text-green-300" 
                      : "bg-gray-600 text-gray-200 border-gray-500"
                    }
                  >
                    {tool.pricing_model === "free"
                      ? "Free"
                      : tool.pricing_model === "freemium"
                        ? "Freemium"
                        : tool.starting_price
                          ? `From $${tool.starting_price}`
                          : "Paid"}
                  </Badge>
                  {tool.free_trial && (
                    <Badge variant="secondary" className="text-xs bg-blue-900 text-blue-300 border-blue-700">
                      Free Trial
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-gray-400 hover:text-white">
                  <Link href={`/tools/${tool.slug}`}>View Details</Link>
                </Button>
                {tool.website_url && (
                  <Button asChild size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                      Go to site
                      <ArrowRight className="h-4 w-4 ml-1" />
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
