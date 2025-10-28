import OpenAI from "openai"
import { CoachingOptions } from "../constants/constant"
import type { ConversationMessage } from "@/types/types"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
})

export const aiModelServices = async (
  topic: string,
  coachingOption: string,
  lastFourMessage: ConversationMessage[]
) => {

    const option = CoachingOptions.find((item) => item.name === coachingOption);
    
    if (!option) {
        throw new Error('Invalid coaching option');
    }

    const prompt = (option.prompt).replace('{user_topic}', topic);

  const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-exp:free',
    messages: [
      { role : 'system', content: prompt }, // Changed from 'assistant' to 'system' for better context
      ...lastFourMessage.map(message => ({
        role: message.role,
        content: message.content
      }))
    ],
    temperature: 0.7, // Add some creativity while keeping it focused
    max_tokens: 150, // Limit response length for faster responses (under 120 chars as per prompt)
  })

  console.log("AI completion received:", completion.choices[0])
  return completion.choices[0];
}

