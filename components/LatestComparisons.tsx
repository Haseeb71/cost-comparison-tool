import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function LatestComparisons() {
  const comparisons = [
    {
      title: 'ChatGPT vs Claude',
      description: 'Writers vs researchers? Here\'s the split.',
      href: '/compare/chatgpt-vs-claude'
    },
    {
      title: 'Midjourney vs DALL·E',
      description: 'Artistic control vs everyday ease.',
      href: '/compare/midjourney-vs-dalle'
    },
    {
      title: 'Surfer vs Clearscope',
      description: 'Teams vs enterprise budgets.',
      href: '/compare/surfer-vs-clearscope'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Fresh comparisons</h2>
          </div>

          <div className="space-y-4 mb-8">
            {comparisons.map((comparison, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {comparison.title}
                      </h3>
                      <p className="text-gray-600">{comparison.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="font-medium">
              See all comparisons
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}