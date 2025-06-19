import { z } from 'zod';

/**
 * User schema
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * Get user API response schema
 */
export const GetUserResponseSchema = z.object({
  user: UserSchema,
});

/**
 * Auth method schema
 */
export const AuthMethodSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['session', 'mfa', 'passkey', 'update-password', 'validate-email', 'reset-password']),
  credential: z.string(),
  expiresAt: z.string().datetime().optional(),
  verifiedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});
