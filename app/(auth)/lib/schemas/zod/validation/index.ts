/**
 * Centralized Zod validation schemas for API and forms.
 *
 * This module re-exports all Zod schemas for API and form validation, serving as the source of truth for validation logic and type inference.
 * Each export is documented at its source; see individual files for detailed schema documentation.
 */

// --- Core Schemas ---
/**
 * Standard error/success/failed schemas (see core.ts)
 */
export { ErrorSchema, SuccessSchema, FailedSchema } from './core';

// --- Form Schemas ---
/**
 * User form schemas (see forms/user.ts)
 */
export { UserValidationSchema, UserRegistrationSchema, UserResetSchema, UserUpdateSchema } from './forms/user';

// --- Passkey Schemas ---
/**
 * Passkey-related schemas (see passkey.ts)
 */
export {
  PasskeyAuthenticationOptionsSchema,
  PasskeyRegistrationOptionsSchema,
  PasskeyVerificationResponseSchema,
  PasskeyVerificationSuccessSchema,
  PasskeyRegistrationSuccessSchema
} from './passkey';

// --- Session Schemas ---
/**
 * Session-related schemas (see session.ts)
 */
export { SessionStatusSchema, SessionRenewSchema, SessionDestroySchema, TokenValidationSchema } from './session';

// --- User & Auth Method Schemas ---
/**
 * User and auth method schemas (see user.ts)
 */
export { UserSchema, GetUserResponseSchema, AuthMethodSchema } from './user'; 