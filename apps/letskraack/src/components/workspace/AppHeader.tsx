'use client'

import React, { Suspense } from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Dynamically import UserButton with SSR disabled to prevent hydration issues
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.UserButton })), {
  ssr: false,
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
})


export const AppHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className='p-4 flex justify-between items-center border-b-2'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleBack}
            className='p-2'
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <SidebarTrigger />
        </div>
        <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
          <UserButton />
        </Suspense>
    </div>
  )
}
