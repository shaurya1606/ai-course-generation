import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { enrollCoursesTable, coursesTable } from "@/config/schema";
import { and, eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const { courseId } = await request.json();
    const user = await currentUser();
    console.log('Enrolling user:', user?.primaryEmailAddress?.emailAddress, 'to course:', courseId);

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    // Check if already enrolled
    const enrollCourses = await db.select()
        .from(enrollCoursesTable)
        .where(and(
            eq(enrollCoursesTable.userEmail, userEmail),
            eq(enrollCoursesTable.cid, courseId)
        ));

    if (enrollCourses?.length > 0) {
        console.log('⚠️ Already enrolled:', userEmail, 'in course:', courseId);
        return NextResponse.json({ message: 'Already enrolled', enrollment: enrollCourses[0] });
    }

    // Verify course exists
    const course = await db.select()
        .from(coursesTable)
        .where(eq(coursesTable.cid, courseId))
        .limit(1);

    if (!course || course.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Enroll user
    try {
        const response = await db.insert(enrollCoursesTable).values({
            cid: courseId,
            userEmail: userEmail,
        }).returning();

        console.log('✅ Successfully enrolled:', response[0]);
        return NextResponse.json({ message: 'Enrolled successfully', enrollment: response[0] });
    } catch (error) {
        console.error('❌ Enrollment failed:', error);
        return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 });
    }
}

export async function GET(request: Request) {

    const user = await currentUser();

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (courseId) {
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;

        const response = await db.select()
            .from(coursesTable)
            .innerJoin(enrollCoursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
            .where(and(eq(enrollCoursesTable.userEmail, userEmail), eq(coursesTable.cid, courseId)))
            .limit(1);

        return NextResponse.json(response[0]);
    }
    else {
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;

        const response = await db.select()
            .from(coursesTable)
            .innerJoin(enrollCoursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
            .where(eq(enrollCoursesTable.userEmail, userEmail))
            .orderBy(desc(enrollCoursesTable.id));

        return NextResponse.json(response);
    }

}

export async function PUT(request: Request) {
    const { courseId, completedChapters } = await request.json();
    const user = await currentUser();

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await db.update(enrollCoursesTable)
        .set({ completedChapters: completedChapters })
        .where(and(
            eq(enrollCoursesTable.userEmail, user.primaryEmailAddress.emailAddress),
            eq(enrollCoursesTable.cid, courseId)
        ))
        .returning();

        return NextResponse.json({ message: 'Updated successfully', enrollment: response });
}