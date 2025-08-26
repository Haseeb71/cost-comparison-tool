"use client"

import { motion } from "framer-motion"
import { FeaturedTools } from "@/components/featured-tools"
import { CategoryGrid } from "@/components/category-grid"
import { ToolsGrid } from "@/components/tools-grid"
import { SearchAndFilters } from "@/components/search-and-filters"
import { TopOffers } from "@/components/top-offers"
import { GettingStarted } from "@/components/getting-started"
import type { Tool } from "@/lib/database"
import type { Category } from "@/lib/database"

interface AnimatedSectionsProps {
  featuredTools: Tool[]
  categories: Category[]
}

export function AnimatedSections({ featuredTools, categories }: AnimatedSectionsProps) {
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
      {/* Top Offers Section */}
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
            <h2 className="text-3xl font-bold mb-4 text-white">Top offers & exclusives</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Special deals and featured AI tools with exclusive offers
            </p>
          </motion.div>
          <TopOffers tools={featuredTools.slice(0, 3)} />
        </div>
      </motion.section>

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
            <h2 className="text-3xl font-bold mb-4 text-white">All AI Tools</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover and compare thousands of AI tools across different categories
            </p>
          </motion.div>

          <SearchAndFilters categories={categories} />

          <div className="py-8">
            <p className="text-center text-gray-400">
              Tools grid will be loaded here...
            </p>
          </div>
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
            <h2 className="text-3xl font-bold mb-4 text-white">Getting started</h2>
          </motion.div>
          <GettingStarted />
        </div>
      </motion.section>
    </>
  )
}
