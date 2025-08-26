"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Zap } from "lucide-react"
import type { Tool } from "@/lib/database"

interface TopOffersProps {
  tools: Tool[]
}

export function TopOffers({ tools }: TopOffersProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          className="bg-gray-700 rounded-lg border border-gray-600 p-6 hover:shadow-lg transition-shadow duration-300"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          {/* Tool Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {tool.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <p className="text-sm text-gray-300">{tool.category?.name || 'AI Tool'}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-900 text-green-300 border-green-700">
              <Zap className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>

          {/* Tool Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {tool.description || 'Powerful AI tool with advanced features and capabilities.'}
          </p>

          {/* Rating and Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-white">
                {tool.rating ? tool.rating.toFixed(1) : '4.5'}
              </span>
              <span className="text-sm text-gray-400">
                ({Math.floor(Math.random() * 1000) + 100} reviews)
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                {tool.pricing_model === 'free' ? 'Free' : 
                 tool.pricing_model === 'freemium' ? 'Freemium' : 
                 tool.pricing_model === 'paid' ? 'From $9/mo' : 'Contact'}
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-blue-900/50 border border-blue-700 rounded-md p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Special Offer</p>
                <p className="text-xs text-blue-300">Limited time deal available</p>
              </div>
              <Badge className="bg-blue-600 text-white">Save 20%</Badge>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            Go to site
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
