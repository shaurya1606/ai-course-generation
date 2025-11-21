'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, MessageSquare, FileText, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const AITools = () => {
  const tools = [
    {
      id: 'course-generation',
      title: 'AI Course Generation',
      description: 'Create comprehensive courses with AI assistance. Generate structured learning content, chapters, and materials automatically.',
      icon: BookOpen,
      href: '/workspace/edit-course/new',
      color: 'from-blue-500 to-purple-600',
      features: ['Auto-generated chapters', 'Structured content', 'Custom topics', 'Progress tracking']
    },
    {
      id: 'ai-interview',
      title: 'AI Interview Coach',
      description: 'Practice interviews with AI-powered coaching. Get real-time feedback and improve your interview skills.',
      icon: MessageSquare,
      href: '/ai-interview',
      color: 'from-green-500 to-teal-600',
      features: ['Voice interaction', 'Industry questions', 'Feedback analysis', 'Skill assessment']
    },
    {
      id: 'resume-analyser',
      title: 'Resume Analyser',
      description: 'Get detailed analysis of your resume with ATS compatibility check and improvement suggestions.',
      icon: FileText,
      href: '/resume-analyser',
      color: 'from-orange-500 to-red-600',
      features: ['ATS compatibility', 'Content analysis', 'Improvement tips', 'Score rating']
    }
  ]

  return (
    <div className='min-h-screen bg-neutral-950 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <Sparkles className='h-8 w-8 text-blue-400' />
            <h1 className='text-4xl font-bold'>AI Tools</h1>
          </div>
          <p className='text-neutral-400 text-lg'>
            Powerful AI-powered tools to enhance your learning and career development journey
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tools.map((tool) => (
            <Card key={tool.id} className='bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all duration-300 group'>
              <CardHeader className='pb-4'>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className='h-6 w-6 text-white' />
                </div>
                <CardTitle className='text-xl text-white group-hover:text-blue-400 transition-colors'>
                  {tool.title}
                </CardTitle>
                <CardDescription className='text-neutral-400 leading-relaxed'>
                  {tool.description}
                </CardDescription>
              </CardHeader>

              <CardContent className='pt-0'>
                <div className='mb-6'>
                  <h4 className='text-sm font-semibold text-neutral-300 mb-3'>Features:</h4>
                  <ul className='space-y-2'>
                    {tool.features.map((feature, index) => (
                      <li key={index} className='flex items-center gap-2 text-sm text-neutral-400'>
                        <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300'>
                  <Link href={tool.href} className='flex items-center justify-center gap-2'>
                    Get Started
                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <div className='bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-8 border border-neutral-700'>
            <h3 className='text-2xl font-bold mb-4'>Need Help Getting Started?</h3>
            <p className='text-neutral-400 mb-6 max-w-2xl mx-auto'>
              Our AI tools are designed to be intuitive and powerful. Each tool comes with detailed guidance
              and examples to help you make the most of your learning experience.
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <Button variant='outline' className='border-neutral-600 text-neutral-300 hover:bg-neutral-800'>
                View Documentation
              </Button>
              <Button variant='outline' className='border-neutral-600 text-neutral-300 hover:bg-neutral-800'>
                Watch Tutorials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITools