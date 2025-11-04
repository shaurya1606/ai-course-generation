import EnrollCourseList from '@/components/workspace/EnrollCourseList'
import WelcomeBanner from '@/components/workspace/WelcomeBanner'
import React from 'react'

const MyLearning = () => {
  return (
    <div>
        <WelcomeBanner />
        <h2 className='font-extrabold text-3xl mb-2'>My Learning Journey</h2>
        <EnrollCourseList />
    </div>
  )
}

export default MyLearning