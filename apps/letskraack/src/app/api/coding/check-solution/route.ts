import { NextResponse } from "next/server";
import { genAI } from "@/services/aiModelServices";
import { buildFeedback, buildPrompt } from "@/services/coding"
import type { CheckSolutionPayload } from "@/types/types"




export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CheckSolutionPayload;

    if (!payload.code || !payload.question) {
      return NextResponse.json(
        { error: "Both question details and candidate code are required." },
        { status: 400 },
      );
    }

    const prompt = buildPrompt(payload.question, payload.code);

    const result = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      config: {
        thinkingConfig: {
          thinkingBudget: -1,
        },
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const rawResponse =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ?? result?.text ?? "";

    if (!rawResponse) {
      return NextResponse.json(
        {
          error: "No evaluation generated.",
          feedback: "❌ The reviewer did not return feedback. Please try again.",
        },
        { status: 502 },
      );
    }

    const evaluation = buildFeedback(rawResponse);

    return NextResponse.json({
      passed: evaluation.passed,
      verdict: evaluation.verdict,
      feedback: `${evaluation.verdict}\n\n${evaluation.feedback}`.trim(),
    });
  } catch (error) {
    console.error("Failed to evaluate AI interview solution", error);

    return NextResponse.json(
      {
        error: "Unable to validate the solution at this time.",
        feedback: "❌ Unable to validate the solution right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
