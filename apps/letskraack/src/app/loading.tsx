'use client'
import React from 'react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 flex items-center justify-center'>
      <div className='text-center'>
        <div className='relative'>
          <Loader2 className='w-16 h-16 animate-spin text-blue-400 mx-auto mb-4' />
          <div className='absolute inset-0 w-16 h-16 mx-auto border-4 border-blue-400/20 rounded-full animate-ping'></div>
        </div>
        <h2 className='text-2xl font-bold text-neutral-100 mb-2'>Loading...</h2>
        <p className='text-neutral-400'>Please wait while we prepare your experience</p>
      </div>
    </div>
  )
}

export default Loading
