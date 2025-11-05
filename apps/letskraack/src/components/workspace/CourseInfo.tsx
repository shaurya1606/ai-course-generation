'use client'

import { Book, Clock, PlayCircle, Settings, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"


const CourseInfo = ({ course, viewCourse }: { course: any, viewCourse?: boolean }) => {

    const [loading, setLoading] = useState(false);
    const courseLayout = course?.courseJson?.course
    const router = useRouter();
    console.log('Course in CourseInfo:', course);
    console.log('Course Layout in CourseInfo:', courseLayout);

    if (!course || !courseLayout) {
        return null;
    }

    const duration = courseLayout?.chapters?.reduce((total: number, chapter: any) => {
        const chapterDuration = chapter?.duration ? parseInt(chapter.duration) : 0;
        return total + chapterDuration;
    }, 0) || 0;
    // duration is in minutes
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const GenerateCourseContent = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseId: course?.cid,
                courseName: course?.name,
            });

            console.log('Generated Course Content:', response.data);
            setLoading(false);
            router.replace('/workspace');
            toast.success("Course content generated successfully.");
        } catch (error) {
            console.error('Error generating course content:', error);
            setLoading(false);
            toast.error("Server side error. Please try again.");
        }
    }

    const navigateToCourse = () => {
        setLoading(true);
        router.push(`/course/${course?.cid}`);
    }

    return (
        <div className="p-4 md:p-8 border border-gray-900 rounded-xl shadow-lg flex flex-col md:flex-row-reverse gap-6 max-w-full w-full items-stretch bg-gradient-to-br from-neutral-900 to-black">
            {/* Banner Image or Placeholder */}
            <div className="flex-shrink-0 w-full md:w-80 h-48 md:h-auto bg-neutral-900 rounded-lg border-2 border-dashed border-neutral-800 flex items-center justify-center overflow-hidden">
                {/* Uncomment and use if bannerImageUrl is available */}
                {/* {courseLayout?.bannerImageUrl && (
                        <Image src={courseLayout.bannerImageUrl} alt={courseLayout?.name} width={320} height={180} className="object-cover w-full h-full rounded-lg" />
                    )} */}
            </div>
            {/* Course Info */}
            <div className="flex flex-col gap-4 flex-1">
                <h2 className="font-bold text-2xl md:text-3xl text-neutral-100 leading-tight">{courseLayout?.name}</h2>
                <p className="text-neutral-300 text-base md:text-lg line-clamp-2">{courseLayout?.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 shadow-sm rounded-lg border border-neutral-800 bg-neutral-900">
                        <Clock className="text-neutral-400 w-6 h-6" />
                        <div>
                            <h3 className="font-semibold text-sm text-neutral-200">Duration</h3>
                            <p className="text-xs text-neutral-400">{hours}h {minutes}m</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 shadow-sm rounded-lg border border-neutral-800 bg-neutral-900">
                        <Book className="text-neutral-400 w-6 h-6" />
                        <div>
                            <h3 className="font-semibold text-sm text-neutral-200">Chapters</h3>
                            <p className="text-xs text-neutral-400">{courseLayout?.noOfChapters} Chapters</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 shadow-sm rounded-lg border border-neutral-800 bg-neutral-900">
                        <TrendingUp className="text-neutral-400 w-6 h-6" />
                        <div>
                            <h3 className="font-semibold text-sm text-neutral-200">Difficulty Level</h3>
                            <p className="text-xs text-neutral-400">{courseLayout?.level}</p>
                        </div>
                    </div>
                </div>
                {viewCourse ? (
                    <Button variant="default" className="w-full md:w-60 mt-4 cursor-pointer text-neutral-100 font-semibold text-lg" onClick={navigateToCourse} disabled={loading}>  {loading ? <Loader2Icon className="animate-spin" /> : <PlayCircle className="w-4 h-4" />} View Course</Button>
                ) :  <Button variant="default" className="w-full md:w-60 mt-4 cursor-pointer text-white font-semibold text-lg" onClick={GenerateCourseContent} disabled={loading}>  {loading ? <Loader2Icon className="animate-spin" /> : <Settings />} Generate Content</Button>}
               
            </div>
        </div>
    )
}

export default CourseInfo