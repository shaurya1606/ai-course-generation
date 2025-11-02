'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Loader, MessageCircle, UserRound, Wand2 } from 'lucide-react'
import type { DiscussionRoomRow, ConversationMessage } from '@/types/types'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import ConversationBox from '@/components/ai-interview/ConversationBox'
import { ConversationProvider } from '@/context/ConversationContext'
import { useUserDetails } from '@/hooks/use-user-details'

const DiscussionRoomFeedbackPage = () => {
    const params = useParams()
    const roomId = Array.isArray(params?.roomId) ? params.roomId[0] : params?.roomId
    const [discussionRoomData, setDiscussionRoomData] = useState<DiscussionRoomRow | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isGeneratingFeedback, setIsGeneratingFeedback] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { userDetail, setUserDetail } = useUserDetails()

    const fetchDiscussionRoom = useCallback(async () => {
        if (!roomId) {
            setError('No discussion room id provided.')
            return
        }
        try {
            setIsLoading(true)
            setError(null)
            const response = await axios.get<DiscussionRoomRow | null>(`/api/discussion-room?roomId=${roomId}`)
            if (!response.data) {
                setError('Discussion room not found.')
                setDiscussionRoomData(null)
                setFeedback(null)
                return
            }
            setDiscussionRoomData(response.data)
            setFeedback(typeof response.data.feedback === 'string' ? response.data.feedback : null)
        } catch (err) {
            console.error('Error fetching interview data', err)
            setError('Failed to load discussion room. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }, [roomId])

    useEffect(() => {
        void fetchDiscussionRoom()
    }, [fetchDiscussionRoom])

    const updateCredits = useCallback(
        async (text: string) => {
            const normalized = text?.trim()
            if (!normalized || !userDetail?.email) {
                return
            }

            const tokenCount = normalized.split(/\s+/).length
            if (!tokenCount) {
                return
            }

            const currentCredits = typeof userDetail.credits === 'number' ? userDetail.credits : 0
            const updatedCredits = currentCredits + tokenCount

            try {
                const response = await axios.patch('/api/user', {
                    userEmail: userDetail.email,
                    credits: updatedCredits,
                })
                const nextCredits = typeof response.data?.credits === 'number' ? response.data.credits : updatedCredits
                setUserDetail((prev) => ({ ...prev, credits: nextCredits }))
            } catch (creditError) {
                console.error('Failed to update user credits for feedback generation', creditError)
            }
        },
        [userDetail, setUserDetail],
    )

    useEffect(() => {
        const generateFeedback = async () => {
            if (!discussionRoomData || !roomId) {
                return
            }
            if (feedback) {
                return
            }
            setIsGeneratingFeedback(true)
            try {
                const response = await axios.post('/api/ai-feedback', {
                    coachingOption: discussionRoomData.coachingOption,
                    conversation: discussionRoomData.conversation,
                })

                const generated =
                    response?.data?.aiResponse?.message?.content ??
                    response?.data?.aiResponse?.content ??
                    response?.data?.aiResponse ??
                    null

                if (!generated) {
                    setError('AI did not return feedback. Please retry later.')
                    return
                }

                setFeedback(generated)
                await updateCredits(generated)
                const updatedRoom = await axios.patch('/api/ai-feedback', {
                    roomId,
                    feedback: generated,
                })
                if (updatedRoom?.data) {
                    setDiscussionRoomData(updatedRoom.data)
                }
            } catch (generationError) {
                console.error('Error generating feedback', generationError)
                setError('Failed to generate feedback. Please try again later.')
            } finally {
                setIsGeneratingFeedback(false)
            }
        }

        if (discussionRoomData && !discussionRoomData.feedback && !feedback) {
            void generateFeedback()
        }
    }, [discussionRoomData, roomId, updateCredits, feedback])

    const conversationMessages = useMemo<ConversationMessage[]>(() => {
        if (!discussionRoomData?.conversation || !Array.isArray(discussionRoomData.conversation)) {
            return []
        }
        return discussionRoomData.conversation as ConversationMessage[]
    }, [discussionRoomData?.conversation])

    const formattedCreatedAt = useMemo(() => {
        if (!discussionRoomData?.createdAt) {
            return null
        }
        const date = new Date(discussionRoomData.createdAt)
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)
    }, [discussionRoomData?.createdAt])

    const formattedFeedbackAt = useMemo(() => {
        if (!discussionRoomData?.feedbackGeneratedAt) {
            return null
        }
        const date = new Date(discussionRoomData.feedbackGeneratedAt)
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)
    }, [discussionRoomData?.feedbackGeneratedAt])

    const markdownComponents = useMemo(
        () => ({
            h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                <h1 className={cn('mt-6 text-2xl font-semibold text-neutral-50 first:mt-0', className)} {...props} />
            ),
            h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                <h2 className={cn('mt-6 text-xl font-semibold text-neutral-50 first:mt-0', className)} {...props} />
            ),
            h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                <h3 className={cn('mt-5 text-lg font-semibold text-neutral-100 first:mt-0', className)} {...props} />
            ),
            p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
                <p className={cn('mt-3 text-base leading-relaxed text-neutral-300 first:mt-0', className)} {...props} />
            ),
            ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
                <ul className={cn('mt-3 list-disc space-y-2 pl-6 text-neutral-300 first:mt-0', className)} {...props} />
            ),
            ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
                <ol className={cn('mt-3 list-decimal space-y-2 pl-6 text-neutral-300 first:mt-0', className)} {...props} />
            ),
            li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
                <li className={cn('leading-relaxed', className)} {...props} />
            ),
            blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
                <blockquote className={cn('mt-4 border-l-2 border-emerald-400/40 pl-4 text-neutral-200', className)} {...props} />
            ),
            code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
                <code className={cn('rounded bg-neutral-800 px-1 py-0.5 text-sm text-emerald-300', className)} {...props} />
            ),
            pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
                <pre className={cn('mt-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200', className)} {...props} />
            ),
        }),
        [],
    )

    return (
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 text-neutral-100 md:p-10'>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <div>
                    <h1 className='text-3xl font-semibold tracking-tight text-neutral-50'>Discussion Room Feedback</h1>
                    <p className='mt-1 text-sm text-neutral-400'>Room ID · {roomId ?? 'Unknown'}</p>
                </div>
                {(isLoading || isGeneratingFeedback) && (
                    <div className='inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-400'>
                        <Loader className='size-4 animate-spin text-neutral-500' />
                        {isGeneratingFeedback ? 'Generating feedback…' : 'Loading discussion room…'}
                    </div>
                )}
            </div>

            {error && (
                <div className='rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200'>
                    {error}
                </div>
            )}

            <div className='grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'>
                <div className='flex flex-col gap-6'>
                    <section className='rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-xl'>
                        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='flex size-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-2xl font-semibold text-neutral-200'>
                                    {discussionRoomData?.expertName?.[0] ?? '?'}
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold text-neutral-100'>{discussionRoomData?.topic ?? 'Unknown Topic'}</h2>
                                    <p className='text-sm text-neutral-400'>Coach · {discussionRoomData?.expertName ?? 'Unknown'}</p>
                                </div>
                            </div>
                            <div className='rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-400'>
                                Created {formattedCreatedAt ?? 'Unknown'}
                            </div>
                        </div>

                        <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                            <div className='rounded-xl border border-neutral-800 bg-neutral-900/70 p-4'>
                                <p className='text-xs uppercase tracking-wide text-neutral-500'>Coaching Option</p>
                                <p className='mt-2 text-sm font-semibold text-neutral-200'>
                                    {discussionRoomData?.coachingOption ?? 'N/A'}
                                </p>
                            </div>
                            <div className='rounded-xl border border-neutral-800 bg-neutral-900/70 p-4'>
                                <p className='text-xs uppercase tracking-wide text-neutral-500'>Total Messages</p>
                                <p className='mt-2 text-2xl font-semibold text-neutral-50'>{conversationMessages.length}</p>
                            </div>
                            <div className='rounded-xl border border-neutral-800 bg-neutral-900/70 p-4'>
                                <p className='text-xs uppercase tracking-wide text-neutral-500'>Feedback Status</p>
                                <p
                                    className={cn(
                                        'mt-2 text-sm font-semibold',
                                        feedback ? 'text-emerald-400' : 'text-neutral-400',
                                    )}
                                >
                                    {feedback ? 'Feedback generated' : 'Pending generation'}
                                </p>
                                {formattedFeedbackAt && (
                                    <p className='mt-1 text-xs text-neutral-500'>Updated {formattedFeedbackAt}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className='rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <Wand2 className='size-5 text-neutral-300' />
                                <h2 className='text-lg font-semibold text-neutral-100'>Feedback Overview</h2>
                            </div>
                            {feedback && (
                                <button
                                    onClick={() => window.print()}
                                    className='rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 transition hover:bg-neutral-800'
                                >
                                    Save / Print
                                </button>
                            )}
                        </div>

                        <div className='mt-4 rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-4 text-sm text-neutral-300 '>
                            {feedback ? (
                                <ReactMarkdown components={markdownComponents}>
                                    {feedback}
                                </ReactMarkdown>
                            ) : isGeneratingFeedback ? (
                                <div className='flex items-center gap-3 text-neutral-400'>
                                    <Loader className='size-4 animate-spin text-neutral-500' /> Generating personalised feedback…
                                </div>
                            ) : (
                                <p className='text-neutral-500'>Feedback is not available yet. Please check back soon.</p>
                            )}
                        </div>
                    </section>
                </div>

                <aside className='flex flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-xl h-fit'>
                    <ConversationProvider initialConversation={conversationMessages}>
                        <ConversationBox disabled />
                    </ConversationProvider>
                    <div className='rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-400'>
                        <div className='flex items-center gap-2 text-neutral-300'>
                            <UserRound className='size-4' /> Coach · {discussionRoomData?.expertName ?? 'Unknown'}
                        </div>
                        <div className='mt-2 flex items-center gap-2 text-neutral-300'>
                            <MessageCircle className='size-4' /> Total messages · {conversationMessages.length}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DiscussionRoomFeedbackPage