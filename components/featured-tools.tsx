import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Zap, ArrowRight, Users, Globe, Sparkles, Clock } from "lucide-react"
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

  const getPricingBadge = (tool: Tool) => {
    if (tool.pricing_model === "free") {
      return { text: "Free", className: "bg-green-900 text-green-300 border-green-700" }
    } else if (tool.pricing_model === "freemium") {
      return { text: "Freemium", className: "bg-blue-900 text-blue-300 border-blue-700" }
    } else if (tool.starting_price) {
      return { text: `From $${tool.starting_price}`, className: "bg-purple-900 text-purple-300 border-purple-700" }
    } else {
      return { text: "Paid", className: "bg-gray-700 text-gray-300 border-gray-600" }
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400"
    if (rating >= 4.0) return "text-yellow-400"
    if (rating >= 3.5) return "text-orange-400"
    return "text-red-400"
  }

  const renderStarRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className="h-4 w-4 fill-yellow-400 text-yellow-400" 
        />
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <div className="absolute right-0 top-0 w-2 h-4 bg-gray-800" />
          </div>
        </div>
      )
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className="h-4 w-4 text-gray-500" 
        />
      )
    }

    return stars
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Discover Amazing AI Tools
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Handpicked AI tools that will transform your workflow and boost productivity
        </p>
      </motion.div>

      {/* Tools Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group"
          >
            <Card className="h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-blue-500/50 transition-all duration-300 overflow-hidden relative">
              {/* Featured Badge */}
              {tool.is_featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Card Header */}
              <CardHeader className="pb-4 relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Logo */}
                    {tool.logo_url ? (
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={tool.logo_url}
                          alt={`${tool.name} logo`}
                          className="h-16 w-16 rounded-xl object-cover border-2 border-gray-600 group-hover:border-blue-500/50 transition-colors"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center border-2 border-gray-600 group-hover:border-blue-500/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white font-bold text-2xl">
                          {tool.name.charAt(0).toUpperCase()}
                        </span>
                      </motion.div>
                    )}
                    
                    {/* Tool Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {tool.name}
                      </h3>
                      {tool.category && (
                        <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-200 border-gray-600 mt-1">
                          {tool.category.name}
                        </Badge>
                      )}
                      {tool.vendor && (
                        <p className="text-sm text-gray-400 mt-1">
                          by {tool.vendor.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="pt-0 space-y-4">
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {tool.short_description}
                </p>

                {/* Star Rating Display */}
                {tool.rating && (
                  <div className="flex items-center space-x-3 py-2">
                    <div className="flex items-center space-x-1">
                      {renderStarRating(tool.rating)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold text-lg ${getRatingColor(tool.rating)}`}>
                        {tool.rating}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({tool.review_count || 0} reviews)
                      </span>
                    </div>
                  </div>
                )}

                {/* Features Preview */}
                {tool.features && tool.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs bg-gray-700/50 text-gray-300 border-gray-600"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-gray-700/50 text-gray-300 border-gray-600">
                        +{tool.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stats Row */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  {/* API Available */}
                  {tool.api_available && (
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span>API</span>
                    </div>
                  )}
                  
                  {/* Free Trial */}
                  {tool.free_trial && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>{tool.trial_days ? `${tool.trial_days} days` : 'Free Trial'}</span>
                    </div>
                  )}
                </div>

                {/* Pricing & Trial */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getPricingBadge(tool).className}>
                      {getPricingBadge(tool).text}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-transparent border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-blue-500 hover:text-white transition-all duration-200"
                  >
                    <Link href={`/tools/${tool.slug}`}>
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  
                  {tool.website_url && (
                    <Button 
                      asChild 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Site
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      {tools.length > 0 && (
        <motion.div 
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
            <Link href="/tools">
              Explore All AI Tools
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
