import { z } from 'zod';

/**
 * Schema for validating user login credentials (email and password).
 * Used for login forms and authentication endpoints.
 */
export const UserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * Schema for validating user registration data (email and name).
 * Used for registration forms and user creation endpoints.
 */
export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

/**
 * Schema for validating user password reset requests (email only).
 * Used for password reset forms and endpoints.
 */
export const UserResetSchema = z.object({
  email: z.string().email(),
})

/**
 * Schema for validating user profile updates (name and/or email).
 * Used for profile update forms and endpoints.
 */
export const UserUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
})