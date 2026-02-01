'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const handleGetStarted = () => {
    if (isLoaded && user) {
      router.push('/workspace')
    } else {
      router.push('/sign-up')
    }
  }

  return (
    <nav className='bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <svg fill="none" height="32" viewBox="0 0 42 48" width="32" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                <path clipRule="evenodd" d="m22.1017 20.8596 9.8995-9.8994-2.1213-2.12137-7.3389 7.33887v-13.1777h-3v13.1777l-7.3388-7.33887-2.1213 2.12137 9.8995 9.8994 1.0606 1.0607zm2.1207 2.1214 9.8995-9.8995 2.1213 2.1213-7.3388 7.3388h13.0956v3h-13.0956l7.3388 7.3389-2.1213 2.1213-9.8995-9.8995-1.0607-1.0607zm-16.26224 12.0208 9.89944-9.8995 1.0607-1.0607-1.0607-1.0606-9.89944-9.8995-2.12133 2.1213 7.33887 7.3388h-13.17574688v3h13.17574688l-7.33887 7.3389zm12.02024-7.7782-9.8995 9.8995 2.1213 2.1213 7.3388-7.3388v13.0944h3v-13.0944l7.3389 7.3388 2.1213-2.1213-9.8995-9.8995-1.0607-1.0607z" fill="currentColor" fillRule="evenodd"/>
              </svg>
              <span className='text-xl font-bold text-white'>LetsKrack</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link href='#features' className='text-neutral-300 hover:text-white transition-colors'>
              Features
            </Link>
            <Link href='#how-it-works' className='text-neutral-300 hover:text-white transition-colors'>
              How It Works
            </Link>
            <Link href='#tools' className='text-neutral-300 hover:text-white transition-colors'>
              Tools
            </Link>
            <Link href='/workspace' className='text-neutral-300 hover:text-white transition-colors'>
              Workspace
            </Link>
            <Button onClick={handleGetStarted} variant='default' className='bg-blue-600 hover:bg-blue-700'>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-neutral-300 hover:text-white'
            >
              {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-neutral-900 border-t border-neutral-800'>
              <Link
                href='#features'
                className='block px-3 py-2 text-neutral-300 hover:text-white transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href='#how-it-works'
                className='block px-3 py-2 text-neutral-300 hover:text-white transition-colors'
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href='#tools'
                className='block px-3 py-2 text-neutral-300 hover:text-white transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Tools
              </Link>
              <Link
                href='/workspace'
                className='block px-3 py-2 text-neutral-300 hover:text-white transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Workspace
              </Link>
              <div className='px-3 py-2'>
                <Button onClick={handleGetStarted} variant='default' className='w-full bg-blue-600 hover:bg-blue-700'>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
