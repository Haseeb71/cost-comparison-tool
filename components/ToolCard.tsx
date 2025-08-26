import { Star, ExternalLink, Heart, Bookmark } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ToolCardProps {
  tool: {
    id: string
    name: string
    description: string
    logo: string
    category: string
    rating: number
    reviewCount: number
    pricing: string
    isPremium: boolean
    features: string[]
    website: string
  }
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <ImageWithFallback
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {tool.category}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(tool.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {tool.rating} ({tool.reviewCount})
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">{tool.pricing}</div>
            {tool.isPremium && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                Premium
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Key Features</p>
          <div className="flex flex-wrap gap-1">
            {tool.features.slice(0, 3).map((feature, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-gray-50 text-gray-600 border-gray-200"
              >
                {feature}
              </Badge>
            ))}
            {tool.features.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-200">
                +{tool.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full space-x-2">
          <Button variant="outline" className="flex-1" size="sm">
            Compare
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            Visit
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}