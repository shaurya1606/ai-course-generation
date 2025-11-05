"use client"


import React, { useEffect, useState } from 'react'
import { AddNewCourseDialog } from './AddNewCourseDialog';
import Image from 'next/image';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';
import CourseListSkeleton from './workspaceSkeleton/CourseListSkeleton';

const CourseList = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useUser();

    useEffect(() => {
        user && GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        setLoading(true);
        try {
            // Fetch course list from API or database
            const response = await axios.get('/api/courses');
            console.log('Fetched courses:', response.data);
            setCourseList(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <CourseListSkeleton />;
    }

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>
            {courseList.length === 0 ? 
            <div className='rounded-lg border border-gray-300 p-8 flex flex-col gap-4 items-center justify-center bg-neutral-900'>
                <Image src={'/online-education.png'} width={100} height={100} alt="No Courses" />
                <p className='text-white text-lg font-medium'>Look like you haven't enrolled in any courses.</p>
                <AddNewCourseDialog>
                    <button className='px-4 py-2 bg-blue-600 text-white  hover:bg-blue-800 transition rounded-md cursor-pointer font-semibold'>+ Create Your First Course</button>
                </AddNewCourseDialog>
            </div>:
            <div className='rounded-lg border border-gray-300 p-6 bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                {courseList?.map((course: any, index: number) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>}
        </div>
    )
}

export default CourseList