'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from 'lucide-react'

const FAQSection = () => {
  const faqs = [
    {
      question: 'How does AI course generation work?',
      answer: 'Our AI analyzes your learning goals, current skill level, and preferred learning style to create personalized courses. It generates relevant content, exercises, and assessments tailored specifically for you.'
    },
    {
      question: 'Are the coding interviews realistic?',
      answer: 'Yes! Our AI generates questions based on real interview patterns from top tech companies. The difficulty levels and topics are designed to match actual technical interviews.'
    },
    {
      question: 'How accurate is the resume analysis?',
      answer: 'Our AI uses advanced NLP and industry standards to analyze your resume. It checks for ATS compatibility, content quality, keyword optimization, and provides specific improvement suggestions.'
    },
    {
      question: 'Can I collaborate with others?',
      answer: 'Absolutely! Our discussion rooms allow you to connect with peers, join topic-specific study groups, and participate in AI-moderated discussions to enhance your learning experience.'
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We support popular languages including JavaScript, Python, Java, C++, and more. Our AI can generate questions and provide feedback in multiple programming paradigms.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! You can start with our free tier which includes basic course generation, limited coding challenges, and resume analysis. Premium features unlock advanced AI capabilities.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your dashboard provides detailed analytics on your learning progress, completed courses, coding performance, and personalized recommendations for improvement.'
    },
    {
      question: 'Can I access LetsKrack on mobile?',
      answer: 'While our primary platform is web-based, we offer responsive design that works well on tablets and mobile devices. A dedicated mobile app is in development.'
    }
  ]

  return (
    <section className='bg-neutral-900 py-20'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div className='flex justify-center mb-4'>
            <HelpCircle className='h-12 w-12 text-blue-400' />
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-neutral-400'>
            Everything you need to know about LetsKrack
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-neutral-800/50 border border-neutral-700 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-white font-medium text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-neutral-300 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-12 text-center'>
          <p className='text-neutral-400 mb-4'>Still have questions?</p>
          <a
            href='mailto:support@letskrack.com'
            className='text-blue-400 hover:text-blue-300 transition-colors font-medium'
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
