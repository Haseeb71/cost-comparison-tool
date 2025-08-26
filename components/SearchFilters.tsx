import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export function SearchFilters() {
  const quickFilters = [
    'Free plan',
    '$ Budget-friendly', 
    'Teams',
    'Solo',
    'Popular this week'
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search tools or categories..." 
              className="pl-12 py-4 text-lg rounded-lg border-gray-300 bg-white shadow-sm"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-3 justify-center">
            {quickFilters.map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full px-4 py-2 text-sm bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}