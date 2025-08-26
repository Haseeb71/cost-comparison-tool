import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Star } from "lucide-react"
import type { Category } from "@/lib/database"

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  // Default icons for categories if none provided
  const getDefaultIcon = (categoryName: string) => {
    const iconMap: Record<string, string> = {
      'AI Writing': '✍️',
      'AI Chat': '💬',
      'AI Image': '🎨',
      'AI Video': '🎬',
      'AI Audio': '🎵',
      'AI Code': '💻',
      'AI Research': '🔬',
      'AI Business': '💼',
      'AI Education': '📚',
      'AI Marketing': '📢',
      'AI Analytics': '📊',
      'AI Automation': '⚙️',
      'AI Design': '🎭',
      'AI Development': '🚀',
      'AI Productivity': '⚡',
      'AI Communication': '📞',
      'AI Security': '🔒',
      'AI Healthcare': '🏥',
      'AI Finance': '💰',
      'AI Gaming': '🎮'
    }
    
    return iconMap[categoryName] || '🤖'
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="group h-full border-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 transition-all duration-500 cursor-pointer overflow-hidden relative">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Header with icon */}
            <CardHeader className="pb-4 pt-6 px-6 text-center relative z-10">
              <motion.div 
                className="text-6xl mb-4 mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {category.icon || getDefaultIcon(category.name)}
              </motion.div>
              
              <h3 className="font-bold text-xl mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                {category.name}
              </h3>
              
              {/* Category badge */}
              <Badge 
                variant="secondary" 
                className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-colors"
              >
                Category
              </Badge>
            </CardHeader>

            {/* Content */}
            <CardContent className="px-6 pb-6 relative z-10">
              <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4.5rem]">
                {category.description || `Explore the best ${category.name.toLowerCase()} tools and solutions. Discover innovative AI-powered applications that can transform your workflow and boost productivity.`}
              </p>
              
              {/* Stats section */}
              <div className="flex items-center justify-between mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-300">
                    {Math.floor(Math.random() * 50) + 10} tools
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {Math.floor(Math.random() * 100) + 20} reviews
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:shadow-xl"
                >
                  <Link href={`/categories/${category.slug}`}>
                    <span>Browse Tools</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500 transition-all duration-300"
                >
                  <Link href={`/compare?category=${category.slug}`}>
                    <span>Compare Tools</span>
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl group-hover:from-blue-400/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-xl group-hover:from-purple-400/20 transition-all duration-500" />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
