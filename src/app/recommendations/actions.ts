'use server';

import { recommendMaterials, MaterialRecommendationOutput } from '@/ai/flows/material-recommendation';
import { z } from 'zod';

const FormSchema = z.object({
  projectType: z.string().min(1, 'Project type is required.'),
  budget: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Budget must be a positive number.')
  ),
  location: z.string().min(1, 'Location is required.'),
  specificNeeds: z.string().min(1, 'Please describe your specific needs.'),
});

export type State = {
  message?: string | null;
  recommendations?: MaterialRecommendationOutput['recommendations'] | null;
  success: boolean;
};

export async function getRecommendations(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    projectType: formData.get('projectType'),
    budget: formData.get('budget'),
    location: formData.get('location'),
    specificNeeds: formData.get('specificNeeds'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
      success: false,
    };
  }

  try {
    const result = await recommendMaterials(validatedFields.data);
    if (result && result.recommendations.length > 0) {
      return {
        message: 'Here are your recommendations.',
        recommendations: result.recommendations,
        success: true,
      };
    } else {
      return {
        message: 'Could not generate recommendations based on your input. Please try again with different criteria.',
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}
