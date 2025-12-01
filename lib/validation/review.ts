// lib/validation/review.ts
import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }),
  comment: z
    .string()
    .min(1, { message: "Comment is required" })
    .max(100, { message: "Comment must be at most 100 characters" }),
  headline: z.string().min(1, { message: "Headline is required" }),
  username: z.string().min(1, { message: "Your name is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});
