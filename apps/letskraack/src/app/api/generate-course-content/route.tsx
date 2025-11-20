import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import { PromptCourseContentGeneration } from "@/constants/constant";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// Helper function to safely parse JSON with multiple fallback methods
function safeJsonParse(jsonString: string): any {
    // Method 1: Direct parse
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.warn('Direct JSON parse failed, trying cleanup methods...');
    }

    // Method 2: Clean common escape issues
    try {
        // Fix common escape issues
        let cleaned = jsonString
            .replace(/\\n/g, '\\n')  // Normalize newlines
            .replace(/\\'/g, "'")    // Fix single quotes
            .replace(/\\"/g, '"')    // Fix double quotes
            .replace(/\\&/g, '&')    // Fix ampersands
            .replace(/\\\\/g, '\\')  // Fix double backslashes
            .replace(/\n/g, '\\n')   // Escape actual newlines
            .replace(/\r/g, '\\r')   // Escape carriage returns
            .replace(/\t/g, '\\t');  // Escape tabs

        return JSON.parse(cleaned);
    } catch (error) {
        console.warn('Cleanup method 1 failed, trying regex extraction...');
    }

    // Method 3: Extract JSON from markdown code blocks or text
    try {
        // Look for JSON-like content between curly braces
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const extractedJson = jsonMatch[0];
            // Try to fix common issues in the extracted content
            const fixedJson = extractedJson
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')  // Fix unquoted keys
                .replace(/:\s*'([^']*)'/g, ':"$1"')  // Fix single quoted values
                .replace(/,\s*}/g, '}')  // Remove trailing commas
                .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays

            return JSON.parse(fixedJson);
        }
    } catch (error) {
        console.warn('Regex extraction failed, trying final fallback...');
    }

    // Method 4: Last resort - try to parse with eval (dangerous but sometimes necessary)
    try {
        // Only use this as absolute last resort and log it
        console.error('⚠️ Using eval as last resort for JSON parsing - this should be monitored');
        // eslint-disable-next-line no-eval
        const result = eval(`(${jsonString})`);
        console.log('Eval parsing succeeded');
        return result;
    } catch (error) {
        console.error('All JSON parsing methods failed');
        throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

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

        if (!candidateText || candidateText.trim() === '') {
            throw new Error('AI returned empty response');
        }

        console.log('Raw AI Response:', candidateText);

        const candidateRawJson = candidateText.replace('```json', '').replace('```', '');
        console.log('Cleaned JSON string:', candidateRawJson);

        let candidateJson;
        try {
            candidateJson = safeJsonParse(candidateRawJson);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            console.error('Raw response that failed:', candidateText);
            throw new Error(`AI response parsing failed: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`);
        }

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


