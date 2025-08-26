"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, TrendingUp, Shield, Star } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="relative py-16 px-4 bg-gray-900">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          variants={itemVariants}
        >
          Find a better AI tool for you
        </motion.h1>

        <motion.p 
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Compare features, pricing, and reviews of the best AI tools. Make informed decisions with our comprehensive database.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for AI writing tools, image generators, chatbots..."
              className="pl-12 pr-4 py-4 text-lg rounded-lg border-2 border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </motion.div>

        {/* Quick Category Pills */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center mb-8"
          variants={itemVariants}
        >
          {['Writing Tools', 'Image Generation', 'Chatbots', 'Video Creation', 'Code Assistants', 'Data Analysis'].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="flex items-center justify-center gap-6 text-sm text-gray-400"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Expert Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Verified Ratings</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Updated Daily</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
