'use client'
import React from 'react'
import { CheckCircle, ArrowRight, UserPlus, BookOpen, Target, Trophy } from 'lucide-react'

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Set Goals',
      description: 'Create your account and tell us about your learning objectives and current skill level.',
      step: '01'
    },
    {
      icon: BookOpen,
      title: 'AI Generates Your Course',
      description: 'Our AI analyzes your goals and creates a personalized learning path with relevant content.',
      step: '02'
    },
    {
      icon: Target,
      title: 'Learn & Practice',
      description: 'Follow your customized curriculum, complete coding challenges, and track your progress.',
      step: '03'
    },
    {
      icon: Trophy,
      title: 'Achieve Your Goals',
      description: 'Get certified, land your dream job, or master new skills with confidence.',
      step: '04'
    }
  ]

  return (
    <section id='how-it-works' className='bg-neutral-800 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            How LetsKrack Works
          </h2>
          <p className='text-xl text-neutral-400 max-w-3xl mx-auto'>
            Four simple steps to transform your learning experience with AI-powered personalization
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, index) => (
            <div key={index} className='relative'>
              <div className='bg-neutral-900/50 border border-neutral-700 rounded-xl p-6 h-full'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center'>
                    <step.icon className='h-6 w-6 text-blue-400' />
                  </div>
                  <span className='text-2xl font-bold text-blue-400/50'>{step.step}</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-3'>{step.title}</h3>
                <p className='text-neutral-400 leading-relaxed'>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2'>
                  <ArrowRight className='h-6 w-6 text-neutral-600' />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <div className='bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8 max-w-4xl mx-auto'>
            <h3 className='text-2xl font-bold text-white mb-4'>Ready to Get Started?</h3>
            <p className='text-neutral-300 mb-6'>
              Join thousands of learners who are already using LetsKrack to accelerate their career growth.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <div className='flex items-center text-green-400'>
                <CheckCircle className='h-5 w-5 mr-2' />
                <span className='text-sm'>Free to start</span>
              </div>
              <div className='flex items-center text-green-400'>
                <CheckCircle className='h-5 w-5 mr-2' />
                <span className='text-sm'>AI-powered learning</span>
              </div>
              <div className='flex items-center text-green-400'>
                <CheckCircle className='h-5 w-5 mr-2' />
                <span className='text-sm'>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
