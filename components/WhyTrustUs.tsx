import { CheckCircle } from 'lucide-react'

export function WhyTrustUs() {
  const trustPoints = [
    'No pay-to-rank. Tools don\'t buy positions.',
    'Clear criteria. Pricing, features, reliability, support, integrations.',
    'Disclosure first. We may earn a commission on some links.',
    'Always improving. Suggestions welcome.'
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why trust us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">
              <strong>We earn trust by telling the truth.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}