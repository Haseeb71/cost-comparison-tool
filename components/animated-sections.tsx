"use client"

import { motion } from "framer-motion"
import { FeaturedTools } from "@/components/featured-tools"
import { CategoryGrid } from "@/components/category-grid"
import { SearchAndFilters } from "@/components/search-and-filters"
import { GettingStarted } from "@/components/getting-started"
import type { Tool } from "@/lib/database"
import type { Category } from "@/lib/database"

interface AnimatedSectionsProps {
  featuredTools: Tool[]
  sampleTools: Tool[]
  categories: Category[]
}

export function AnimatedSections({ featuredTools, sampleTools, categories }: AnimatedSectionsProps) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const headerVariants = {
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
    <>
      {/* Featured AI Tools Section */}
      <motion.section 
        className="py-16 px-4 bg-gray-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={headerVariants}
          >
            Featured AI Tools
          </motion.h2>
          <FeaturedTools tools={featuredTools} />
        </div>
      </motion.section>

      {/* Browse by Category Section */}
      <motion.section 
        className="py-16 px-4 bg-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={headerVariants}
          >
            Browse by Category
          </motion.h2>
          <CategoryGrid categories={categories} />
        </div>
      </motion.section>

      {/* Search and Filters Section */}
      <motion.section 
        className="py-16 px-4 bg-gray-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={headerVariants}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Find Your Perfect AI Tool</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Search and filter through our comprehensive collection of AI tools
            </p>
          </motion.div>

          <SearchAndFilters categories={categories} />
        </div>
      </motion.section>

      {/* Getting Started Section */}
      <motion.section 
        className="py-16 px-4 bg-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={headerVariants}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Getting Started</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              New to AI tools? Learn how to get started and make the most of our platform
            </p>
          </motion.div>
          <GettingStarted />
        </div>
      </motion.section>
    </>
  )
}
