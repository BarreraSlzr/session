import { z } from 'zod';

/**
 * Session status response schema
 */
export const SessionStatusSchema = z.object({
  status: z.enum(['valid']),
  userId: z.string(),
});

/**
 * Session renewal request/response schema
 */
export const SessionRenewSchema = z.object({
  token: z.string(),
});

/**
 * Session destroy response schema
 */
export const SessionDestroySchema = z.object({
  message: z.string(),
});

/**
 * Token validation schema
 */
export const TokenValidationSchema = z.object({
  token: z.string().min(1),
});
