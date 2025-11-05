import { GoogleGenAI } from "@google/genai"
import { CoachingOptions } from "../constants/constant"
import type { ConversationMessage } from "@/types/types"

export const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const aiModelServices = async (
  topic: string,
  coachingOption: string,
  lastFourMessage: ConversationMessage[]
) => {

  const option = CoachingOptions.find((item) => item.name === coachingOption);

  if (!option) {
    throw new Error('Invalid coaching option');
  }

  const systemPrompt = (option.prompt).replace('{user_topic}', topic);

  // Build conversation history
  const conversationHistory = lastFourMessage
    .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n')

  // Combine system prompt with conversation
  const fullPrompt = `${systemPrompt}

Conversation so far:
${conversationHistory}

Provide your next response (keep it under 120 characters, conversational and engaging):`

  try {
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
            text: fullPrompt,
          },
        ],
      },
    ];


    const result = await genAI.models.generateContent({
      model,
      config,
      contents,
    });

    console.log("Gemini AI raw result:", result)
    const response = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? result?.text ?? '';

    console.log("Gemini AI response received:", response)

    // The response is already plain text, no need to parse JSON
    const text = response.trim();

    console.log("Gemini AI completion received:", text)

    // Return in OpenAI-compatible format for backward compatibility
    return {
      message: {
        content: text
      },
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}

export const aiModelFeedbackServices = async (
  coachingOption: string,
  conversation: ConversationMessage[]
) => {

  const option = CoachingOptions.find((item) => item.name === coachingOption);

  if (!option) {
    throw new Error('Invalid coaching option');
  }

  const systemPrompt = (option.summeryPrompt);

  try {
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
            text: systemPrompt + '\n\n' + conversation.map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n'),
          },
        ],
      },
    ];


    const result = await genAI.models.generateContent({
      model,
      config,
      contents,
    });

    console.log("Gemini AI raw result:", result)
    const response = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? result?.text ?? '';

    console.log("Gemini AI response received:", response)

    // The response is already plain text, no need to parse JSON
    const text = response.trim();

    console.log("Gemini AI completion feedback received:", text)

    // Return in OpenAI-compatible format for backward compatibility
    return {
      message: {
        content: text
      },
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}
