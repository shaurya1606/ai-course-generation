import { NextResponse } from "next/server";
import { genAI } from "@/services/aiModelServices";
import type { CodingLanguage, DifficultyLevel, GenerateQuestionPayload } from "@/types/types";
import {
  ALLOWED_DIFFICULTIES,
  ALLOWED_LANGUAGES,
  CODING_LANGUAGE_CONFIG,
  DEFAULT_CODING_LANGUAGE,
  DIFFICULTY_TIPS,
  buildBasePrompt,
  buildFallbackQuestion,
} from "@/constants/constant";
import { parseQuestion } from "@/services/coding";

export async function POST(request: Request) {
  let difficulty: DifficultyLevel = "easy";
  let language: CodingLanguage = DEFAULT_CODING_LANGUAGE;

  try {
    const payload = (await request.json()) as GenerateQuestionPayload;

    if (!payload.difficulty || !ALLOWED_DIFFICULTIES.includes(payload.difficulty)) {
      return NextResponse.json(
        { error: "Valid difficulty is required: easy, medium, or hard." },
        { status: 400 },
      );
    }

    difficulty = payload.difficulty;

    if (payload.language && ALLOWED_LANGUAGES.includes(payload.language)) {
      language = payload.language;
    }

    const topic = payload.topic?.trim() || "general software engineering concepts";
    const languageLabel = CODING_LANGUAGE_CONFIG[language].promptLabel;

    const fullPrompt = [
      buildBasePrompt(language),
      `Requested difficulty: ${difficulty}`,
      `Requested language: ${languageLabel}`,
      `Focus area: ${topic}`,
      DIFFICULTY_TIPS[difficulty],
    ].join("\n\n");

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
              text: fullPrompt,
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
          error: "No response from AI model.",
          question: buildFallbackQuestion(difficulty, language),
        },
        { status: 502 },
      );
    }

    const question = parseQuestion(rawResponse, difficulty, language);

    return NextResponse.json({
      question,
    });
  } catch (error) {
    console.error("Failed to generate AI interview question", error);

    return NextResponse.json({
      error: "Unable to generate a question right now. Displaying a fallback challenge instead.",
      question: buildFallbackQuestion(difficulty, language),
    });
  }
}
