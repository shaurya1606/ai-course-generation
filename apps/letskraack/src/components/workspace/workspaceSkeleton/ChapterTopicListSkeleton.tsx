'use client'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

const ChapterTopicListSkeleton = () => {
    return (
        <div className="w-full px-2 md:px-8 py-10">
            <div>
                <Skeleton className="h-8 w-64 mx-auto mb-8" />
            </div>
            <div className="flex flex-col gap-10 items-center justify-center mt-4 w-full">
                {[1, 2, 3].map((chapterIdx) => (
                    <div key={chapterIdx} className="flex flex-col items-center w-full max-w-2xl">
                        {/* Chapter Card Skeleton */}
                        <div className="w-full p-4 border-2 border-neutral-700 shadow-xl rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 mb-2">
                            <Skeleton className="h-5 w-24 mx-auto mb-2" />
                            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                        </div>
                        
                        {/* Topics Timeline Skeleton */}
                        <div className="w-full flex flex-col items-center">
                            {[1, 2, 3, 4].map((topicIdx) => (
                                <div className="flex flex-col items-center w-full" key={topicIdx}>
                                    {/* Vertical connector */}
                                    <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full">
                                        {/* Left topic name (hidden on even for zigzag effect) */}
                                        <div className={`hidden lg:block flex-1 text-right ${topicIdx % 2 === 0 ? 'opacity-0' : ''}`}>
                                            <Skeleton className="h-4 w-40 ml-auto" />
                                        </div>
                                        {/* Topic number */}
                                        <Skeleton className="w-16 h-10 rounded-full flex-shrink-0" />
                                        {/* Right topic name (hidden on odd for zigzag effect) */}
                                        <div className={`hidden lg:block flex-1 text-left ${topicIdx % 2 !== 0 ? 'opacity-0' : ''}`}>
                                            <Skeleton className="h-4 w-40" />
                                        </div>
                                        {/* Mobile: topic name below number (visible below lg) */}
                                        <Skeleton className="block lg:hidden h-4 w-32 mt-2" />
                                    </div>
                                    {/* Last topic: show gift icon */}
                                    {topicIdx === 4 && (
                                        <>
                                            <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                            <Skeleton className="w-14 h-14 rounded-full my-2" />
                                            <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {/* Finish Card Skeleton */}
                <div className="w-full max-w-2xl p-4 border border-neutral-700 shadow-lg rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center mt-8">
                    <Skeleton className="h-6 w-20" />
                </div>
            </div>
        </div>
    )
}

export default ChapterTopicListSkeleton
