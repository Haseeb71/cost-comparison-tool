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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={cardVariants}
          whileHover={{ 
            y: -5,
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={`/categories/${category.slug}`}>
            <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <motion.div 
                  className="text-3xl mb-3"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {category.icon || "🤖"}
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
