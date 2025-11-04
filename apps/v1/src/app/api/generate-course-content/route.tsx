import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import { PromptCourseContentGeneration } from "@/constants/constant";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const { courseJson, courseId, courseName } = await request.json();

    // Validate required fields
    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }
    if (!courseJson?.chapters || !Array.isArray(courseJson.chapters)) {
        return NextResponse.json({ error: 'courseJson.chapters must be an array' }, { status: 400 });
    }

    console.log('🔍 Generating content for courseId:', courseId);

    const promises = courseJson.chapters.map(async (chapter: any) => {
        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
        };
        const model = 'gemini-flash-latest';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PromptCourseContentGeneration + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const candidateText =
            response?.candidates?.[0]?.content?.parts?.[0]?.text ?? response?.text ?? '';

        const candidateRawJson = candidateText.replace('```json', '').replace('```', '');
        const candidateJson = JSON.parse(candidateRawJson);
        console.log('AI Generated Chapter Content:', candidateJson);

        // get youtube video

        const youtubeData = await GetYoutubeVideo({ topic: chapter?.chapterName });

        console.log('Youtube Data:', youtubeData);
        console.log('Course Content:', candidateJson);

        return {
            youtubeVideo: youtubeData,
            courseData: candidateJson
        }
    });

    const CourseContent = await Promise.all(promises);

    console.log('✅ Final Course Content with Videos:', CourseContent);

    // Save to database
    try {
        console.log('💾 Saving course content to DB for courseId:', courseId);
        
        let existingCourse;
        
        // Check if courseId is a number (id) or UUID string (cid)
        
        
        
       
            // Lookup by UUID cid
            console.log('� Looking up course by cid:', courseId);
            existingCourse = await db
                .select()
                .from(coursesTable)
                .where(eq(coursesTable.cid, courseId))
                .limit(1);
        

        if (!existingCourse || existingCourse.length === 0) {
            console.error('❌ Course not found');
            const allCourses = await db.select().from(coursesTable).limit(10);
            console.log('📋 Sample courses in DB:', allCourses.map(c => ({ id: c.id, cid: c.cid, title: c.title })));
            
            return NextResponse.json({ 
                error: 'Course not found', 
                courseId,
                sampleCourses: allCourses.map(c => ({ id: c.id, cid: c.cid, title: c.title })),
            }, { status: 404 });
        }

        console.log('✓ Found course:', existingCourse[0].title, '(id:', existingCourse[0].id, ', cid:', existingCourse[0].cid, ')');

        // Update the course content using the primary key id for reliability
        const updateResult = await db
            .update(coursesTable)
            .set({
                courseContent: CourseContent,
            })
            .where(eq(coursesTable.cid, existingCourse[0].cid))
            .returning();

        console.log('✅ Course content saved successfully!', updateResult);

        return NextResponse.json({
            success: true,
            courseName: courseName,
            courseId: courseId,
            chapters: CourseContent,
            updatedCourse: updateResult[0],
        });
    } catch (error) {
        console.error('❌ Failed to save course content:', error);
        return NextResponse.json({ 
            error: 'Failed to save course content', 
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async ({ topic }: { topic: string }) => {
    const params = {
        part: 'snippet',
        q: topic,
        maxResult: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
    }
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResponse = response.data.items;
    const youtubeVideoList: any[] = [];
    youtubeVideoListResponse.forEach((item: any) => {
        const data = {
            videoId: item.id?.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
        };
        youtubeVideoList.push(data);
    });
    console.log('Youtube Videos:', youtubeVideoList);
    return youtubeVideoList;
}


