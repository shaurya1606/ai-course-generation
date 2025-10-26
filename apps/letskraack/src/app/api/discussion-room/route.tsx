import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { discussionRoomTable } from '@/config/schema';
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
    const { roomId, coachingOption, topic, expertName } = await request.json();

    if (!roomId || !coachingOption || !topic || !expertName) {
        return NextResponse.json({ error: 'roomId, coachingOption, topic, and expertName are required' }, { status: 400 });
    }

    try {
        const response = await db.insert(discussionRoomTable).values({
            roomId: roomId,
            coachingOption: coachingOption,
            topic: topic,
            expertName: expertName
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

    if (!roomId) {
        return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
    }
    const response = await db.select()
        .from(discussionRoomTable)
        .where(eq(discussionRoomTable.roomId, roomId))
        .limit(1);
        console.log('discussion room fetched:', response[0]);
    return NextResponse.json(response[0]);
}