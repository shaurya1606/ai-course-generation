'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, BookOpen, Code, FileText, Brain } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const handleStartLearning = () => {
    if (isLoaded && user) {
      router.push('/workspace')
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <section className='bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
        <div className='text-center'>
          <div className='flex justify-center mb-6'>
            <div className='flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2'>
              <Sparkles className='h-4 w-4 text-blue-400' />
              <span className='text-sm text-blue-400 font-medium'>AI-Powered Learning Platform</span>
            </div>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent'>
            Master Skills with
            <br />
            <span className='text-blue-400'>AI-Driven Courses</span>
          </h1>

          <p className='text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Transform your learning journey with personalized AI-generated courses, interactive coding challenges,
            resume analysis, and collaborative discussion rooms. Crack your goals with LetsKrack.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
            <Button onClick={handleStartLearning} size='lg' className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg cursor-pointer'>
              Start Learning Free
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button asChild variant='outline' size='lg' className='border-neutral-600 text-neutral-300 hover:bg-neutral-800 px-8 py-3 text-lg'>
              <Link href='#features'>Explore Features</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
            <div className='flex items-center justify-center space-x-3 bg-neutral-800/50 rounded-lg px-6 py-3 border border-neutral-700'>
              <BookOpen className='h-6 w-6 text-blue-400' />
              <span className='text-neutral-200 font-medium'>AI Course Generation</span>
            </div>
            <div className='flex items-center justify-center space-x-3 bg-neutral-800/50 rounded-lg px-6 py-3 border border-neutral-700'>
              <Code className='h-6 w-6 text-green-400' />
              <span className='text-neutral-200 font-medium'>Coding Interviews</span>
            </div>
            <div className='flex items-center justify-center space-x-3 bg-neutral-800/50 rounded-lg px-6 py-3 border border-neutral-700'>
              <FileText className='h-6 w-6 text-purple-400' />
              <span className='text-neutral-200 font-medium'>Resume Analysis</span>
            </div>
            <div className='flex items-center justify-center space-x-3 bg-neutral-800/50 rounded-lg px-6 py-3 border border-neutral-700'>
              <Brain className='h-6 w-6 text-pink-400' />
              <span className='text-neutral-200 font-medium'>AI Interview Coach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
