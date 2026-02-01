'use client'
import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 flex items-center justify-center px-4'>
      <div className='text-center max-w-lg'>
        <div className='mb-8'>
          <div className='w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6'>
            <AlertTriangle className='w-12 h-12 text-red-400' />
          </div>
          <h1 className='text-4xl font-bold text-neutral-100 mb-4'>Something went wrong!</h1>
          <p className='text-neutral-400 text-lg leading-relaxed mb-4'>
            We encountered an unexpected error. Our team has been notified and is working to fix it.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className='text-left bg-neutral-900 p-4 rounded-lg mb-4'>
              <summary className='cursor-pointer text-neutral-300 font-medium'>Error Details (Development)</summary>
              <pre className='text-red-400 text-sm mt-2 whitespace-pre-wrap'>{error.message}</pre>
            </details>
          )}
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={reset} variant='default' className='bg-blue-600 hover:bg-blue-700 text-white'>
            <RefreshCw className='w-4 h-4 mr-2' />
            Try Again
          </Button>
          <Button asChild variant='outline' className='border-neutral-600 text-neutral-300 hover:bg-neutral-800'>
            <Link href='/'>
              <Home className='w-4 h-4 mr-2' />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GlobalError
