import { Button } from './ui/button'

export function CTABand() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to find your tool?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start with the category that fits your work.
          </p>

          {/* Affiliate Disclosure */}
          <p className="text-sm text-gray-500 mb-6">
            We may earn a commission when you click partner links.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium">
              Browse Categories
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-medium">
              Start Comparing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}