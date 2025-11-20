'use client'

import React from 'react'
import ChapterContent from '@/components/course/ChapterContent'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppHeader } from '@/components/workspace/AppHeader';
import ChapterListSidebar from '@/components/course/ChapterListSidebar'
import { SidebarProvider } from '@/components/ui/sidebar';
import { useContext } from 'react';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex';


const Course = () => {
    const { courseId } = useParams()

    const [courseInfo, setCourseInfo] = useState();

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

    useEffect(() => {
        GetEnrollCourseById();
    }, [courseId]);

    const GetEnrollCourseById = async () => {
        try {
            const response = await axios.get('/api/enroll-course?courseId=' + courseId);
            console.log("Enrolled Courses: ", response.data);
            setCourseInfo(response.data)

            // Reset selectedChapterIndex if out of bounds
            const courseContent = response.data?.courses?.courseContent;
            if (courseContent && Array.isArray(courseContent) && selectedChapterIndex >= courseContent.length) {
                setSelectedChapterIndex(0);
            }
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