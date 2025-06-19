import { z } from 'zod';
import { ERROR_CODES, ERROR_MESSAGES, ERROR_STATUS_CODES, type ErrorCode } from './types/errors';

/**
 * Centralized error handling utilities for the authentication API
 *
 * Provides error types, error creation helpers, and a route error handler for consistent error responses.
 * Integrates with Zod for validation errors and supports custom error codes and messages.
 */

// Enhanced error schema with more details
export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Custom application error for consistent error handling.
 *
 * @class
 * @extends Error
 * @param {import('./types/errors').ErrorCode} code - The error code.
 * @param {Record<string, any>=} details - Optional additional error details.
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, any>;

  constructor(code: ErrorCode, details?: Record<string, any>) {
    super(ERROR_MESSAGES[code]);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = ERROR_STATUS_CODES[code];
    this.details = details;
  }

  toResponse(): Response {
    const errorResponse: ErrorResponse = {
      error: this.message,
      code: this.code,
      details: this.details,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(errorResponse), {
      status: this.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Helper functions for creating common AppError instances by domain.
 *
 * Usage:
 *   throw createError.session.tokenNotFound({ userId });
 */
export const createError = {
  session: {
    tokenNotFound: (details?: Record<string, any>) => new AppError(ERROR_CODES.SESSION_TOKEN_NOT_FOUND, details),
    tokenInvalid: (details?: Record<string, any>) => new AppError(ERROR_CODES.SESSION_TOKEN_INVALID, details),
    tokenExpired: (details?: Record<string, any>) => new AppError(ERROR_CODES.SESSION_TOKEN_EXPIRED, details),
    destroyFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.SESSION_DESTROY_FAILED, details),
    renewFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.SESSION_RENEW_FAILED, details),
  },
  passkey: {
    generationFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.PASSKEY_GENERATION_FAILED, details),
    verificationFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.PASSKEY_VERIFICATION_FAILED, details),
    registrationFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.PASSKEY_REGISTRATION_FAILED, details),
    authenticationFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.PASSKEY_AUTHENTICATION_FAILED, details),
    challengeNotFound: (details?: Record<string, any>) => new AppError(ERROR_CODES.PASSKEY_CHALLENGE_NOT_FOUND, details),
  },
  user: {
    notFound: (details?: Record<string, any>) => new AppError(ERROR_CODES.USER_NOT_FOUND, details),
    alreadyExists: (details?: Record<string, any>) => new AppError(ERROR_CODES.USER_ALREADY_EXISTS, details),
    creationFailed: (details?: Record<string, any>) => new AppError(ERROR_CODES.USER_CREATION_FAILED, details),
  },
  auth: {
    methodNotFound: (details?: Record<string, any>) => new AppError(ERROR_CODES.AUTH_METHOD_NOT_FOUND, details),
    methodExpired: (details?: Record<string, any>) => new AppError(ERROR_CODES.AUTH_METHOD_EXPIRED, details),
    methodAlreadyVerified: (details?: Record<string, any>) => new AppError(ERROR_CODES.AUTH_METHOD_ALREADY_VERIFIED, details),
    methodInvalid: (details?: Record<string, any>) => new AppError(ERROR_CODES.AUTH_METHOD_INVALID, details),
  },
  validation: {
    failed: (details?: Record<string, any>) => new AppError(ERROR_CODES.VALIDATION_FAILED, details),
    invalidEmail: (details?: Record<string, any>) => new AppError(ERROR_CODES.INVALID_EMAIL, details),
    invalidPassword: (details?: Record<string, any>) => new AppError(ERROR_CODES.INVALID_PASSWORD, details),
    invalidToken: (details?: Record<string, any>) => new AppError(ERROR_CODES.INVALID_TOKEN, details),
    invalidRequestData: (details?: Record<string, any>) => new AppError(ERROR_CODES.INVALID_REQUEST_DATA, details),
  },
  general: {
    internalServerError: (details?: Record<string, any>) => new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR, details),
    unauthorized: (details?: Record<string, any>) => new AppError(ERROR_CODES.UNAUTHORIZED, details),
    forbidden: (details?: Record<string, any>) => new AppError(ERROR_CODES.FORBIDDEN, details),
    notFound: (details?: Record<string, any>) => new AppError(ERROR_CODES.NOT_FOUND, details),
    badRequest: (details?: Record<string, any>) => new AppError(ERROR_CODES.BAD_REQUEST, details),
    rateLimited: (details?: Record<string, any>) => new AppError(ERROR_CODES.RATE_LIMITED, details),
  },
};

/**
 * Handles errors in route handlers and returns a standardized Response.
 *
 * - AppError: returns its own response
 * - ZodError: returns a validation error response
 * - Error: returns an internal server error response
 * - unknown: returns a fallback error response
 *
 * @param {unknown} error - The error to handle
 * @returns {Response} The standardized error response
 */
export const handleRouteError = (error: unknown): Response => {
  console.error('Route error:', error);

  // If it's already an AppError, return its response
  if (error instanceof AppError) {
    return error.toResponse();
  }

  // If it's a Zod validation error
  if (error instanceof z.ZodError) {
    const validationError = createError.validation.failed({
      validationErrors: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
        code: err.code,
      })),
    });
    return validationError.toResponse();
  }

  // If it's a standard Error
  if (error instanceof Error) {
    const internalError = createError.general.internalServerError({
      originalError: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
    return internalError.toResponse();
  }

  // Fallback for unknown errors
  const fallbackError = createError.general.internalServerError({
    unknownError: String(error),
  });
  return fallbackError.toResponse();
}; 