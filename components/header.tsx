"use client"

import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">ToolsHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-gray-700 hover:text-gray-900 font-medium">Categories</a>
            <a href="#compare" className="text-gray-700 hover:text-gray-900 font-medium">Compare</a>
            <span className="text-gray-400 font-medium cursor-not-allowed">Blog</span>
            <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button variant="outline" className="font-medium">
              Suggest a Tool
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#categories" className="text-gray-700 font-medium">Categories</a>
              <a href="#compare" className="text-gray-700 font-medium">Compare</a>
              <span className="text-gray-400 font-medium">Blog</span>
              <a href="#about" className="text-gray-700 font-medium">About</a>
              <a href="#contact" className="text-gray-700 font-medium">Contact</a>
              <div className="pt-4">
                <Button variant="outline" className="w-full font-medium">
                  Suggest a Tool
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}