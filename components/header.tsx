"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      y: -20
    },
    visible: { 
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div 
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </motion.div>
              <span className="font-bold text-xl">AI Tools Hub</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/tools" className="text-foreground hover:text-primary transition-colors">
                All Tools
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                Categories
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/compare" className="text-foreground hover:text-primary transition-colors">
                Compare
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </motion.div>
          </motion.nav>

          {/* Search and Actions */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search AI tools..." className="pl-10 w-64" />
              </div>
            </div>

            <ThemeToggle />

            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/admin/login">
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>

            <Button asChild className="hidden sm:inline-flex">
              <Link href="/submit">Submit Tool</Link>
            </Button>

            {/* Mobile menu button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden border-t py-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-4">
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link href="/tools" className="text-foreground hover:text-primary transition-colors">
                    All Tools
                  </Link>
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                    Categories
                  </Link>
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link href="/compare" className="text-foreground hover:text-primary transition-colors">
                    Compare
                  </Link>
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </motion.div>
                <div className="pt-4 border-t space-y-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/login">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/submit">Submit Tool</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
