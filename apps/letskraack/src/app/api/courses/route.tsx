import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { coursesTable, usersTable } from '@/config/schema';
import { eq, desc } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams?.get('courseId');
    const user = await currentUser();

    const userEmail = user?.primaryEmailAddress?.emailAddress;


    if (courseId) {
        const response = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId))
            .limit(1);

        if (!response || response.length === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        console.log('Course fetched:', response[0]);
        return NextResponse.json(response[0]); // Return single object, not array
    }

    else {
        // Ensure userEmail is defined before calling eq; return empty list if unauthenticated
        if (!userEmail) {
            return NextResponse.json([], { status: 200 });
        }

        const response = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.userEmail, userEmail))
        .orderBy(desc(coursesTable.id));

        // console.log('Courses fetched:', response);

        return NextResponse.json(response);
    }
}