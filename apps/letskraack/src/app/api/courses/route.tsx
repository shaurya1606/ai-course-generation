import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { coursesTable, usersTable } from '@/config/schema';
import { eq, desc } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';
import { CourseService } from '@/services/courseService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams?.get('courseId');
    const explore = searchParams?.get('explore');
    const search = searchParams?.get('search');
    const user = await currentUser();

    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (courseId) {
        const course = await CourseService.getCourseById(courseId);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        return NextResponse.json(course);
    }

    if (explore === 'true') {
        const courses = await CourseService.getAllCourses(search || undefined);
        return NextResponse.json(courses);
    }

    // Default: Get user's own courses
    if (!userEmail) {
        return NextResponse.json([], { status: 200 });
    }

    const courses = await CourseService.getCoursesByUser(userEmail);
    return NextResponse.json(courses);
}