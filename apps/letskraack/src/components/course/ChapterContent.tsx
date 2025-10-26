'use client'
import React, { useState } from 'react'
import { useContext } from 'react';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex';
import YouTube from 'react-youtube';
import { PlayCircle, BookOpen, CheckCircle2, CheckCircle, Circle, Loader2Icon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const ChapterContent = ({ courseInfo, refreshData }: { courseInfo: any, refreshData: any }) => {

    const { courseId } = useParams();

    const { courses, enrollCourse } = courseInfo ?? {};
    const courseContent = courseInfo?.courses?.courseContent;

    const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

    const [loading, setLoading] = useState(false);

    const currentChapter = courseContent?.[selectedChapterIndex];
    const videoData = currentChapter?.youtubeVideo;
    const topics = currentChapter?.courseData?.topics;
    const chapterName = currentChapter?.courseData?.chapterName;
    const chapterDuration = currentChapter?.courseData?.duration;

    // Check if current chapter is completed
    const completedChapters = enrollCourse?.completedChapters || [];
    const isCurrentChapterCompleted = completedChapters.includes(selectedChapterIndex);

    if (!currentChapter) {
        return (
            <div className='flex-1 flex items-center justify-center h-screen'>
                <div className='text-center'>
                    <BookOpen className='w-16 h-16 mx-auto text-neutral-600 mb-4' />
                    <h2 className='text-xl font-semibold text-neutral-400'>Select a chapter to begin learning</h2>
                </div>
            </div>
        );
    }

    const markChapterCompleted = async () => {
        try {
            setLoading(true);
            const updatedChapters = isCurrentChapterCompleted
                ? completedChapters.filter((item: any) => item !== selectedChapterIndex)
                : [...completedChapters, selectedChapterIndex];

            await axios.put('/api/enroll-course', {
                courseId: courseId,
                completedChapters: updatedChapters
            });

            await refreshData();
            toast.success(isCurrentChapterCompleted ? 'Chapter marked as incomplete!' : 'Chapter marked as completed!');
        } catch (error) {
            toast.error('Failed to update chapter status');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex-1 h-screen overflow-y-auto bg-gradient-to-br from-neutral-950 via-black to-neutral-950 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-900/50 [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-400 [&::-webkit-scrollbar-thumb]:via-blue-500 [&::-webkit-scrollbar-thumb]:to-blue-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:from-blue-300 [&::-webkit-scrollbar-thumb]:hover:to-blue-500'>
            <div className='max-w-5xl mx-auto px-8 py-10'>

                {/* Chapter Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-3'>
                        <span className='px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full'>
                            Chapter {selectedChapterIndex + 1}
                        </span>
                        <div className='flex text-sm'>
                            <Button
                                variant={isCurrentChapterCompleted ? 'green' : 'secondary'}
                                className={'cursor-pointer gap-2'}
                                onClick={() => markChapterCompleted()}
                                disabled={loading}
                            >{loading ? <Loader2Icon className='animate-spin' /> : (isCurrentChapterCompleted ? <CheckCircle className='w-4 h-4' /> : <Circle className='w-4 h-4' />)}
                                {isCurrentChapterCompleted ? 'Completed' : 'Mark as Complete'}
                            </Button>
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold text-neutral-100 leading-tight mb-4'>
                        {chapterName}
                    </h1>
                    <hr className='h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full' />
                </div>

                {/* Video Section */}
                {videoData && videoData.length > 0 && (
                    <section className='mb-12'>
                        <div className='flex items-center gap-3 mb-6'>
                            <PlayCircle className='w-6 h-6 text-blue-400' />
                            <h2 className='text-2xl font-bold text-neutral-100'>Related Videos</h2>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {videoData.map((video: any, index: number) => (index < 4) && (
                                <div key={index} className='rounded-xl overflow-hidden bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all shadow-lg hover:shadow-2xl'>
                                    <YouTube
                                        videoId={video.videoId}
                                        opts={{
                                            width: '100%',
                                            height: '220',
                                            playerVars: {
                                                modestbranding: 1,
                                            }
                                        }}
                                        className='w-full'
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Topics Overview */}
                {topics && topics.length > 0 && (
                    <section className='mb-12'>
                        <div className='flex items-center gap-3 mb-6'>
                            <BookOpen className='w-6 h-6 text-blue-400' />
                            <h2 className='text-2xl font-bold text-neutral-100'>Topics Covered</h2>
                        </div>
                        <div className='bg-neutral-900/50 border border-neutral-800 rounded-xl p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                {topics.map((topic: any, index: number) => (
                                    <div key={index} className='flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group'>
                                        <CheckCircle2 className='w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0' />
                                        <span className='text-neutral-300 group-hover:text-neutral-100 transition-colors font-medium'>
                                            {topic?.topic}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Detailed Content */}
                {topics && topics.length > 0 && (
                    <section className='mb-12'>
                        <div className='space-y-8'>
                            {topics.map((topic: any, index: number) => (
                                <article key={index} className='bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-all'>
                                    <div className='flex items-start gap-4 mb-4'>
                                        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0'>
                                            {index + 1}
                                        </div>
                                        <h3 className='text-2xl font-bold text-neutral-100 leading-tight'>
                                            {topic?.topic}
                                        </h3>
                                    </div>
                                    <div
                                        className='prose prose-invert prose-neutral max-w-none
                                            prose-headings:text-neutral-100 prose-headings:font-bold
                                            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                                            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                                            prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:my-4
                                            prose-strong:text-neutral-100 prose-strong:font-semibold
                                            prose-ul:my-4 prose-ul:text-neutral-300
                                            prose-ol:my-4 prose-ol:text-neutral-300
                                            prose-li:my-2
                                            prose-code:text-blue-400 prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                            prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
                                            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline'
                                        dangerouslySetInnerHTML={{ __html: topic?.content }}
                                    />
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Key Takeaways */}
                {topics && topics.length > 0 && (
                    <section className='mb-12'>
                        <div className='bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20'>
                                    <CheckCircle2 className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-neutral-100'>Key Takeaways</h2>
                            </div>
                            <ul className='space-y-4'>
                                {topics.slice(0, 5).map((topic: any, index: number) => (
                                    <li key={index} className='flex items-start gap-4'>
                                        <div className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>
                                            {index + 1}
                                        </div>
                                        <span className='text-neutral-200 leading-relaxed'>
                                            Master the concepts of <span className='font-semibold text-neutral-100'>{topic?.topic}</span> and understand its practical applications
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default ChapterContent