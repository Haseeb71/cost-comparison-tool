import { Card, CardContent } from './ui/card'
import { PenTool, MessageSquare, Image, Video, Search, Zap } from 'lucide-react'

export function FeaturedCategories() {
  const categories = [
    {
      icon: PenTool,
      title: 'Writing',
      description: 'Blog posts. Ads. Emails. Done faster.',
      href: '/categories/writing'
    },
    {
      icon: MessageSquare,
      title: 'Chat/Agents',
      description: 'Ask. Analyse. Automate. Simple.',
      href: '/categories/chat'
    },
    {
      icon: Image,
      title: 'Image',
      description: 'Stunning visuals from text.',
      href: '/categories/image'
    },
    {
      icon: Video,
      title: 'Video',
      description: 'Clips, explainers, promos. Fast.',
      href: '/categories/video'
    },
    {
      icon: Search,
      title: 'SEO/Content',
      description: 'Rank smarter. Not harder.',
      href: '/categories/seo'
    },
    {
      icon: Zap,
      title: 'Productivity',
      description: 'Notes, docs, ops. All in flow.',
      href: '/categories/productivity'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start here</h2>
          <p className="text-lg text-gray-600">
            The most-requested categories. <strong>Updated weekly.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}