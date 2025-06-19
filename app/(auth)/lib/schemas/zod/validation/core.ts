import { z } from 'zod';

/**
 * Standard error response schema
 */
export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

/**
 * Standard success response schema
 */
export const SuccessSchema = z.object({
  status: z.enum(['success']),
});

/**
 * Standard failed response schema
 */
export const FailedSchema = z.object({
  status: z.enum(['failed']),
});
