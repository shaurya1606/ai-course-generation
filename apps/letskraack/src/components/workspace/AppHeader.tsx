'use client'

import React, { Suspense } from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import dynamic from 'next/dynamic'

// Dynamically import UserButton with SSR disabled to prevent hydration issues
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.UserButton })), {
  ssr: false,
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
})


export const AppHeader = () => {
  return (
    <div className='p-4 flex justify-between items-center border-b-2'>
        <SidebarTrigger />
        <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
          <UserButton />
        </Suspense>
    </div>
  )
}
