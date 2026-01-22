'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing material recommendations based on project requirements.
 *
 * The flow takes project requirements as input and returns a list of recommended materials with descriptions.
 *
 * @module MaterialRecommendationFlow
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Input schema for the material recommendation flow
const MaterialRecommendationInputSchema = z.object({
  projectType: z.string().describe('The type of project (e.g., residential, commercial).'),
  budget: z.number().describe('The budget for the project in INR.'),
  location: z.string().describe('The location of the project.'),
  specificNeeds: z.string().describe('Any specific material needs or preferences.'),
});

export type MaterialRecommendationInput = z.infer<typeof MaterialRecommendationInputSchema>;

// Output schema for the material recommendation flow
const MaterialRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      materialName: z.string().describe('The name of the recommended material.'),
      description: z.string().describe('A description of the material and its suitability for the project.'),
      approximateCost: z.number().describe('The approximate cost of the material.'),
    })
  ).describe('A list of recommended materials.'),
});

export type MaterialRecommendationOutput = z.infer<typeof MaterialRecommendationOutputSchema>;

// Define the Genkit prompt
const materialRecommendationPrompt = ai.definePrompt({
  name: 'materialRecommendationPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: MaterialRecommendationInputSchema},
  output: {schema: MaterialRecommendationOutputSchema},
  prompt: `You are an expert construction material advisor. Your task is to recommend construction materials based on the provided project details.

Your response MUST be a valid JSON object that conforms to the provided output schema. The JSON object should have a single key "recommendations", which is an array of material objects.

Each material object in the "recommendations" array must have the following properties:
- "materialName": The name of the recommended material.
- "description": A description of the material and its suitability for the project.
- "approximateCost": The approximate cost of the material in INR.

Project Details:
- Project Type: {{{projectType}}}
- Budget: {{{budget}}} INR
- Location: {{{location}}}
- Specific Needs: {{{specificNeeds}}}

Based on these details, generate the recommendations. Focus on materials that fit within the budget and are available in the location.`,
});

// Define the Genkit flow
const materialRecommendationFlow = ai.defineFlow(
  {
    name: 'materialRecommendationFlow',
    inputSchema: MaterialRecommendationInputSchema,
    outputSchema: MaterialRecommendationOutputSchema,
  },
  async input => {
    const {output} = await materialRecommendationPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a valid recommendation response.');
    }
    return output;
  }
);

/**
 * Recommends construction materials based on project requirements.
 * @param input - The input containing project details.
 * @returns A promise that resolves with the material recommendations.
 */
export async function recommendMaterials(input: MaterialRecommendationInput): Promise<MaterialRecommendationOutput> {
  return materialRecommendationFlow(input);
}
