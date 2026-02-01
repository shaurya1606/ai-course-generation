"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

const WelcomeBanner = () => {
  const { user, isLoaded } = useUser();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || !isLoaded) {
    return (
      <div className='p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-6'>
        <h1 className='text-2xl font-bold'>Welcome to LetsKrack!</h1>
        <p className='text-amber-50'>Learn, Create and Explore Your favorite courses.</p>
      </div>
    );
  }

  return (
    <div className='p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-6'>
      <h1 className='text-2xl font-bold'>Welcome {user?.fullName || 'User'} to LetsKrack!</h1>
      <p className='text-amber-50'>Learn, Create and Explore Your favorite courses.</p>
    </div>
  )
}

export default WelcomeBanner