'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { CoachingExpert } from '@/constants/constant'
import { UserAvatar } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { StreamingTranscriber } from 'assemblyai'
import { getToken } from '@/services/voiceToTextService'
import { Loader2Icon } from 'lucide-react'
import type { ConversationMessage, DiscussionRoomRow } from '@/types/types'
import ConversationBox from '@/components/ai-interview/ConversationBox'
import textToSpeechServices from '@/services/textToSpeechServices'
import { VoiceId } from '@aws-sdk/client-polly'
import { ConversationProvider, useConversation } from '@/context/ConversationContext'

type CoachingExpertType = {
    name: string
    avatar: string
}

const DiscussionRoomInner = () => {
    const { roomId } = useParams()
    const [expert, setExpert] = useState<CoachingExpertType | null>(null)
    const [discussionRoomData, setDiscussionRoomData] = useState<DiscussionRoomRow | null>(null)
    const [enableMic, setEnableMic] = useState(false)
    const [loading, setLoading] = useState(false)
    const conversationRef = useRef<ConversationMessage[]>([])
    const recorder = useRef<any>(null)
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const streamingTranscriber = useRef<any>(null)
    const turnTextRef = useRef<Record<number, string>>({})
    const processedTurns = useRef<Set<number>>(new Set())
    const isInitialConversation = useRef(true)
    const audioRef = useRef<HTMLAudioElement | null>(null)
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
            try {
                const response = await axios.get<DiscussionRoomRow>('/api/discussion-room?roomId=' + roomId)

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

            if (turn.end_of_turn && turn.turn_is_formatted && !processedTurns.current.has(turn.turn_order)) {
                processedTurns.current.add(turn.turn_order)

                addUserMessage(turn.transcript)
                conversationRef.current = [...conversationRef.current, { role: 'user', content: turn.transcript }]
                clearLiveTranscript()
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
        setLoading(true)
        e.preventDefault()
        console.log('Closing streaming transcript connection')

        if (audioRef.current) {
            audioRef.current.pause()
            if (audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src)
            }
            audioRef.current = null
        }

        if (streamingTranscriber.current) {
            await streamingTranscriber.current.close()
            streamingTranscriber.current = null
        }
        if (recorder.current) {
            recorder.current.stopRecording()
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
        setLoading(false)
    }

    const handleSendMessage = (message: string) => {
        console.log('Sending text message:', message)

        addUserMessage(message)
        conversationRef.current = [...conversationRef.current, { role: 'user', content: message }]
        clearLiveTranscript()
    }

    const handleMessageChange = (message: string) => {
        updateLiveTranscript(message)
    }

    return (
        <div className='p-20'>
            <h2 className='text-lg font-bold'>{discussionRoomData?.coachingOption}</h2>

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
                            <Button onClick={connectMicrophone} disabled={loading}>
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
                    <ConversationBox onSendMessage={handleSendMessage} onMessageChange={handleMessageChange} />
                    <p className='mt-4 text-sm text-gray-400'>
                        At the end of your conversation we will generate feedback and key takeaways based on the interview call.
                    </p>
                </div>
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