import React from 'react'
import Navbar from '@/components/resume-analyser/Navbar'
import HeroSection from '@/components/resume-analyser/HeroSection'
import ResumeSection  from '@/components/resume-analyser/ResumeSection'

const page = () => {
  return (
  <div className='min-h-screen'>
        <Navbar />
        <HeroSection />
        <ResumeSection />
    </div>
  )
}

export default page