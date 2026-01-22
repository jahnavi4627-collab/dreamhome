// Material Recommendation Flow
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
      supplier: z.string().describe('The supplier of the recommended material.'),
      approximateCost: z.number().describe('The approximate cost of the material.'),
    })
  ).describe('A list of recommended materials.'),
});

export type MaterialRecommendationOutput = z.infer<typeof MaterialRecommendationOutputSchema>;

// Define the Genkit prompt
const materialRecommendationPrompt = ai.definePrompt({
  name: 'materialRecommendationPrompt',
  model: 'googleai/gemini-2.5-flash',
  input: {schema: MaterialRecommendationInputSchema},
  output: {schema: MaterialRecommendationOutputSchema},
  prompt: `You are an expert construction material advisor. Based on the project requirements below, recommend a list of materials that are suitable for the project.

Project Type: {{{projectType}}}
Budget: {{{budget}}} INR
Location: {{{location}}}
Specific Needs: {{{specificNeeds}}}

Provide a list of materials with their name, description, supplier, and approximate cost. Focus on materials that fit within the specified budget and are available in the given location.`,
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
    return output!;
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
