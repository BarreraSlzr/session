/**
 * Centralized type inference from Zod schemas for the authentication API
 *
 * This module re-exports types inferred from Zod validation schemas, providing a single source of truth
 * for API, form, and database types. Maintains backward compatibility while using the centralized schemas.
 *
 * Usage:
 *   - Import types from this file for type-safe API handlers, validation, and documentation.
 *   - All types are inferred from the latest Zod schemas in the validation directory.
 */

import {
  ErrorSchema,
  SuccessSchema,
  FailedSchema,
  SessionStatusSchema,
  SessionRenewSchema,
  SessionDestroySchema,
  PasskeyAuthenticationOptionsSchema,
  PasskeyRegistrationOptionsSchema,
  PasskeyVerificationResponseSchema,
  PasskeyVerificationSuccessSchema,
  PasskeyRegistrationSuccessSchema,
  UserSchema,
  GetUserResponseSchema,
  AuthMethodSchema,
  TokenValidationSchema,
  UserRegistrationSchema,
  UserResetSchema,
  UserUpdateSchema,
  UserValidationSchema,
} from '@/app/(auth)/lib/schemas/zod/validation';

import { z } from 'zod';

/**
 * Error response type inferred from ErrorSchema.
 * Used for API error responses.
 */
export type Error = z.infer<typeof ErrorSchema>;

/**
 * Success response type inferred from SuccessSchema.
 * Used for successful API responses.
 */
export type Success = z.infer<typeof SuccessSchema>;

/**
 * Failed response type inferred from FailedSchema.
 * Used for failed API responses.
 */
export type Failed = z.infer<typeof FailedSchema>;

/**
 * Session status response type inferred from SessionStatusSchema.
 * Used for checking the current session status.
 */
export type SessionStatusFromSchema = z.infer<typeof SessionStatusSchema>;

/**
 * Session renewal response type inferred from SessionRenewSchema.
 * Used for responses to session renewal requests.
 */
export type SessionRenewFromSchema = z.infer<typeof SessionRenewSchema>;

/**
 * Session destroy response type inferred from SessionDestroySchema.
 * Used for responses to session destroy requests.
 */
export type SessionDestroyFromSchema = z.infer<typeof SessionDestroySchema>;

/**
 * Passkey authentication options type inferred from PasskeyAuthenticationOptionsSchema.
 * Used for passkey authentication challenge options.
 */
export type PasskeyAuthenticationOptionsFromSchema = z.infer<typeof PasskeyAuthenticationOptionsSchema>;

/**
 * Passkey registration options type inferred from PasskeyRegistrationOptionsSchema.
 * Used for passkey registration challenge options.
 */
export type PasskeyRegistrationOptionsFromSchema = z.infer<typeof PasskeyRegistrationOptionsSchema>;

/**
 * Passkey verification response type inferred from PasskeyVerificationResponseSchema.
 * Used for responses to passkey verification attempts.
 */
export type PasskeyVerificationResponseFromSchema = z.infer<typeof PasskeyVerificationResponseSchema>;

/**
 * Passkey verification success type inferred from PasskeyVerificationSuccessSchema.
 * Used for successful passkey verification responses.
 */
export type PasskeyVerificationSuccessFromSchema = z.infer<typeof PasskeyVerificationSuccessSchema>;

/**
 * Passkey registration success type inferred from PasskeyRegistrationSuccessSchema.
 * Used for successful passkey registration responses.
 */
export type PasskeyRegistrationSuccessFromSchema = z.infer<typeof PasskeyRegistrationSuccessSchema>;

/**
 * User object type inferred from UserSchema.
 * Used for user data returned by the API.
 */
export type UserFromSchema = z.infer<typeof UserSchema>;

/**
 * Get user API response type inferred from GetUserResponseSchema.
 * Used for responses to get user requests.
 */
export type GetUserResponseFromSchema = z.infer<typeof GetUserResponseSchema>;

/**
 * Auth method object type inferred from AuthMethodSchema.
 * Used for authentication method data in the API.
 */
export type AuthMethodFromSchema = z.infer<typeof AuthMethodSchema>;

/**
 * Login form type inferred from UserValidationSchema.
 * Used for validating login form input.
 */
export type LoginFormFromSchema = z.infer<typeof UserValidationSchema>;

/**
 * Registration form type inferred from UserRegistrationSchema.
 * Used for validating registration form input.
 */
export type RegisterFormFromSchema = z.infer<typeof UserRegistrationSchema>;

/**
 * Password reset form type inferred from UserResetSchema.
 * Used for validating password reset form input.
 */
export type ResetFormFromSchema = z.infer<typeof UserResetSchema>;

/**
 * Profile update form type inferred from UserUpdateSchema.
 * Used for validating profile update form input.
 */
export type UpdateFormFromSchema = z.infer<typeof UserUpdateSchema>;

/**
 * Token validation object type inferred from TokenValidationSchema.
 * Used for validating token-based requests.
 */
export type TokenValidationFromSchema = z.infer<typeof TokenValidationSchema>;