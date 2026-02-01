'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent
} from "@/components/ui/sidebar"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { useContext } from 'react';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex';
import { BookOpen, CheckCircle2, Circle, GraduationCap } from 'lucide-react';

export default function ChapterListSidebar({ courseInfo }: { courseInfo: any }) {
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = course?.courseContent;
    const courseData = course?.courseJson?.course;

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

    const completedChapters = enrollCourse?.completedChapters || [];
    const isCurrentChapterCompleted = completedChapters.includes(selectedChapterIndex);


    const calculatePercentageProgress = () => {
        const totalChapters = Array.isArray(courseContent) ? courseContent.length : 0;
        return totalChapters > 0 ? (completedChapters.length / totalChapters) * 100 : 0;
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-6 border-b border-neutral-800 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10'>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20'>
                            <GraduationCap className='w-6 h-6 text-white' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-neutral-400 font-medium mb-1'>Course Progress</p>
                            <div className='flex items-center gap-2'>
                                <Progress
                                    value={calculatePercentageProgress()}
                                    className='flex-1 h-1.5 bg-neutral-800'
                                />
                                <span className='text-xs font-semibold text-neutral-300'>
                                    {completedChapters.length}/{Array.isArray(courseContent) ? courseContent.length : 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-sm font-bold text-neutral-100 line-clamp-2 leading-tight'>
                        {courseData?.name || course?.title || 'Course'}
                    </h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <div className='flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-400 [&::-webkit-scrollbar-thumb]:via-blue-500 [&::-webkit-scrollbar-thumb]:to-blue-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:from-blue-300 [&::-webkit-scrollbar-thumb]:hover:to-blue-500'>
                    <SidebarGroup>
                        <div className='mb-3 px-2'>
                            <h3 className='text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2'>
                                <BookOpen className='w-4 h-4' />
                                Chapters
                            </h3>
                        </div>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <Accordion type="single" collapsible>
                                {Array.isArray(courseContent) && courseContent.map((chapter: any, index: number) => {
                                    const isChapterCompleted = completedChapters.includes(index);
                                    
                                    return (
                                        <AccordionItem
                                            value={`chapter-${index}`}
                                            key={index}
                                            className={'border-none mb-2 rounded-lg overflow-hidden transition-all                                         bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-cyan-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                                            }
                                        >
                                            <AccordionTrigger
                                                className='text-left px-3 py-3 hover:no-underline'
                                                onClick={() => {
                                                    setSelectedChapterIndex(index);
                                                }}
                                            >
                                                <div className='flex items-start gap-3 w-full pr-2'>
                                                    <div className={'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'}>
                                                        {isChapterCompleted ? (
                                                            <CheckCircle2 className='w-4 h-4 text-white' />
                                                        ) : (
                                                            <span className='text-xs font-bold text-white'>{index + 1}</span>
                                                        )}
                                                        
                                                            
                                                        

                                                    </div>
                                                    <div className='flex-1 min-w-0'>
                                                        <h4 className={`text-sm font-semibold leading-snug mb-1 transition-colors ${isChapterCompleted ? 'text-neutral-100 ' : 'text-neutral-300'}`}>
                                                            {chapter?.courseData?.chapterName}
                                                        </h4>
                                                        {chapter?.courseData?.duration && (
                                                            <p className='text-xs text-neutral-500'>
                                                                {chapter.courseData.duration}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent className='px-3 pb-3' asChild>
                                                <div className={`ml-10 space-y-1 pt-2 border-l-2 pl-4 ${isChapterCompleted ? 'border-blue-400 ' : 'border-neutral-600'}`}>
                                                    {(chapter?.courseData?.topics || chapter?.courseData?.topicsContent) && (chapter?.courseData?.topics || chapter?.courseData?.topicsContent)?.map((topicItem: any, topicIndex: number) => (
                                                        <div
                                                            key={topicIndex}
                                                            className={`flex items-start gap-2 py-2 px-2 rounded-md transition-all ${isChapterCompleted ? '' : 'hover:bg-neutral-800/50 cursor-pointer group'}`}
                                                        >
                                                            <Circle className={`w-1.5 h-1.5 mt-1.5 flex-shrink-0 transition-colors ${isChapterCompleted ? 'text-blue-400' : 'text-neutral-600 group-hover:text-blue-400'}`} />
                                                            <span className={`text-xs leading-relaxed transition-colors ${isChapterCompleted ? 'text-blue-300' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                                                                {topicItem?.topic || topicItem}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>

                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
            </SidebarContent>
            <SidebarFooter >
                    
            </SidebarFooter>
        </Sidebar>
    )
}