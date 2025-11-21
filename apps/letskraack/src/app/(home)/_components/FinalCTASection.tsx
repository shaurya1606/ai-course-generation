'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, ArrowRight, CheckCircle } from 'lucide-react'

const FinalCTASection = () => {
  const benefits = [
    'AI-powered personalized learning',
    'Interactive coding challenges',
    'Professional resume analysis',
    'Collaborative discussion rooms',
    '24/7 AI support',
    'Progress tracking & analytics'
  ]

  return (
    <section className='bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-6'>
            <Rocket className='h-16 w-16 text-white' />
          </div>

          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>
            Ready to Crack Your Goals?
          </h2>

          <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Join thousands of learners who are already using LetsKrack to accelerate their career growth.
            Start your journey today with our AI-powered learning platform.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
            <Button asChild size='lg' className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg'>
              <Link href='/sign-up'>
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button asChild variant='outline' size='lg' className='border-white text-white hover:bg-white/10 px-8 py-4 text-lg'>
              <Link href='/workspace'>
                Explore Platform
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto'>
            {benefits.map((benefit, index) => (
              <div key={index} className='flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
                <CheckCircle className='h-5 w-5 text-green-300 mr-3 flex-shrink-0' />
                <span className='text-white font-medium'>{benefit}</span>
              </div>
            ))}
          </div>

          <div className='mt-12 text-center'>
            <p className='text-blue-100 text-sm'>
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
