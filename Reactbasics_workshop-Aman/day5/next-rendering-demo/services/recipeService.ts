import { GoogleGenerativeAI } from '@google/generative-ai';

export type RecipeResponse = {
  title: string;
  ingredients: string[];
  instructions: string[];
};

const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// V-- THIS IS THE FIX: Use a current, supported model name. --V
const generativeModel = googleAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

/**
 * @description Calls the Google Gemini API to generate a recipe.
 * @param {string[]} fruits - The list of fruits selected by the user.
 * @returns {Promise<RecipeResponse>} A promise that resolves to the structured recipe object.
 */
export async function callLlmApi(fruits: string[]): Promise<RecipeResponse> {
  const ingredientsList = fruits.join(', ');

  const prompt = `
    You are an expert chef who only responds in valid JSON format. Do not include any text, notes, or explanations before or after the JSON object. Do not use markdown formatting like \`\`\`json.
    
    Your task is to generate a simple recipe using the following ingredients: ${ingredientsList}.
    
    The JSON object you create must conform to this exact structure:
    {
      "title": "A Creative Recipe Title",
      "ingredients": ["A list of ingredients as strings"],
      "instructions": ["A list of step-by-step instructions as strings"]
    }
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();

    if (!responseText) {
      throw new Error('The AI returned an empty response.');
    }

    try {
      const recipe: RecipeResponse = JSON.parse(responseText);
      return recipe;
    } catch (parseError) {
      console.error('Failed to parse AI response JSON:', responseText);
      throw new Error('The AI returned a response in an unexpected format.');
    }

  } catch (error) {
    console.error('Error calling Google AI API:', error);
    throw new Error('There was an issue communicating with the AI service.');
  }
}