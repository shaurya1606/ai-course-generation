import { NextResponse } from 'next/server';
import { aiModelFeedbackServices } from '@/services/aiModelServices';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { discussionRoomTable } from '@/config/schema';

export async function POST(request: Request) {
    const { coachingOption, conversation } = await request.json();
    console.log('Received feedback request:', { coachingOption, conversation });
    if (!coachingOption || !Array.isArray(conversation) || conversation.length === 0) {
        return NextResponse.json({ error: 'coachingOption and conversation are required' }, { status: 400 });
    }
    try {
        const aiResponse = await aiModelFeedbackServices(coachingOption, conversation);
        console.log('AI feedback response:', aiResponse);
        return NextResponse.json({ aiResponse }, { status: 200 });
    } catch (error) {
        console.error('Error generating AI feedback:', error);
        return NextResponse.json({ error: 'Failed to generate AI feedback' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { roomId, feedback } = await request.json();

        if (!roomId) {
            return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
        }

        if (!feedback) {
            return NextResponse.json(
                { error: 'At least one field (feedback) must be provided for update' },
                { status: 400 },
            );
        }

        const updatedRows = await db
            .update(discussionRoomTable)
            .set(feedback ? { feedback, feedbackGeneratedAt: new Date() } : {})
            .where(eq(discussionRoomTable.roomId, roomId))
            .returning();

        if (updatedRows.length === 0) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }

            console.log('feedback updated:', updatedRows[0]);
        return NextResponse.json(updatedRows[0]);
    } catch (error) {
        console.error('error updating feedback', error);
        return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }
}