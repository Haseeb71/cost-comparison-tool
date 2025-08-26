import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"></div>
      </motion.div>
      
      <motion.div
        className="ml-4 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.div>
    </div>
  )
}
