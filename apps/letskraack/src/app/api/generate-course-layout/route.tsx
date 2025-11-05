import {
    GoogleGenAI,
} from '@google/genai';
import { PromptCourseGeneration } from '../../../constants/constant';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';


export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    const { courseId, ...formData } = await request.json();
    const user = await currentUser();

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
                    text: PromptCourseGeneration + JSON.stringify(formData),
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

    console.log('AI Response:', candidateJson);


        // const imagePrompt = candidateJson?.course?.bannerImagePrompt;

        // generate image (streaming) and save to public/uploads/banners
        // try {
        //     const bannerUrl = await generateBannerImage(imagePrompt, courseId);
        //     if (bannerUrl) {
        //         // store banner URL inside the course JSON so it persists without schema changes
        //         candidateJson.course = candidateJson.course ?? {};
        //         candidateJson.course.bannerImageUrl = bannerUrl;
        //     }
        // } catch (err) {
        //     console.error('Banner generation failed', err);
        // }

        // save to db
        await saveCourseToDatabase(formData, candidateJson, courseId, user);

    return NextResponse.json({ courseId: courseId });
};



// const generateBannerImage = async (imagePrompt: string | undefined, courseId: string) => {
//     if (!imagePrompt) return null;
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//         console.error('GEMINI_API_KEY not set; skipping image generation');
//         return null;
//     }

//     // ensure output folder
//     const outDir = path.join(process.cwd(), 'public', 'uploads', 'banners');
//     await mkdir(outDir, { recursive: true });

//     // Use GoogleGenAI streaming image generation
//     const ai = new GoogleGenAI({ apiKey });
//     const model = 'gemini-2.5-flash-image';
//     const contents = [
//         { role: 'user', parts: [{ text: imagePrompt }] },
//     ];

//     const stream = await ai.models.generateContentStream({ model, config: { responseModalities: ['IMAGE', 'TEXT'] }, contents });
//     let fileIndex = 0;
//     let lastSavedFile: string | null = null;

//     for await (const chunk of stream) {
//         const inline = chunk?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
//         if (!inline) continue;

//         const ext = mime.getExtension(inline.mimeType || '') || 'png';
//         const fileName = `${courseId}-${Date.now()}-${fileIndex++}.${ext}`;
//         const filePath = path.join(outDir, fileName);
//         const buffer = Buffer.from(inline.data || '', 'base64');
//         await writeFile(filePath, buffer);
//         lastSavedFile = `/uploads/banners/${fileName}`; // public path
//         console.log('Saved banner to', filePath);
//     }

//     return lastSavedFile;
// };

const saveCourseToDatabase = async (formData: any, candidateJson: any, courseId: string, user: any) => {
     const course = candidateJson?.course ?? {};

    // Map AI fields (with fallbacks to any provided formData)
    const title = course.name ?? formData.title;
    const description = course.description ?? formData.description ?? '';
    const duration = course.duration ?? formData.duration ?? '';
    const noOfChapters = Number(course.noOfChapters ?? formData.noOfChapters ?? 1);
    const includeVideo = Boolean(course.includeVideo ?? formData.includeVideo ?? false);
    const difficultyLevel = course.level ?? formData.difficultyLevel ?? 'easy';
    const category = course.category ?? formData.category ?? null;

    // Validate required fields that the DB expects (title, description, duration, noOfChapters)
    if (!title) {
        return NextResponse.json({ error: 'Missing title in generated course' }, { status: 400 });
    }

    const payload = {
        cid: courseId,
        title,
        description,
        duration,
        noOfChapters,
        includeVideo,
        difficultyLevel,
        category,
        courseJson: candidateJson,
        userEmail: user?.primaryEmailAddress?.emailAddress,
    };

        try {
            // Use the prepared payload and cast to any to satisfy Drizzle's strict insert typing
            const result = await db.insert(coursesTable).values(payload as any).returning();
            console.log('Insert result:', result);
            return (result && result.length > 0) ? result[0] : null;
        } catch (err) {
            console.error('DB insert failed', err);
            throw err;
        }
};
