'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EnrollCourseCard from './EnrollCourseCard'
import CourseListSkeleton from './workspaceSkeleton/CourseListSkeleton'

const EnrollCourseList = () => {

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetEnrollCourse();
    }, [])

    const GetEnrollCourse = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/enroll-course');
            console.log("Enrolled Courses: ", response.data);
            setEnrolledCourseList(response.data)
            console.log("Enrolled Course List: ", enrolledCourseList);
        }
        catch (error) {
            console.log('Error fetching enrolled course', error);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <CourseListSkeleton />;
    }


    return (
        <div className='mt-3 mb-6'>
            {enrolledCourseList.length > 0 ? (
            <>
            <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>
            <div className='rounded-lg border border-gray-300 p-6 bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                {enrolledCourseList?.map((course: any, index: number) => (
                    <EnrollCourseCard key={index} course={course?.courses} enrollCourses={course?.enrollCourse} />
                ))}
            </div>
            </>): null}
        </div>
    )
}

export default EnrollCourseList