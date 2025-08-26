import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export function FAQ() {
  const faqs = [
    {
      question: 'Do you rank tools for money?',
      answer: 'No. Never.'
    },
    {
      question: 'How do you rate tools?',
      answer: 'Pricing, ease of use, features, support, reliability, integrations.'
    },
    {
      question: 'Do you have free tools?',
      answer: 'Yes — filter by "Free plan."'
    },
    {
      question: 'How current is pricing?',
      answer: 'We update weekly. Always check the vendor page too.'
    },
    {
      question: 'How do you make money?',
      answer: 'Affiliate links. It doesn\'t affect rankings.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick answers</h2>
          </div>

          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}