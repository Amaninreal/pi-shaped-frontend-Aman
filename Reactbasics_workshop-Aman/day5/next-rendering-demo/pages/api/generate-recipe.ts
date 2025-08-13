// pages/api/generate-recipe.ts

import type { NextApiRequest, NextApiResponse } from 'next';
// V-- IMPORT FROM THE NEW SERVICE FILE --V
import { callLlmApi, RecipeResponse } from '../../services/recipeService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fruits } = req.body;

  if (!fruits || !Array.isArray(fruits) || fruits.length === 0) {
    return res.status(400).json({ error: 'Please select at least one fruit.' });
  }

  try {
    // This call now points to an external dependency, which is easy to mock.
    const recipe = await callLlmApi(fruits);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
}