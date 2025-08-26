import { ArrowRight } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Pick a category',
      description: 'Writing, Chat, Image, Video, SEO, Productivity.'
    },
    {
      number: '2', 
      title: 'Compare',
      description: 'See pricing, features, and ratings at a glance.'
    },
    {
      number: '3',
      title: 'Choose',
      description: 'Tap "Get Tool" to visit the official site.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                
                {/* Step Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>

                {/* Arrow (hidden on last step) */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-gray-400 absolute -right-4 top-6 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="text-center mt-12">
            <p className="text-lg font-medium text-gray-900">
              <strong>Clarity beats confusion.</strong> Every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}