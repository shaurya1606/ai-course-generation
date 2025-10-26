import { AssemblyAI } from "assemblyai"
import { NextResponse } from "next/server";

const assemblyai = new AssemblyAI({apiKey: process.env.ASSEMBLYAI_API_KEY || ''});

export async function GET(request: Request) {

    const token = await assemblyai.streaming.createTemporaryToken({ expires_in_seconds: 60 });


    return NextResponse.json({token});
}