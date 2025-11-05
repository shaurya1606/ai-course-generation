'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { CoachingExpert } from '@/constants/constant'
import { UserAvatar, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { StreamingTranscriber } from 'assemblyai'
import { getToken } from '@/services/voiceToTextService'
import { Loader2Icon } from 'lucide-react'
import type { ConversationMessage, DiscussionRoomRow } from '@/types/types'
import ConversationBox from '@/components/ai-interview/ConversationBox'
import textToSpeechServices from '@/services/textToSpeechServices'
import { VoiceId } from '@aws-sdk/client-polly'
import { ConversationProvider, useConversation } from '@/context/ConversationContext'
import { toast } from 'sonner'
import { useUserDetails } from '@/hooks/use-user-details'

type CoachingExpertType = {
    name: string
    avatar: string
}

const DiscussionRoomInner = () => {
    const params = useParams()
    const router = useRouter()
    const roomId = Array.isArray(params?.roomId) ? params.roomId[0] : params?.roomId
    const [expert, setExpert] = useState<CoachingExpertType | null>(null)
    const [discussionRoomData, setDiscussionRoomData] = useState<DiscussionRoomRow | null>(null)
    const [enableMic, setEnableMic] = useState(false)
    const [loading, setLoading] = useState(false)
    const [enableFeedback, setEnableFeedback] = useState(false)
    const [interviewEndedReason, setInterviewEndedReason] = useState<'chat' | 'microphone' | null>(null)
    const conversationRef = useRef<ConversationMessage[]>([])
    const recorder = useRef<any>(null)
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const streamingTranscriber = useRef<any>(null)
    const turnTextRef = useRef<Record<number, string>>({})
    const processedTurns = useRef<Set<number>>(new Set())
    const isInitialConversation = useRef(true)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { userDetail, setUserDetail } = useUserDetails()
    const interviewEndedRef = useRef(false)
    let RecordRTC: any = null

    const {
        conversation,
        liveTranscript,
        setLiveTranscript: updateLiveTranscript,
        clearLiveTranscript,
        addUserMessage,
        addAssistantMessage,
        isAiSpeaking,
        setAiSpeaking,
    } = useConversation()

    const isChatEndIntent = useCallback((rawMessage: string) => {
        const normalized = rawMessage.trim().toLowerCase()
        if (!normalized) {
            return false
        }

        const endPhrases = [
            'end interview',
            'finish interview',
            'end chat',
            'end conversation',
            'stop interview',
            'quit interview',
            'end this interview',
            'wrap up the interview',
        ]

        return endPhrases.some((phrase) => normalized === phrase || normalized.includes(phrase))
    }, [])

    const endInterview = useCallback(
        async (reason: 'chat' | 'microphone') => {
            if (interviewEndedRef.current) {
                console.log(`Interview already ended, ignoring ${reason} termination request`)
                return
            }

            interviewEndedRef.current = true
            setInterviewEndedReason(reason)

            if (audioRef.current) {
                try {
                    audioRef.current.pause()
                } catch (audioPauseError) {
                    console.error('Error while pausing audio playback', audioPauseError)
                }
                if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src)
                }
            }

            if (streamingTranscriber.current) {
                try {
                    await streamingTranscriber.current.close()
                } catch (streamingCloseError) {
                    console.error('Error closing streaming transcriber', streamingCloseError)
                }
                streamingTranscriber.current = null
            }
            if (recorder.current) {
                try {
                    recorder.current.stopRecording()
                } catch (stopRecordingError) {
                    console.error('Error stopping recorder', stopRecordingError)
                }
                recorder.current = null
            }

            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current)
                silenceTimeoutRef.current = null
            }

            turnTextRef.current = {}
            processedTurns.current.clear()
            clearLiveTranscript()
            setEnableMic(false)
            setAiSpeaking(false)
            isInitialConversation.current = true

            const resolvedRoomId = typeof roomId === 'string' ? roomId : undefined
            if (!resolvedRoomId) {
                console.warn('Unable to persist conversation: missing roomId')
                return
            }

            try {
                const response = await axios.patch('/api/discussion-room', {
                    roomId: resolvedRoomId,
                    conversation: conversationRef.current,
                })
                console.log(`Discussion room updated after ${reason} termination`, response.data)
            } catch (error) {
                console.error('Failed to update discussion room', error)
            }
            finally {
                setEnableFeedback(true)
            }
        },
        [roomId, clearLiveTranscript, setAiSpeaking],
    )

    useEffect(() => {
        conversationRef.current = conversation
    }, [conversation])

    useEffect(() => {
        const fetchAiData = async () => {
            if (!discussionRoomData?.topic || !discussionRoomData?.coachingOption) {
                console.warn('Discussion room details missing; skipping AI call')
                return
            }

            const lastFourMessages = conversation.slice(-4)
            const startTime = performance.now()

            try {
                setAiSpeaking(true)

                const aiResponse = await axios.post('/api/ai-chat', {
                    topic: discussionRoomData.topic,
                    coachingOption: discussionRoomData.coachingOption,
                    lastFourMessage: lastFourMessages,
                })
                const endTime = performance.now()

                console.log(`AI Response received in ${(endTime - startTime).toFixed(0)}ms:`, aiResponse.data)

                
                if (aiResponse.data && aiResponse.data.content) {
                    addAssistantMessage(aiResponse.data.content)
                    await updateUserToken(aiResponse.data.content) // update ai generate token

                    try {
                        const audioUrl = await textToSpeechServices(
                            aiResponse.data.content,
                            discussionRoomData.expertName as VoiceId,
                        )

                        if (audioRef.current) {
                            audioRef.current.pause()
                            if (audioRef.current.src) {
                                URL.revokeObjectURL(audioRef.current.src)
                            }
                        }

                        audioRef.current = new Audio(audioUrl)

                        audioRef.current.onended = () => {
                            console.log('Audio playback finished')
                            setAiSpeaking(false)
                            URL.revokeObjectURL(audioUrl)
                        }

                        audioRef.current.onerror = (error) => {
                            console.error('Audio playback error:', error)
                            setAiSpeaking(false)
                            URL.revokeObjectURL(audioUrl)
                        }

                        await audioRef.current.play()
                        console.log('Audio playback started')
                    } catch (audioError) {
                        console.error('Error generating or playing audio:', audioError)
                        setAiSpeaking(false)
                    }
                }
            } catch (error) {
                console.error('Error calling AI chat API:', error)
                setAiSpeaking(false)
            }
        }

        if (!conversation.length) {
            return
        }

        if (interviewEndedRef.current) {
            return
        }

        if (isInitialConversation.current) {
            isInitialConversation.current = false
            return
        }

        const lastMessage = conversation[conversation.length - 1]
        if (lastMessage.role === 'user') {
            fetchAiData()
        }
    }, [conversation, discussionRoomData?.topic, discussionRoomData?.coachingOption, discussionRoomData?.expertName, addAssistantMessage, setAiSpeaking])

    useEffect(() => {
        const getDiscussionRoomData = async () => {
            const resolvedRoomId = typeof roomId === 'string' ? roomId : undefined
            if (!resolvedRoomId) {
                console.warn('No roomId provided; skipping discussion room fetch')
                return
            }
            try {
                const response = await axios.get<DiscussionRoomRow>(`/api/discussion-room?roomId=${resolvedRoomId}`)

                if (response.data) {
                    const Expert = CoachingExpert.find((item) => item.name === response.data.expertName)
                    console.log('Expert Details: ', Expert)
                    setExpert(Expert || null)
                    setDiscussionRoomData(response.data)
                    console.log('Discussion Room Data ', response.data)
                }
            } catch (error) {
                console.log('Error fetching discussion room', error)
            }
        }

        getDiscussionRoomData()
    }, [roomId])

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src)
                }
            }
        }
    }, [])

    const connectMicrophone = async () => {
        if (interviewEndedRef.current) {
            console.warn('Interview already ended; skipping microphone connection')
            return
        }
        setEnableMic(true)
        setLoading(true)
        const token = await getToken()
        if (!token) {
            console.error('Failed to fetch AssemblyAI token')
            setEnableMic(false)
            setLoading(false)
            return
        }

        streamingTranscriber.current = new StreamingTranscriber({
            token,
            sampleRate: 16_000,
            formatTurns: true,
        })

        streamingTranscriber.current.on('open', ({ id }: { id: string }) => {
            console.log(`Session opened with ID: ${id}`)
        })

        streamingTranscriber.current.on('error', (error: any) => {
            console.error('Error:', error)
        })

        streamingTranscriber.current.on('close', (code: any, reason: any) =>
            console.log('Session closed:', code, reason),
        )

        streamingTranscriber.current.on('turn', async (turn: any) => {
            if (!turn.transcript) {
                return
            }
            console.log('Turn:', turn.transcript)

            if (interviewEndedRef.current) {
                return
            }

            if (turn.end_of_turn && turn.turn_is_formatted && !processedTurns.current.has(turn.turn_order)) {
                processedTurns.current.add(turn.turn_order)

                addUserMessage(turn.transcript)
                conversationRef.current = [...conversationRef.current, { role: 'user', content: turn.transcript }]
                clearLiveTranscript()
                await updateUserToken(turn.transcript)    // update user generated token
            }

            turnTextRef.current[turn.turn_order] = turn.transcript
            const transcriptText = Object.keys(turnTextRef.current)
                .map(Number)
                .sort((a, b) => a - b)
                .map((key) => turnTextRef.current[key])
                .join(' ')

            updateLiveTranscript(transcriptText.trim())
        })

        console.log('Connecting to streaming transcript service')
        try {
            await streamingTranscriber.current.connect()
        } catch (connectionError) {
            console.error('Streaming connection failed', connectionError)
            setEnableMic(false)
            setLoading(false)
            return
        } finally {
            setLoading(false)
        }

        console.log('Starting recording')

        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            if (!RecordRTC) {
                const mod = await import('recordrtc')
                RecordRTC = mod.default || mod
            }
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    recorder.current = new RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm;codecs=pcm',
                        recorderType: RecordRTC.StereoAudioRecorder,
                        timeSlice: 250,
                        desiredSampRate: 16000,
                        numberOfAudioChannels: 1,
                        bufferSize: 4096,
                        audioBitsPerSecond: 128000,
                        ondataavailable: async (blob: any) => {
                            if (!streamingTranscriber.current) return

                            if (silenceTimeoutRef.current) {
                                clearTimeout(silenceTimeoutRef.current)
                            }
                            const buffer = await blob.arrayBuffer()
                            console.log(buffer)

                            streamingTranscriber.current.sendAudio(buffer)

                            silenceTimeoutRef.current = setTimeout(() => {
                                console.log('User stopped talking')
                            }, 2000)
                        },
                    })
                    recorder.current.startRecording()
                })
                .catch((err) => console.error(err))
        }
    }

    const disconnectMicrophone = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('Closing streaming transcript connection')
        setLoading(true)
        try {
            await endInterview('microphone')
        } finally {
            setLoading(false)
        }
    }

    const handleSendMessage = (message: string) => {
        if (interviewEndedRef.current) {
            console.warn('Interview already ended; ignoring outgoing chat message')
            return
        }

        const trimmedMessage = message.trim()
        if (!trimmedMessage) {
            return
        }

        console.log('Sending text message:', trimmedMessage)

    addUserMessage(trimmedMessage)
    conversationRef.current = [...conversationRef.current, { role: 'user', content: trimmedMessage }]
    clearLiveTranscript()
    void updateUserToken(trimmedMessage)

        if (isChatEndIntent(trimmedMessage)) {
            void endInterview('chat')
        }
    }

    const handleMessageChange = (message: string) => {
        if (interviewEndedRef.current) {
            return
        }
        updateLiveTranscript(message)
    }

    const generateFeedback = async () => {
        if (!discussionRoomData) {
            console.warn('No discussion room data available; cannot generate feedback')
            toast.error('Cannot generate feedback: missing discussion room data')
            return
        }

        toast.success('Navigating to feedback page...')
        router.push(`/discussion-room//feedback/${roomId}`);
    }

    const updateUserToken = async (text: string) => {
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
            console.log('User credits updated', nextCredits)
        } catch (error) {
            console.error('Failed to update user credits', error)
        }
    }

    return (
        <div className='p-20'>
            <h2 className='text-lg font-bold'>{discussionRoomData?.coachingOption}</h2>

            {interviewEndedReason && (
                <div className='mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200'>
                    Interview ended {interviewEndedReason === 'chat' ? 'through chat' : 'after microphone disconnect'}. You can review the transcript below.
                </div>
            )}

            <div className='mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3'>
                <div className='lg:col-span-2'>
                    <div className='relative flex h-[60vh] flex-col items-center justify-center rounded-xl border border-neutral-700/50 bg-secondary p-5'>
                        <span
                            className={`flex h-15 w-15 items-center justify-center rounded-full border-2 text-xl font-bold transition-all ${
                                isAiSpeaking ? 'border-green-500 animate-pulse bg-neutral-800 text-neutral-200' : 'border-blue-500 bg-neutral-800 text-neutral-300'
                            }`}
                        >
                            {expert?.avatar}
                        </span>
                        <h2 className='mt-2 text-lg'>{expert?.name}</h2>
                        {isAiSpeaking && <p className='mt-2 text-sm text-green-500 animate-pulse'>Speaking...</p>}
                        <div className='absolute bottom-10 right-10 rounded-lg bg-neutral-600 px-10 py-5'>
                            <UserAvatar />
                        </div>
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                        {!enableMic ? (
                            <Button onClick={connectMicrophone} disabled={loading || !!interviewEndedReason}>
                                {loading ? <Loader2Icon className='animate-spin' /> : null} Connect
                            </Button>
                        ) : (
                            <Button variant='destructive' onClick={disconnectMicrophone} disabled={loading}>
                                {loading ? <Loader2Icon className='animate-spin' /> : null} Disconnect
                            </Button>
                        )}
                    </div>
                </div>
                <div className='text-center lg:col-span-1'>
                    <ConversationBox
                        onSendMessage={handleSendMessage}
                        onMessageChange={handleMessageChange}
                        disabled={!!interviewEndedReason}
                    />

                    {!enableFeedback ? <p className='mt-4 text-sm text-gray-400'>
                        At the end of your conversation we will generate feedback and key takeaways based on the interview call.
                    </p> : <Button className='mt-4 w-full' onClick={generateFeedback}>Generate Feedback</Button>}
                </div>``
            </div>
            <div className='mt-10 rounded-xl border border-neutral-700/60 bg-neutral-900/60 p-6'>
                <h3 className='text-left text-lg font-bold text-neutral-200'>Live Transcript</h3>
                <p className='mt-2 whitespace-pre-wrap text-left text-neutral-300'>
                    {liveTranscript || 'Start speaking or typing to generate transcript...'}
                </p>
            </div>
        </div>
    )
}

const DiscussionRoom = () => {
    return (
        <ConversationProvider>
            <DiscussionRoomInner />
        </ConversationProvider>
    )
}

export default DiscussionRoom