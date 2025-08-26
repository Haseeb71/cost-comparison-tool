import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
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

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={cardVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href={`/categories/${category.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full border border-gray-600 bg-gray-700">
              <CardContent className="p-6 text-center">
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  {category.icon || "🤖"}
                </motion.div>
                <h3 className="font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">{category.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{category.description}</p>
                
                {/* Category Stats */}
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-xs text-gray-400">
                    {Math.floor(Math.random() * 50) + 10} tools available
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
