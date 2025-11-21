'use client'
import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const GlobalNotFound = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <div className='mb-8'>
          <h1 className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-4'>
            404
          </h1>
          <h2 className='text-3xl font-bold text-neutral-100 mb-4'>Page Not Found</h2>
          <p className='text-neutral-400 text-lg leading-relaxed'>
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild variant='default' className='bg-blue-600 hover:bg-blue-700 text-white'>
            <Link href='/'>
              <Home className='w-4 h-4 mr-2' />
              Go Home
            </Link>
          </Button>
          <Button asChild variant='outline' className='border-neutral-600 text-neutral-300 hover:bg-neutral-800'>
            <Link href='javascript:history.back()'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Go Back
            </Link>
          </Button>
        </div>

        <div className='mt-12'>
          <div className='w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalNotFound
