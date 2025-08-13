import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AITask } from "../types";

// Initialize the Google AI client using the Vite environment variable
const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const generativeModel = googleAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

/**
 * @description Calls the live Google Gemini API to decompose a goal into structured tasks.
 * @param {string} goal - The high-level goal from the user.
 * @returns {Promise<AITask[]>} A promise that resolves to an array of structured task objects.
 */
export const getStructuredTasksFromAI = async (goal: string): Promise<AITask[]> => {
  const prompt = `
    You are an expert project management assistant. Your only job is to break down a user's goal into a list of actionable sub-tasks.
    Your response MUST be a valid JSON array of objects. Do not include any text, notes, or explanations before or after the JSON object. Do not use markdown formatting like \`\`\`json.
    Each object in the array must have exactly three keys: "text", "category", and "priority" ('High', 'Medium', or 'Low').
    User's Goal: "${goal}"
    JSON Response:
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();

    if (!responseText) {
      throw new Error('The AI returned an empty response.');
    }

    try {
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const tasks: AITask[] = JSON.parse(cleanedText);
      return tasks;
    } catch (parseError) {
      console.error('Failed to parse AI response JSON:', responseText);
      throw new Error('The AI returned a response in an unexpected format.');
    }

  } catch (error) {
    console.error('Error calling Google AI API:', error);
    throw new Error('There was an issue communicating with the AI service.');
  }
};