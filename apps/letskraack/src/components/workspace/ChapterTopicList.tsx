'use client'
import React from 'react'
import { Gift } from 'lucide-react'


const ChapterTopicList = ({ course }: { course: any }) => {
    const courseLayout = course?.courseJson?.course

    if (!course || !courseLayout) {
        return null;
    }

    return (
        <div className="w-full px-2 md:px-8 py-10">
            <div>
                <h2 className="font-bold text-2xl md:text-3xl text-neutral-100 leading-tight mb-8 text-center">Chapters & Topics</h2>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center mt-4 w-full">
                {courseLayout?.chapters.map((chapter: any, chapterIdx: number) => (
                    <div key={chapterIdx} className="flex flex-col items-center w-full max-w-2xl">
                        <div className="w-full p-4 border-2 border-blue-500 shadow-xl rounded-xl bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-700 text-white mb-2">
                            <h2 className="text-center text-lg font-semibold tracking-wide text-blue-200 drop-shadow">Chapter {chapterIdx + 1}</h2>
                            <h2 className="font-bold text-xl text-center mb-2 text-white drop-shadow">{chapter.chapterName}</h2>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-blue-100">
                                <span className="bg-blue-600/70 px-3 py-1 rounded-full">Duration: {chapter?.duration}</span>
                                <span className="bg-blue-600/70 px-3 py-1 rounded-full">Topics: {chapter?.topics?.length}</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            {chapter?.topics.map((topic: any, topicIdx: number) => (
                                <div className="flex flex-col items-center w-full" key={topicIdx}>
                                    {/* Vertical connector */}
                                    <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full">
                                        {/* Left topic name (hidden on even for zigzag effect) */}
                                        <span className={`hidden lg:block flex-1 text-right text-neutral-400 text-sm ${topicIdx % 2 === 0 ? 'opacity-0' : ''}`}>{topic}</span>
                                        {/* Topic number */}
                                        <h2 className="text-center rounded-full bg-neutral-800 border border-neutral-700 px-6 py-2 text-neutral-200 font-bold shadow-md">{topicIdx + 1}</h2>
                                        {/* Right topic name (hidden on odd for zigzag effect) */}
                                        <span className={`hidden lg:block flex-1 text-left text-neutral-400 text-sm ${topicIdx % 2 !== 0 ? 'opacity-0' : ''}`}>{topic}</span>
                                        {/* Mobile: topic name below number (visible below lg) */}
                                        <span className="block lg:hidden text-center text-neutral-400 text-sm mt-2">{topic}</span>
                                    </div>
                                    {/* Last topic: show gift icon and finish connector */}
                                    {topicIdx === chapter?.topics?.length - 1 && (
                                        <>
                                            <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                            <div className="flex items-center justify-center gap-5 my-2">
                                                <Gift className="rounded-full bg-neutral-800 border border-neutral-700 h-14 w-14 text-yellow-400 p-4 shadow-lg" />
                                            </div>
                                            <div className="h-6 md:h-10 bg-neutral-800 w-1 mx-auto"></div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="w-full max-w-2xl p-4 border border-green-700 shadow-lg rounded-xl bg-gradient-to-br from-green-700 to-green-900 text-white flex items-center justify-center mt-8">
                    <h2 className="font-bold text-lg tracking-wide">Finish</h2>
                </div>
            </div>
        </div>
    )
}

export default ChapterTopicList