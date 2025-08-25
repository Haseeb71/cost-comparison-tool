"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ToolSelectorProps {
  onSelect: (toolId: string) => void
  excludeIds?: string[]
  trigger?: React.ReactNode
}

export function ToolSelector({ onSelect, excludeIds = [], trigger }: ToolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const searchTools = async (query: string) => {
    if (!query.trim()) {
      setTools([])
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from("tools")
      .select(`
        id,
        name,
        slug,
        short_description,
        logo_url,
        category:categories(name)
      `)
      .eq("is_published", true)
      .or(`name.ilike.%${query}%,short_description.ilike.%${query}%`)
      .limit(10)

    if (!error && data) {
      setTools(data.filter((tool) => !excludeIds.includes(tool.id)))
    }
    setLoading(false)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchTools(searchQuery)
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery, excludeIds])

  const handleSelect = (toolId: string) => {
    onSelect(toolId)
    setIsOpen(false)
    setSearchQuery("")
    setTools([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select a Tool to Compare</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {loading && <div className="text-center py-4 text-muted-foreground">Searching...</div>}

            {!loading && searchQuery && tools.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">No tools found</div>
            )}

            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer"
                onClick={() => handleSelect(tool.id)}
              >
                {tool.logo_url ? (
                  <img
                    src={tool.logo_url || "/placeholder.svg"}
                    alt={tool.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">{tool.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{tool.short_description}</p>
                  {tool.category && <span className="text-xs text-muted-foreground">{tool.category.name}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
