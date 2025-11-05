import type { AiInterviewQuestion, CodingLanguage, DifficultyLevel } from "@/types/types"
import {
  ALLOWED_DIFFICULTIES,
  ALLOWED_LANGUAGES,
  CODING_LANGUAGE_CONFIG,
} from "@/constants/constant"

export const sanitiseJson = (raw: string): string => raw.replace(/```json/gi, "").replace(/```/g, "").trim();

const stripCodeFences = (value?: string | null): string =>
  typeof value === "string"
    ? value.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim()
    : "";

export const parseQuestion = (
  raw: string,
  requestedDifficulty: DifficultyLevel,
  requestedLanguage: CodingLanguage,
): AiInterviewQuestion => {
  const cleaned = sanitiseJson(raw);
  const parsed = JSON.parse(cleaned) as Partial<AiInterviewQuestion> & {
    constraints?: string | string[];
  };

  const candidateLanguage = (parsed.language ?? requestedLanguage) as CodingLanguage;
  const language = ALLOWED_LANGUAGES.includes(candidateLanguage) ? candidateLanguage : requestedLanguage;
  const languageConfig = CODING_LANGUAGE_CONFIG[language];

  const constraintsText = Array.isArray(parsed.constraints)
    ? parsed.constraints.join("\n")
    : parsed.constraints?.toString() ?? "";

  const difficulty = ALLOWED_DIFFICULTIES.includes((parsed.difficulty ?? "") as DifficultyLevel)
    ? (parsed.difficulty as DifficultyLevel)
    : requestedDifficulty;

  return {
    id: parsed.id || globalThis.crypto?.randomUUID?.() || Date.now().toString(),
    title: parsed.title || "Coding Interview Challenge",
    description: parsed.description || "Solve the described programming exercise.",
    difficulty,
    constraints: constraintsText || "Ensure your solution handles edge cases.",
    note: parsed.note?.trim() || undefined,
    starterCode: stripCodeFences(parsed.starterCode) || languageConfig.starterTemplate,
    followUpQuestions: parsed.followUpQuestions?.filter(Boolean),
    sampleAnswerOutline: parsed.sampleAnswerOutline?.trim() || undefined,
    editorialCode: stripCodeFences(parsed.editorialCode) || languageConfig.fallbackEditorial,
    editorialExplanation:
      stripCodeFences(parsed.editorialExplanation) || languageConfig.fallbackExplanation,
    language,
  };
};

export const buildFeedback = (raw: string) => {
  try {
    const parsed = JSON.parse(sanitiseJson(raw)) as {
      passed?: boolean;
      verdict?: string;
      feedback?: string;
      improvements?: string[];
    };

    const passed = Boolean(parsed.passed);
    const verdict = parsed.verdict
      ? parsed.verdict.trim()
      : passed
      ? "✅ Solution appears correct."
      : "❌ Solution needs improvements.";

    const normalisedVerdict = verdict.startsWith("✅") || verdict.startsWith("❌")
      ? verdict
      : `${passed ? "✅" : "❌"} ${verdict}`;

    const baseFeedback = parsed.feedback?.trim() || "Provide more detail about your approach and ensure you meet all constraints.";
    const improvements = Array.isArray(parsed.improvements) ? parsed.improvements.filter(Boolean) : [];
    const improvementsBlock = improvements.length
      ? `\n\nSuggested improvements:\n${improvements.map((tip) => `- ${tip}`).join("\n")}`
      : "";

    return {
      passed,
      verdict: normalisedVerdict,
      feedback: `${baseFeedback}${improvementsBlock}`.trim(),
    };
  } catch (error) {
    console.error("Failed to parse AI evaluation", error);
    return {
      passed: false,
      verdict: "❌ Unable to parse evaluation.",
      feedback: "The automated reviewer could not analyse the submission. Please double-check syntax and logical flow.",
    };
  }
};

export const buildPrompt = (question: AiInterviewQuestion, code: string): string => {
  const followUps = question.followUpQuestions?.length
    ? `Follow-up prompts to consider: ${question.followUpQuestions.join("; ")}`
    : "";

  const languageConfig = CODING_LANGUAGE_CONFIG[question.language];
  const languageLabel = languageConfig?.promptLabel ?? "the requested language";

  return `You are a seasoned technical interviewer. Review the candidate's ${languageLabel} solution for the following challenge.\n\nTitle: ${question.title}\nDifficulty: ${question.difficulty}\nDescription: ${question.description}\nConstraints (each must be respected):\n${question.constraints}\n${question.note ? `Important note: ${question.note}` : ""}\n${followUps}\n\nCandidate solution (${languageLabel}):\n${code}\n\nEvaluate correctness, adherence to constraints, time and space complexity, and overall clarity.\n\nRespond ONLY with JSON matching this schema:\n{\n  "passed": boolean,\n  "verdict": string, // start with ✅ if correct, otherwise start with ❌\n  "feedback": string, // under 150 words, provide strengths and improvements\n  "improvements"?: string[] // optional bullet-ready suggestions\n}`;
};
