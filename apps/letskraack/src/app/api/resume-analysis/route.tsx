import { db } from "@/config/db";
import { resumeAnalysesTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function POST(request: Request) {
    const body = await request.json();
    const { resumeId, userEmail, companyName, jobTitle, jobDescription, feedback, uploadedAt, feedbackGeneratedAt } = body;

    if (!resumeId || !userEmail || !companyName || !jobTitle || !jobDescription || !feedback || !uploadedAt || !feedbackGeneratedAt) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const uploadedAtDate = new Date(uploadedAt)
    const feedbackGeneratedAtDate = new Date(feedbackGeneratedAt)

    if (Number.isNaN(uploadedAtDate.getTime()) || Number.isNaN(feedbackGeneratedAtDate.getTime())) {
        return NextResponse.json({ error: 'Invalid date value provided' }, { status: 400 })
    }

    try {
        const response = await db.insert(resumeAnalysesTable).values({
            resumeId,
            userEmail,
            companyName,
            jobTitle,
            jobDescription,
            feedback,
            uploadedAt: uploadedAtDate,
            feedbackGeneratedAt: feedbackGeneratedAtDate,
        });

        console.log('Resume analysis inserted with ID:', response);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error inserting resume analysis:', error);
        return NextResponse.json({ error: 'Failed to save resume analysis' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get('resumeId');
    if (!resumeId) {
        return NextResponse.json({ error: 'Missing resumeId parameter' }, { status: 400 });
    }

    try {
        const response = await db
        .select()
        .from(resumeAnalysesTable)
        .where(eq(resumeAnalysesTable.resumeId, resumeId))
        .limit(1);

        return NextResponse.json(response[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching resume analysis:', error);
        return NextResponse.json({ error: 'Failed to fetch resume analysis' }, { status: 500 });
    }
}