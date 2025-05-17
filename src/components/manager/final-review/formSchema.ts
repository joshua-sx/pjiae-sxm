
import * as z from 'zod';

// Form schema
export const finalReviewFormSchema = z.object({
  yearAccomplishments: z.string().min(10, 'Please provide at least 10 characters'),
  yearChallenges: z.string().min(10, 'Please provide at least 10 characters'),
  developmentPlan: z.string().min(10, 'Please provide at least 10 characters'),
  futureGoals: z.string().min(10, 'Please provide at least 10 characters'),
  communicationRating: z.string().min(1, 'Please select a rating'),
  teamworkRating: z.string().min(1, 'Please select a rating'),
  technicalRating: z.string().min(1, 'Please select a rating'),
  leadershipRating: z.string().min(1, 'Please select a rating'),
  overallPerformance: z.string().min(1, 'Please select a rating'),
});

export type FinalReviewFormValues = z.infer<typeof finalReviewFormSchema>;
