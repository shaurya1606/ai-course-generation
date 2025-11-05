import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { discussionRoomTable } from '@/config/schema';
import { desc, eq } from 'drizzle-orm';

export async function POST(request: Request) {
    const { roomId, coachingOption, topic, expertName, userEmail } = await request.json();

    if (!roomId || !coachingOption || !topic || !expertName || !userEmail) {
        return NextResponse.json({ error: 'roomId, coachingOption, topic, expertName, and userEmail are required' }, { status: 400 });
    }

    try {
        const response = await db.insert(discussionRoomTable).values({
            roomId,
            coachingOption,
            topic,
            expertName,
            userEmail,
            createdAt: new Date(),
        }).returning();
        console.log('disscusion room', response)
        return NextResponse.json({ roomId: roomId });

    } catch (error) {
        console.log('error in disscusion room', error)
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    const userEmail = searchParams.get('userEmail');

    if (!roomId && !userEmail) {
        return NextResponse.json({ error: 'roomId or userEmail is required' }, { status: 400 });
    }

    if (roomId) {
        const response = await db
            .select()
            .from(discussionRoomTable)
            .where(eq(discussionRoomTable.roomId, roomId))
            .limit(1);
        console.log('discussion room fetched:', response[0]);
        return NextResponse.json(response[0] ?? null);
    }

    const response = await db
        .select()
        .from(discussionRoomTable)
        .where(eq(discussionRoomTable.userEmail, userEmail!))
        .orderBy(desc(discussionRoomTable.createdAt));
    console.log('discussion rooms fetched by userEmail:', response);
    return NextResponse.json(response);

}

export async function PATCH(request: Request) {
    try {
        const { roomId, conversation } = await request.json();

        if (!roomId) {
            return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
        }

        const updateData: Record<string, unknown> = {};

        if (typeof conversation !== 'undefined') {
            updateData.conversation = conversation;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: 'At least one field (conversation) must be provided for update' },
                { status: 400 },
            );
        }

        const updatedRows = await db
            .update(discussionRoomTable)
            .set(updateData)
            .where(eq(discussionRoomTable.roomId, roomId))
            .returning();

        if (updatedRows.length === 0) {
            return NextResponse.json({ error: 'Discussion room not found' }, { status: 404 });
        }

        console.log('discussion room updated:', updatedRows[0]);
        return NextResponse.json(updatedRows[0]);
    } catch (error) {
        console.error('error updating discussion room', error);
        return NextResponse.json({ error: 'Failed to update discussion room' }, { status: 500 });
    }
}


