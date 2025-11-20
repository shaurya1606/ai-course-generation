'use client'

import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import EnrollCourseCard from './EnrollCourseCard'
import CourseListSkeleton from './workspaceSkeleton/CourseListSkeleton'

const EnrollCourseList = () => {
    const fetcher = (url: string) => axios.get(url).then((res: any) => res.data)
    
    const { data: enrolledCourseList, error, isLoading } = useSWR('/api/enroll-course', fetcher)

    if (isLoading) {
        return <CourseListSkeleton />;
    }

    if (error) {
        console.log('Error fetching enrolled course', error);
        return <div className='mt-3 mb-6'>Error loading enrolled courses</div>;
    }

    return (
        <div className='mt-3 mb-6'>
            {enrolledCourseList && enrolledCourseList.length > 0 ? (
                <>
                    <h2 className='text-2xl font-bold mb-4'>Your Enrolled Courses</h2>
                    <div className='rounded-lg border border-gray-300 p-6 bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                        {enrolledCourseList?.map((course: any, index: number) => (
                            <EnrollCourseCard key={index} course={course?.courses} enrollCourses={course?.enrollCourse} />
                        ))}
                    </div>
                </>) : null}
        </div>
    )
}

export default EnrollCourseList