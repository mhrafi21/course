import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'

const Faq = () => {
  return (
    <div>
          {/* FAQ Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {[
            { q: "How do I enroll?", a: "Sign up and choose a course to start learning." },
            { q: "What payment methods are accepted?", a: "We accept credit cards, PayPal, and more." },
            { q: "Can I get a refund?", a: "We offer a 7-day refund policy for all courses." },
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger><HelpCircle size={20} className="mr-2" />{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export default Faq