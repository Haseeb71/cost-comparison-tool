"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { Category } from "@/lib/database"

interface SearchAndFiltersProps {
  categories: Category[]
}

export function SearchAndFilters({ categories }: SearchAndFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  const currentCategory = searchParams.get("category")
  const currentPricing = searchParams.get("pricing")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search: searchQuery })
  }

  const updateFilters = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/")
    setSearchQuery("")
  }

  const activeFiltersCount = [currentCategory, currentPricing, searchQuery].filter(Boolean).length

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search AI tools by name, description, or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-20 py-6 text-lg rounded-xl"
        />
        <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg">
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select
          value={currentCategory || "all"}
          onValueChange={(value) => updateFilters({ category: value === "all" ? null : value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentPricing || "all"}
          onValueChange={(value) => updateFilters({ pricing: value === "all" ? null : value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchQuery("")
                  updateFilters({ search: null })
                }}
              />
            </Badge>
          )}
          {currentCategory && currentCategory !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find((c) => c.slug === currentCategory)?.name}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ category: null })} />
            </Badge>
          )}
          {currentPricing && currentPricing !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Pricing: {currentPricing}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ pricing: null })} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
