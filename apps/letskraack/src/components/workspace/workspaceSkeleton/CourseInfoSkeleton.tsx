import React from 'react'
import { Skeleton } from '../../ui/skeleton'

const CourseInfoSkeleton = () => {
    return (
        <div className="p-4 md:p-8 border border-gray-900 rounded-xl shadow-lg flex flex-col md:flex-row-reverse gap-6 max-w-full w-full items-stretch bg-gradient-to-br from-neutral-900 to-black">
            {/* Banner Skeleton */}
            <div className="flex-shrink-0 w-full md:w-80 h-48 md:h-64">
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
            
            {/* Course Info Skeleton */}
            <div className="flex flex-col gap-4 flex-1">
                {/* Title */}
                <Skeleton className="h-8 w-3/4" />
                 
                {/* Description */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                </div>
                
                {/* Button */}
                <Skeleton className="h-12 w-full md:w-60 mt-4 rounded-md" />
            </div>
        </div>
    )
}

export default CourseInfoSkeleton
