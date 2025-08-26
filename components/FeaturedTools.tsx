import { Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function FeaturedTools() {
  const tools = [
    {
      name: 'ChatGPT',
      oneLiner: 'Conversational AI for writing & research',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop&crop=face',
      priceFrom: 'Free / Plus $20',
      hasFree: true,
      rating: 4.8,
      slug: 'chatgpt'
    },
    {
      name: 'Claude',
      oneLiner: 'Careful reasoning. Long inputs. Great analysis',
      logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=60&h=60&fit=crop&crop=face',
      priceFrom: 'Free / Pro $20',
      hasFree: true,
      rating: 4.7,
      slug: 'claude'
    },
    {
      name: 'Midjourney',
      oneLiner: 'High-quality AI art',
      logo: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=60&h=60&fit=crop&crop=face',
      priceFrom: '$10/mo',
      hasFree: false,
      rating: 4.6,
      slug: 'midjourney'
    },
    {
      name: 'Perplexity',
      oneLiner: 'Answers with sources. Fast',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=60&h=60&fit=crop&crop=face',
      priceFrom: 'Free / Pro $20',
      hasFree: true,
      rating: 4.5,
      slug: 'perplexity'
    },
    {
      name: 'Runway',
      oneLiner: 'AI video editing & effects',
      logo: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=60&h=60&fit=crop&crop=face',
      priceFrom: '$15–35+',
      hasFree: true,
      rating: 4.4,
      slug: 'runway'
    },
    {
      name: 'Notion AI',
      oneLiner: 'Smart writing in your workspace',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop&crop=face',
      priceFrom: '$10/mo',
      hasFree: false,
      rating: 4.3,
      slug: 'notion-ai'
    },
    {
      name: 'Copy.ai',
      oneLiner: 'Marketing copy that converts',
      logo: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=60&h=60&fit=crop&crop=face',
      priceFrom: 'Free / Pro $36',
      hasFree: true,
      rating: 4.2,
      slug: 'copy-ai'
    },
    {
      name: 'Jasper',
      oneLiner: 'Enterprise AI content platform',
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=60&h=60&fit=crop&crop=face',
      priceFrom: '$39/mo',
      hasFree: false,
      rating: 4.1,
      slug: 'jasper'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Editor's picks</h2>
          <p className="text-lg text-gray-600">
            <strong>Popular. Reliable.</strong> Worth your time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Tool Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <ImageWithFallback
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                </div>

                {/* One-liner */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {tool.oneLiner}
                </p>

                {/* Pricing & Rating */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">From {tool.priceFrom}</span>
                    <div className="flex items-center space-x-1">
                      {tool.hasFree ? (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          Free ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          Free ✗
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(tool.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{tool.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-sm"
                  >
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-sm text-gray-600 hover:text-gray-900"
                  >
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}