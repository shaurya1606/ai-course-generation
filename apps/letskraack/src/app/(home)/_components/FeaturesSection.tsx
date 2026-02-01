'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Code,
  FileText,
  Brain,
  ArrowRight
} from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'AI Course Generation',
      description: 'Create personalized learning paths with AI-generated courses tailored to your goals and skill level.',
      link: '/workspace',
      color: 'text-blue-400'
    },
    {
      icon: Code,
      title: 'Coding Interview Prep',
      description: 'Practice with AI-generated coding challenges, get instant feedback, and improve your problem-solving skills.',
      link: '/coding',
      color: 'text-green-400'
    },
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'Upload your resume and get AI-powered analysis with actionable feedback to land your dream job.',
      link: '/resume-analyser',
      color: 'text-purple-400'
    },
    {
      icon: Brain,
      title: 'AI Interview Coach',
      description: 'Practice interviews with our AI coach that provides real-time feedback and personalized tips.',
      link: '/ai-interview',
      color: 'text-pink-400'
    }
  ]

  return (
    <section id='features' className='bg-neutral-900 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Powerful Features for Modern Learning
          </h2>
          <p className='text-xl text-neutral-400 max-w-3xl mx-auto'>
            Everything you need to accelerate your learning journey with cutting-edge AI technology
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-800/70 hover:border-neutral-600 transition-all duration-300 group'
            >
              <div className={`w-12 h-12 rounded-lg bg-neutral-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className='h-6 w-6' />
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>{feature.title}</h3>
              <p className='text-neutral-400 mb-4 leading-relaxed'>{feature.description}</p>
              <Button asChild variant='ghost' className='text-blue-400 hover:text-blue-300 p-0 h-auto font-medium'>
                <Link href={feature.link}>
                  Learn More
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <Button asChild size='lg' className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/workspace'>
              Start Your Learning Journey
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
