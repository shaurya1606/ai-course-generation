'use client'

import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { UserButton } from '@clerk/nextjs'


export const AppHeader = () => {
  return (
    <div className='p-4 flex justify-between items-center border-b-2'>
        <SidebarTrigger />
        <UserButton />
    </div>
  )
}
