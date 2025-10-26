'use client'

import React from 'react'
import ChapterContent from '@/components/course/ChapterContent'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppHeader } from '@/components/workspace/AppHeader';
import ChapterListSidebar from '@/components/course/ChapterListSidebar'
import { SidebarProvider } from '@/components/ui/sidebar';


const Course = () => {
    const { courseId } = useParams()

    const [courseInfo, setCourseInfo] = useState();

    useEffect(() => {
        GetEnrollCourseById();
    }, [])

    const GetEnrollCourseById = async () => {
        try {
            const response = await axios.get('/api/enroll-course?courseId=' + courseId);
            console.log("Enrolled Courses: ", response.data);
            setCourseInfo(response.data)
        }
        catch (error) {
            console.log('Error fetching enrolled course', error);
        }
    }
    return (
        <div>
            <SidebarProvider
                style={{
                    ["--sidebar-width"]: "20rem",
                    ["--sidebar-width-mobile"]: "20rem",
                } as React.CSSProperties}>
            <ChapterListSidebar courseInfo={courseInfo} />
            <div className='w-full'>
                <AppHeader />
                <ChapterContent courseInfo={courseInfo} refreshData={() => GetEnrollCourseById()} />
            </div>
             </SidebarProvider>
        </div>

    )
}

export default Course