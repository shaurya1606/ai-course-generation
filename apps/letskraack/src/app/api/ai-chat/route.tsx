import { NextResponse } from 'next/server';
import { aiModelServices } from '@/services/aiModelServices';
import type { AiChatRequest, AiChatResponse, ConversationMessage } from '@/types/types';

export async function POST(request: Request) {
    const startTime = Date.now();
    try {
        const body: AiChatRequest = await request.json();
        const { topic, coachingOption, lastFourMessage } = body;

        // Validate required fields
        const isValidMessagesArray = Array.isArray(lastFourMessage) && lastFourMessage.length > 0;
        if (!topic || !coachingOption || !isValidMessagesArray) {
            return NextResponse.json(
                { error: 'Missing required fields: topic, coachingOption, and lastFourMessage are required' },
                { status: 400 }
            );
        }

        const conversationPreview = lastFourMessage
            .map((message: ConversationMessage) => `${message.role}: ${message.content}`)
            .join(' | ');
        console.log(`[AI-Chat] Request received: ${coachingOption} - "${conversationPreview.substring(0, 80)}..."`);

        // Call the AI service
        const aiResponse = await aiModelServices(topic, coachingOption, lastFourMessage);

        // Extract the response data
        const responseData: AiChatResponse = {
            role: aiResponse?.message?.role || 'assistant',
            content: aiResponse?.message?.content || '',
            finishReason: aiResponse?.finish_reason,
        };

        const duration = Date.now() - startTime;
        console.log(`[AI-Chat] Response sent in ${duration}ms`);

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[AI-Chat] Error after ${duration}ms:`, error);
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        const errorStack = error instanceof Error ? error.stack : '';
        
        console.error('[AI-Chat] Error details:', { errorMessage, errorStack });
        
        return NextResponse.json(
            { error: 'Failed to process AI request', details: errorMessage },
            { status: 500 }
        );
    }
}
