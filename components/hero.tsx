import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headlines */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the right tool. <span className="text-blue-600">Fast.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare features and pricing in minutes. <strong>No fluff.</strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium">
              Browse Categories
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-medium">
              Start Comparing
            </Button>
          </div>

          {/* Micro-trust */}
          <p className="text-sm text-gray-500">
            <strong>Honest rankings.</strong> No pay-to-rank.
          </p>
        </div>
      </div>
    </section>
  )
}