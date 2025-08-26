"use client"

import { X } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center relative">
      <div className="container mx-auto">
        <p className="text-sm font-medium">
          <strong>New:</strong> 50+ tools added. More weekly.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-1 h-6 w-6"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}