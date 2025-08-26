"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, TrendingUp, Shield } from "lucide-react"
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover the Future of AI</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Find the Perfect AI Tool for Every Task
        </motion.h1>

        <motion.p 
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Compare features, pricing, and reviews of 1000+ AI tools. Make informed decisions with our comprehensive
          database and expert insights.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for AI writing tools, image generators, chatbots..."
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg">Search</Button>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/tools">Browse All Tools</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl bg-transparent">
            <Link href="/categories">Explore Categories</Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-muted-foreground">AI Tools Listed</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-muted-foreground">Verified Reviews</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">25+</div>
            <div className="text-muted-foreground">Categories</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
