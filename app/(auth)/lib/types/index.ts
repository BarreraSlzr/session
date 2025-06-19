/**
 * Centralized type system for the authentication API
 *
 * This module re-exports all types and constants from modular files for easy importing and type safety.
 * Each submodule is documented at its source; see individual files for detailed type documentation.
 * Only use `export * from` for submodules that are already documented at their entry point.
 */

// --- Database types ---
/**
 * Database table interfaces and Kysely type helpers
 * @see ./database.ts for detailed docs
 */
export {
  AUTH_METHOD_TYPES,
  isAuthMethodType,
  isUser,
  isAuthMethod,
} from './database';

export type {
  UserTable,
  AuthMethodTable,
  Database,
  User,
  UserInsert,
  UserUpdate,
  AuthMethod,
  AuthMethodInsert,
  AuthMethodUpdate,
  AuthMethodType,
} from './database';

// --- API types ---
/**
 * API request/response types for all endpoints
 * @see ./api.ts for detailed docs
 */
export type {
  SessionStatus,
  SessionRenew,
  SessionDestroy,
  PasskeyAuthenticationOptions,
  PasskeyRegistrationOptions,
  PasskeyVerificationResponse,
  PasskeyVerificationSuccess,
  PasskeyRegistrationSuccess,
  LoginForm,
  RegisterForm,
  ResetForm,
  UpdateForm,
  TokenValidation,
  ApiSuccess,
  ApiFailed,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
  RequestContext,
} from './api';

// --- Zod-inferred types (from schemas) ---
/**
 * TypeScript types inferred from Zod schemas
 * @see ./schemas.ts for detailed docs
 */
export type {
  Error,
  Success,
  Failed,
  SessionStatusFromSchema,
  SessionRenewFromSchema,
  SessionDestroyFromSchema,
  PasskeyAuthenticationOptionsFromSchema,
  PasskeyRegistrationOptionsFromSchema,
  PasskeyVerificationResponseFromSchema,
  PasskeyVerificationSuccessFromSchema,
  PasskeyRegistrationSuccessFromSchema,
  UserFromSchema,
  GetUserResponseFromSchema,
  AuthMethodFromSchema,
  LoginFormFromSchema,
  RegisterFormFromSchema,
  ResetFormFromSchema,
  UpdateFormFromSchema,
  TokenValidationFromSchema,
} from './schemas';

// --- Configuration types ---
/**
 * Configuration constants and settings
 * @see ./config.ts for detailed docs
 */
export {
  SESSION_CONFIG,
  PASSKEY_CONFIG,
  VALIDATION_CONFIG,
  RATE_LIMIT_CONFIG,
} from './config';

// --- Error types ---
/**
 * Error codes, messages, and types for consistent error handling
 * @see ./errors.ts for detailed docs
 */
export {
  ERROR_CODES,
  ERROR_MESSAGES,
  ERROR_STATUS_CODES,
  errorMessages,
} from './errors';

export type { ErrorCode } from './errors'; 