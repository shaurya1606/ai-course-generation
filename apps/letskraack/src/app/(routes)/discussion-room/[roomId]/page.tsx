'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { CoachingExpert } from '@/constants/constant'
import { UserAvatar } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { StreamingTranscriber } from 'assemblyai'
import { getToken } from '@/services/voiceToTextService'
import { Loader2Icon } from 'lucide-react'
import type { AiChatResponse, ConversationMessage, DiscussionRoomRow } from '@/types/types'
import ConversationBox from '@/components/ai-interview/ConversationBox'

type CoachingExpertType = {
    name: string;
    avatar: string;
}

const DiscussionRoom =  () => {
    const { roomId } = useParams();
    const [expert, setExpert] = useState<CoachingExpertType | null>(null)
    const [discussionRoomData, setDiscussionRoomData] = useState<DiscussionRoomRow | null>(null)
    const [enableMic, setEnableMic] = useState(false);
    const [liveTranscript, setLiveTranscript] = useState<string>("");
    const [conversation, setConversation] = useState<ConversationMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! I am here to help you with your interview practice. Feel free to start speaking whenever you are ready.'
        },
        {
            role: 'user',
            content: 'Ohh, hi! Glad to be here.'
        }
    ]);
    const conversationRef = useRef<ConversationMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! I am here to help you with your interview practice. Feel free to start speaking whenever you are ready.'
        },
        {
            role: 'user',
            content: 'Ohh, hi! Glad to be here.'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const recorder = useRef<any>(null)
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    let RecordRTC: any = null;
    const streamingTranscriber = useRef<any>(null);
    const turnTextRef = useRef<Record<number, string>>({})
    const processedTurns = useRef<Set<number>>(new Set()) // Track processed turns to prevent duplicates
    const isInitialConversation = useRef(true);

    useEffect(() => {
        conversationRef.current = conversation;
    }, [conversation]);

    useEffect(() => {
        const fetchAiData = async () => {
            if (!discussionRoomData?.topic || !discussionRoomData?.coachingOption) {
                console.warn('Discussion room details missing; skipping AI call');
                return;
            }

            const lastFourMessages = conversation.slice(-4);
            const startTime = performance.now();

            try {
                const aiResponse = await axios.post<AiChatResponse>('/api/ai-chat', {
                    topic: discussionRoomData.topic,
                    coachingOption: discussionRoomData.coachingOption,
                    lastFourMessage: lastFourMessages,
                });
                const endTime = performance.now();

                console.log(`AI Response received in ${(endTime - startTime).toFixed(0)}ms:`, aiResponse.data);

                if (aiResponse.data && aiResponse.data.content) {
                    const assistantMessage: ConversationMessage = {
                        role: aiResponse.data.role || 'assistant',
                        content: aiResponse.data.content,
                    };

                    setConversation(previousConversation => {
                        const newConversation = [...previousConversation, assistantMessage];
                        conversationRef.current = newConversation;
                        return newConversation;
                    });
                }
            } catch (error) {
                console.error('Error calling AI chat API:', error);
            }
        };

        if (!conversation.length) {
            return;
        }

        if (isInitialConversation.current) {
            isInitialConversation.current = false;
            return;
        }

        const lastMessage = conversation[conversation.length - 1];
        if (lastMessage.role === 'user') {
            fetchAiData();
        }
    }, [conversation, discussionRoomData?.topic, discussionRoomData?.coachingOption]);

    useEffect(() => {
        GetDiscussionRoomData();
    }, [])
    
    const GetDiscussionRoomData = async () => {
        try {
            const response = await axios.get<DiscussionRoomRow>('/api/discussion-room?roomId=' + roomId);
            
            if (response.data) {
                const Expert = CoachingExpert.find((expert) => expert.name === response.data.expertName);
                console.log("Expert Details: ", Expert);
                setExpert(Expert || null);
                setDiscussionRoomData(response.data);
                console.log("Disscussion Room Data ", response.data);
            }
        }
        catch (error) {
            console.log('Error fetching discussion room', error);
        }
    }
    
    
    const connectMicrophone = async () => {
            setEnableMic(true);
        setLoading(true);
        const token = await getToken();
        if (!token) {
            console.error("Failed to fetch AssemblyAI token");
            setEnableMic(false);
            setLoading(false);
            return;
        }

        streamingTranscriber.current = new StreamingTranscriber({
            token,
            sampleRate: 16_000,
            formatTurns: true,
        });

        streamingTranscriber.current.on("open", ({ id }: { id: string }) => {
            console.log(`Session opened with ID: ${id}`);
        });

        streamingTranscriber.current.on("error", (error: any) => {
            console.error("Error:", error);
        });

        streamingTranscriber.current.on("close", (code: any, reason: any) =>
            console.log("Session closed:", code, reason)
        );

        streamingTranscriber.current.on("turn", async (turn: any) => {
            if (!turn.transcript) {
                return;
            }
            console.log("Turn:", turn.transcript);

            // Only process completed, formatted turns and avoid duplicates
            if (turn.end_of_turn && turn.turn_is_formatted && !processedTurns.current.has(turn.turn_order)) {
                processedTurns.current.add(turn.turn_order);

                const userMessage: ConversationMessage = {
                    role: 'user',
                    content: turn.transcript,
                };

                const updatedConversation = [...conversationRef.current, userMessage];
                conversationRef.current = updatedConversation;
                setConversation(updatedConversation);

                // AI response will be handled via effect watching conversation updates
            }

            turnTextRef.current[turn.turn_order] = turn.transcript;
            const transcriptText = Object.keys(turnTextRef.current)
                .map(Number)
                .sort((a, b) => a - b)
                .map((key) => turnTextRef.current[key])
                .join(" ");

            setLiveTranscript(transcriptText.trim());
        });

        console.log("Connecting to streaming transcript service");
        try {
            await streamingTranscriber.current.connect();
        } catch (connectionError) {
            console.error("Streaming connection failed", connectionError);
            setEnableMic(false);
            return;
        }
        finally {
            setLoading(false);
        }

        console.log("Starting recording");


        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            if (!RecordRTC) {
                const mod = await import("recordrtc");
                RecordRTC = mod.default || mod;
            }
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
                        if (!streamingTranscriber.current) return;
                        // Reset the silence detection timer on audio input
                        if (silenceTimeoutRef.current) {
                            clearTimeout(silenceTimeoutRef.current);
                        }
                        const buffer = await blob.arrayBuffer();
                        console.log(buffer)

                        streamingTranscriber.current.sendAudio(buffer);

                        // Restart the silence detection timer
                        silenceTimeoutRef.current = setTimeout(() => {
                            console.log('User stopped talking');
                            // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                        }, 2000);
                    },
                });
                recorder.current.startRecording();
            })
                .catch((err) => console.error(err));
        }
    }

    const disconnectMicrophone = async (e: any) => {
        setLoading(true)
        e.preventDefault();
        console.log("Closing streaming transcript connection");
        if (streamingTranscriber.current) {
            await streamingTranscriber.current.close();
            streamingTranscriber.current = null;
        }
        if (recorder.current) {
            recorder.current.stopRecording();
            recorder.current = null;
        }
        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
        }
        turnTextRef.current = {};
        processedTurns.current.clear(); // Clear processed turns on disconnect
        setLiveTranscript("");
        setEnableMic(false);
        setLoading(false)
    }

    return (
        <div className='p-20'>
            <h2 className='text-lg font-bold'>{discussionRoomData?.coachingOption}</h2>

            <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
                <div className='lg:col-span-2'>
                    <div className='border border-neutral-700/50 rounded-xl p-5 bg-secondary flex flex-col items-center justify-center h-[60vh] relative'>
                        <span
                            className={`rounded-full bg-neutral-800 text-neutral-300 w-15 h-15 flex items-center justify-center hover:scale-105 transition-all text-xl font-bold cursor-pointer border-2 border-blue-500 animate-pulse`}
                        >
                            {expert?.avatar}
                        </span>
                        <h2 className='mt-2 text-lg'>{expert?.name}</h2>
                        <div className='p-5 bg-neutral-600 px-10 rounded-lg absolute bottom-10 right-10'>
                            <UserAvatar />
                        </div>
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                        {!enableMic ? <Button 
                        onClick={connectMicrophone} 
                        disabled={loading}>{loading ? <Loader2Icon className='animate-spin' /> : null} Connect </Button>
                            : <Button variant='destructive' onClick={disconnectMicrophone} disabled={loading} >{loading ? (<Loader2Icon className='animate-spin' />) : null} Disconnect</Button>}
                    </div>
                </div>
                <div className='lg:col-span-1 text-center'>
                    <ConversationBox conversation={conversation} />
                    <p className='mt-4 text-sm text-gray-400'>At the end of your conversation we will generate a feedback/key takeaways for you on the basis of your interview call.</p>
                    </div>
            </div>
        </div>
    )
}

export default DiscussionRoom