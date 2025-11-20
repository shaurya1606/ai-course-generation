'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { PlayCircle, BookOpen, Clock, Zap, Loader2Icon } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

const EnrollCourseCard = ({ course, enrollCourses }: { course: any, enrollCourses: any }) => {
    const courseJson = course.courseJson.course;
    const [loading, setLoading] = useState(false);

    const completedChapters = enrollCourses?.completedChapters || [];

    // console.log('EnrollCourseCard - completedChapters:', completedChapters);
    console.log('EnrollCourseCard - enrollCourses:', enrollCourses);

    const route = useRouter()

    const calculatePercentageProgress = () => {
        return Math.round((completedChapters.length / courseJson.noOfChapters) * 100 * 100) / 100 || 0;
    }

    const viewCourse = () => {
        setLoading(true);
        route.push(`/workspace/view-course/${course?.cid}`);
    }


    return (
        <div className='group border border-neutral-700/50 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 flex flex-col p-2 h-full'>
            {/* Banner Image */}
            <div className='relative w-full h-48 flex-shrink-0 overflow-hidden bg-neutral-800 rounded-t-xl'>
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
            <div className='p-5 pb-4 flex flex-col flex-1 gap-3'>
                {/* Title */}
                <h2 className='text-lg font-bold text-neutral-100 line-clamp-2 leading-tight'>
                    {courseJson.name}
                </h2>

                {/* Description */}
                <p className='text-neutral-400 text-sm line-clamp-2 flex-grow leading-relaxed'>
                    {courseJson.description}
                </p>

                {/* Progress Section */}
                <div className='mt-auto'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-xs text-neutral-400 font-medium'>Progress</span>
                        <span className='text-xs text-blue-400 font-semibold'>{calculatePercentageProgress()}%</span>
                    </div>
                    <Progress value={calculatePercentageProgress()} className='h-2' />
                </div>

                {/* Stats */}
                <div className='flex flex-wrap items-center gap-2'>
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
                <div>
                    <Button variant='green' className='w-full text-sm font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all' onClick={viewCourse}>
                        {loading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : <PlayCircle className='w-4 h-4' />}
                        {calculatePercentageProgress() > 0 ? 'Continue Learning' : 'Start Learning'}
                    </Button>
                </div>
            </div>
        </div>


    )
}

export default EnrollCourseCard