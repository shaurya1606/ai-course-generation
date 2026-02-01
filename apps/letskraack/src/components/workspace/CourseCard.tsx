'use client'
import React, { useState }from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Settings, BookOpen, Clock, Zap, Loader2Icon, BookOpenText, Route } from 'lucide-react'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'


const CourseCard = ({ course  }: { course: any }) => {
    const courseJson = course.courseJson.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onEnrollCourse = async () => {
  try {
    setLoading(true);

    const response = await axios.post('/api/enroll-course', {
      courseId: course?.cid,
    });

    const { message, enrollment } = response.data;

    if (message === "Already enrolled") {
      toast.warning("You are already enrolled in this course.");
      return;
    }

    if (message === "Enrolled successfully") {
      toast.success("Successfully enrolled in the course.");
      // Trigger SWR revalidation to refresh enrolled courses list
      mutate('/api/enroll-course');
      return;
    }
    console.log("Enroll Course Response:", enrollment);

    // Any unexpected state
    toast.error("Unexpected response from server.");
  } 
  catch (error) {
    console.error("Error enrolling course:", error);
    toast.error("Error enrolling course. Please try again.");
  }
  finally {
    setLoading(false);
  }
};


    const navigateToGenerateCourseContent = () => {
        setLoading(true);
        router.push(`/workspace/edit-course/${course.cid}`);
    }
  return (
        <div className='group border border-neutral-700/50 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 flex flex-col p-2 h-full'>
            {/* Banner Image */}
            <div className='relative w-full h-48 flex-shrink-0 overflow-hidden bg-neutral-800'>
                {course.bannerImageUrl ? (
                    <Image
                        src={course.bannerImageUrl} 
                        alt={course.courseJson.course.name}
                        width={400}
                        height={192}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />      
                ) : (
                    <div className='w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse' />
                )}
            </div>

            {/* Content */}
            <div className='p-5 flex flex-col flex-1 gap-3'>
                {/* Title */}
                <h2 className='text-lg font-bold text-neutral-100 line-clamp-2 leading-tight'>
                    {courseJson.name}
                </h2>
                
                {/* Description */}
                <p className='text-neutral-400 text-sm line-clamp-3 flex-grow leading-relaxed'>
                    {courseJson.description}
                </p>
                
                {/* Stats */}
                <div className='flex flex-wrap items-center gap-2 mt-auto'>
                    <span className='inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-1 rounded-md text-xs font-medium'>
                        <BookOpen className="w-3 h-3" />
                        {courseJson.noOfChapters} Chapters
                    </span>
                    <span className='inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-md text-xs font-medium'>
                        <Clock className="w-3 h-3" />
                        {courseJson.totalDuration}
                    </span>
                    <span className='inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-md text-xs font-medium'>
                        <Zap className="w-3 h-3" />
                        {courseJson.level}
                    </span>
                </div>

                {/* CTA Button */}
                <div className='mt-3'>
                    {course.courseContent ? (
                                <Button variant='green' className='w-full text-sm font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all' onClick={onEnrollCourse}
                                disabled={loading}>
                                    {loading ? (
                                        <Loader2Icon className='animate-spin' />
                                    ) : (
                                        <BookOpenText className='w-4 h-4' />
                                    )}
                                    Enroll Course
                                </Button>
                    ) : (
                        
                            <Button variant='default' className='w-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all text-white' onClick={navigateToGenerateCourseContent}>
                                {loading? <Loader2Icon className='animate-spin' /> : <Settings className='w-4 h-4' />}
                                Generate Content
                            </Button>
                      
                    )}
                </div>
            </div>
        </div>


  )
}

export default CourseCard