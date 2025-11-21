'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code, FileText, MessageSquare, Brain, Play, ArrowRight, BookOpen } from 'lucide-react'

const ToolShowcaseSection = () => {
  const tools = [
    {
      icon: Code,
      title: 'AI Coding Interview',
      description: 'Practice coding interviews with AI-generated questions and real-time feedback.',
      features: ['Multiple languages', 'Difficulty levels', 'Instant evaluation'],
      link: '/coding',
      gradient: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30'
    },
    {
      icon: FileText,
      title: 'Resume Analyzer',
      description: 'Get detailed analysis of your resume with AI-powered insights and improvement suggestions.',
      features: ['ATS compatibility', 'Content analysis', 'Industry insights'],
      link: '/resume-analyser',
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    },
    {
      icon: BookOpen,
      title: 'AI Course Generation',
      description: 'Create personalized learning paths with AI-generated courses tailored to your goals.',
      features: ['Custom curriculum', 'Adaptive learning', 'Progress tracking'],
      link: '/workspace',
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/30'
    },
    {
      icon: Brain,
      title: 'AI Interview Coach',
      description: 'Practice behavioral interviews with our AI coach that provides personalized feedback.',
      features: ['STAR method', 'Industry specific', 'Confidence building'],
      link: '/ai-interview',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30'
    }
  ]

  return (
    <section id='tools' className='bg-neutral-900 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Powerful Tools for Every Step
          </h2>
          <p className='text-xl text-neutral-400 max-w-3xl mx-auto'>
            Specialized AI tools designed to accelerate your learning and career development
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {tools.map((tool, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${tool.gradient} border ${tool.border} rounded-xl p-8 hover:scale-105 transition-all duration-300`}
            >
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 rounded-lg bg-neutral-800/50 flex items-center justify-center mr-4'>
                  <tool.icon className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>{tool.title}</h3>
              </div>

              <p className='text-neutral-300 mb-6 leading-relaxed'>{tool.description}</p>

              <ul className='space-y-2 mb-6'>
                {tool.features.map((feature, idx) => (
                  <li key={idx} className='flex items-center text-neutral-400'>
                    <div className='w-1.5 h-1.5 bg-blue-400 rounded-full mr-3'></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild variant='outline' className='border-neutral-600 text-white hover:bg-neutral-800'>
                <Link href={tool.link}>
                  Try Now
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <div className='bg-neutral-800/50 border border-neutral-700 rounded-xl p-8 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-white mb-4'>All Tools in One Platform</h3>
            <p className='text-neutral-400 mb-6'>
              No need to juggle multiple platforms. Everything you need for career development is here.
            </p>
            <Button asChild size='lg' className='bg-blue-600 hover:bg-blue-700'>
              <Link href='/workspace'>
                <Play className='mr-2 h-5 w-5' />
                Explore All Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToolShowcaseSection
