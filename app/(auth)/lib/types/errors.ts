/**
 * Centralized error codes, messages, and types for the authentication API
 *
 * This module defines error code constants, message mappings, status codes, and type aliases
 * for consistent and type-safe error handling across the authentication system.
 *
 * Usage:
 *   - Use `ERROR_CODES` for referencing error codes in logic and error creation.
 *   - Use `ERROR_MESSAGES` for mapping error codes to user-friendly messages.
 *   - Use `ERROR_STATUS_CODES` for mapping error codes to HTTP status codes.
 *   - Use `ErrorCode` type for type-safe error code usage.
 *   - Use `errorMessages` for legacy error message mapping (backward compatibility).
 */

/**
 * Enum-like object of supported error codes for the authentication API.
 *
 * Used for type-safe error handling and referencing error codes in logic and error creation.
 */
export const ERROR_CODES = {
  // Session errors
  SESSION_TOKEN_NOT_FOUND: 'SESSION_TOKEN_NOT_FOUND',
  SESSION_TOKEN_INVALID: 'SESSION_TOKEN_INVALID',
  SESSION_TOKEN_EXPIRED: 'SESSION_TOKEN_EXPIRED',
  SESSION_DESTROY_FAILED: 'SESSION_DESTROY_FAILED',
  SESSION_RENEW_FAILED: 'SESSION_RENEW_FAILED',

  // Passkey errors
  PASSKEY_GENERATION_FAILED: 'PASSKEY_GENERATION_FAILED',
  PASSKEY_VERIFICATION_FAILED: 'PASSKEY_VERIFICATION_FAILED',
  PASSKEY_REGISTRATION_FAILED: 'PASSKEY_REGISTRATION_FAILED',
  PASSKEY_AUTHENTICATION_FAILED: 'PASSKEY_AUTHENTICATION_FAILED',
  PASSKEY_CHALLENGE_NOT_FOUND: 'PASSKEY_CHALLENGE_NOT_FOUND',

  // User errors
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_CREATION_FAILED: 'USER_CREATION_FAILED',

  // Authentication errors
  AUTH_METHOD_NOT_FOUND: 'AUTH_METHOD_NOT_FOUND',
  AUTH_METHOD_EXPIRED: 'AUTH_METHOD_EXPIRED',
  AUTH_METHOD_ALREADY_VERIFIED: 'AUTH_METHOD_ALREADY_VERIFIED',
  AUTH_METHOD_INVALID: 'AUTH_METHOD_INVALID',

  // Validation errors
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_REQUEST_DATA: 'INVALID_REQUEST_DATA',

  // General API errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;

/**
 * Maps each error code to a human-readable error message.
 *
 * Used by error classes and error handlers to provide user-friendly error responses.
 */
export const ERROR_MESSAGES: Record<keyof typeof ERROR_CODES, string> = {
  // Session errors
  SESSION_TOKEN_NOT_FOUND: 'Session token not found',
  SESSION_TOKEN_INVALID: 'Invalid session token',
  SESSION_TOKEN_EXPIRED: 'Session token has expired',
  SESSION_DESTROY_FAILED: 'Failed to destroy session',
  SESSION_RENEW_FAILED: 'Failed to renew session',

  // Passkey errors
  PASSKEY_GENERATION_FAILED: 'Failed to generate passkey options',
  PASSKEY_VERIFICATION_FAILED: 'Passkey verification failed',
  PASSKEY_REGISTRATION_FAILED: 'Passkey registration failed',
  PASSKEY_AUTHENTICATION_FAILED: 'Passkey authentication failed',
  PASSKEY_CHALLENGE_NOT_FOUND: 'Passkey challenge not found',

  // User errors
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_CREATION_FAILED: 'Failed to create user',

  // Authentication errors
  AUTH_METHOD_NOT_FOUND: 'Authentication method not found',
  AUTH_METHOD_EXPIRED: 'Authentication method has expired',
  AUTH_METHOD_ALREADY_VERIFIED: 'Authentication method already verified',
  AUTH_METHOD_INVALID: 'Invalid authentication method',

  // Validation errors
  VALIDATION_FAILED: 'Validation failed',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_TOKEN: 'Invalid token',
  INVALID_REQUEST_DATA: 'Invalid request data',

  // General API errors
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  BAD_REQUEST: 'Bad Request',
  RATE_LIMITED: 'Rate limit exceeded',
};

/**
 * Maps each error code to an HTTP status code.
 *
 * Used by error classes and error handlers to provide appropriate HTTP responses.
 */
export const ERROR_STATUS_CODES: Record<keyof typeof ERROR_CODES, number> = {
  // Session errors
  SESSION_TOKEN_NOT_FOUND: 401,
  SESSION_TOKEN_INVALID: 401,
  SESSION_TOKEN_EXPIRED: 401,
  SESSION_DESTROY_FAILED: 500,
  SESSION_RENEW_FAILED: 500,

  // Passkey errors
  PASSKEY_GENERATION_FAILED: 500,
  PASSKEY_VERIFICATION_FAILED: 400,
  PASSKEY_REGISTRATION_FAILED: 400,
  PASSKEY_AUTHENTICATION_FAILED: 400,
  PASSKEY_CHALLENGE_NOT_FOUND: 404,

  // User errors
  USER_NOT_FOUND: 404,
  USER_ALREADY_EXISTS: 409,
  USER_CREATION_FAILED: 500,

  // Authentication errors
  AUTH_METHOD_NOT_FOUND: 404,
  AUTH_METHOD_EXPIRED: 401,
  AUTH_METHOD_ALREADY_VERIFIED: 400,
  AUTH_METHOD_INVALID: 400,

  // Validation errors
  VALIDATION_FAILED: 400,
  INVALID_EMAIL: 400,
  INVALID_PASSWORD: 400,
  INVALID_TOKEN: 400,
  INVALID_REQUEST_DATA: 400,

  // General API errors
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  RATE_LIMITED: 429,
};

/**
 * Type alias for a valid error code string.
 *
 * Example: 'SESSION_TOKEN_NOT_FOUND', 'PASSKEY_GENERATION_FAILED', etc.
 */
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Legacy error message mapping for backward compatibility with older error messages.
 *
 * Used to map legacy error strings to the new error message format.
 */
export const errorMessages = {
  'Token expired': ERROR_MESSAGES.AUTH_METHOD_EXPIRED,
  'Token already verified': ERROR_MESSAGES.AUTH_METHOD_ALREADY_VERIFIED,
  'Token error': ERROR_MESSAGES.AUTH_METHOD_INVALID,
  'Token is required': ERROR_MESSAGES.AUTH_METHOD_NOT_FOUND,
  'Session token not found': ERROR_MESSAGES.SESSION_TOKEN_NOT_FOUND,
  'Invalid session token': ERROR_MESSAGES.SESSION_TOKEN_INVALID,
  'Internal Server Error': ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  'User not found': ERROR_MESSAGES.USER_NOT_FOUND,
  'Unauthorized': ERROR_MESSAGES.UNAUTHORIZED,
} as const; 