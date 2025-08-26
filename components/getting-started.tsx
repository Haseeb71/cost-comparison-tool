"use client"

import { motion } from "framer-motion"
import { Search, BarChart3, CheckCircle } from "lucide-react"

export function GettingStarted() {
  const steps = [
    {
      title: "Ask & answer",
      description: "Answer a few questions about the type of AI tool you're looking for."
    },
    {
      title: "Compare offers",
      description: "Compare top AI tools, rated by our experts, with always up-to-date features and pricing."
    },
    {
      title: "Find your match",
      description: "Continue to the tool's site with full confidence, knowing we've done the research."
    }
  ]

  const icons = [Search, BarChart3, CheckCircle]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
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
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {steps.map((step, index) => {
        const IconComponent = icons[index]
        return (
          <motion.div
            key={index}
            className="text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <IconComponent className="h-8 w-8" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{index + 1}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
