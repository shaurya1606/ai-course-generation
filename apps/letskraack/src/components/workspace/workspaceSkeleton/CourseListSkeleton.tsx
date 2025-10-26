import React from 'react'
import { Skeleton } from '../../ui/skeleton'

const CourseListSkeleton = () => {
    return (
        <div>
            {/* Header */}
            <Skeleton className="h-8 w-48 mb-4" />
            
            {/* Course Cards Grid */}
            <div className="rounded-lg border border-gray-300 p-6 bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-900 to-black flex flex-col h-[450px]">
                        {/* Banner */}
                        <Skeleton className="w-full h-48 flex-shrink-0" />
                        
                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col gap-3">
                            {/* Title */}
                            <Skeleton className="h-6 w-3/4" />
                            
                            {/* Description */}
                            <div className="flex-grow space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                            
                            {/* Stats */}
                            <div className="flex justify-between gap-2 mb-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            
                            {/* Button */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseListSkeleton
