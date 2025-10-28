
import WelcomeBanner from '@/components/workspace/WelcomeBanner'
import React from 'react'
import CourseList from '@/components/workspace/CourseList'
import EnrollCourseList from '@/components/workspace/EnrollCourseList'

const Workspace = () => {


  return (
    <div>
      <WelcomeBanner />
      <EnrollCourseList />
      <CourseList />
    </div>
  )
}

export default Workspace