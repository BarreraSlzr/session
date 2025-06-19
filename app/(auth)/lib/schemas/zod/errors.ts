/**
 * Centralized Zod validation error types and helpers for the authentication API
 *
 * This module defines error types, messages, details, and helper functions for handling
 * validation-specific errors in a type-safe and consistent way. Intended for use in form validation,
 * API request/response validation, and error handling middleware.
 *
 * Usage:
 *   - Use `ValidationError` to throw or catch typed validation errors.
 *   - Use `createValidationError` helpers to generate specific error instances.
 *   - Reference `ValidationErrorTypes` and `ValidationErrorMessages` for error handling and messaging.
 *   - Use `fromZodError` to convert Zod errors to custom ValidationError instances.
 */

import { z } from 'zod';

/**
 * Enum-like object of supported validation error types.
 *
 * Used for type-safe error handling and messaging throughout the application.
 */
export const ValidationErrorTypes = {
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_STRING: 'INVALID_STRING',
  INVALID_NUMBER: 'INVALID_NUMBER',
  INVALID_BOOLEAN: 'INVALID_BOOLEAN',
  INVALID_DATE: 'INVALID_DATE',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_URL: 'INVALID_URL',
  INVALID_UUID: 'INVALID_UUID',
  TOO_SMALL: 'TOO_SMALL',
  TOO_BIG: 'TOO_BIG',
  INVALID_LENGTH: 'INVALID_LENGTH',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_ENUM: 'INVALID_ENUM',
  INVALID_UNION: 'INVALID_UNION',
  INVALID_OBJECT: 'INVALID_OBJECT',
  INVALID_ARRAY: 'INVALID_ARRAY',
  MISSING_FIELD: 'MISSING_FIELD',
  UNRECOGNIZED_KEYS: 'UNRECOGNIZED_KEYS',
} as const;

/**
 * Type alias for a valid validation error type string.
 *
 * Example: 'INVALID_TYPE', 'INVALID_EMAIL', etc.
 */
export type ValidationErrorType = typeof ValidationErrorTypes[keyof typeof ValidationErrorTypes];

/**
 * Maps each validation error type to a human-readable error message.
 *
 * Used by the ValidationError class and error handlers to provide user-friendly error responses.
 */
export const ValidationErrorMessages: Record<ValidationErrorType, string> = {
  INVALID_TYPE: 'Invalid type',
  INVALID_STRING: 'Invalid string',
  INVALID_NUMBER: 'Invalid number',
  INVALID_BOOLEAN: 'Invalid boolean',
  INVALID_DATE: 'Invalid date',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_URL: 'Invalid URL',
  INVALID_UUID: 'Invalid UUID',
  TOO_SMALL: 'Value too small',
  TOO_BIG: 'Value too big',
  INVALID_LENGTH: 'Invalid length',
  INVALID_FORMAT: 'Invalid format',
  INVALID_ENUM: 'Invalid enum value',
  INVALID_UNION: 'Invalid union value',
  INVALID_OBJECT: 'Invalid object',
  INVALID_ARRAY: 'Invalid array',
  MISSING_FIELD: 'Missing required field',
  UNRECOGNIZED_KEYS: 'Unrecognized keys',
};

/**
 * Details about a validation error, such as field, path, value, or expected type.
 *
 * Used to provide context for debugging and error reporting.
 */
export interface ValidationErrorDetails {
  field?: string;
  path?: (string | number)[];
  value?: any;
  expected?: any;
  received?: any;
  minimum?: number;
  maximum?: number;
  length?: number;
  format?: string;
  enum?: any[];
  union?: any[];
}

/**
 * Custom error class for validation-specific errors.
 *
 * @class
 * @extends Error
 * @param {ValidationErrorType} type - The type of validation error.
 * @param {ValidationErrorDetails=} details - Optional additional error details.
 * @param {z.ZodError=} zodError - Optional original Zod error for reference.
 */
export class ValidationError extends Error {
  public readonly type: ValidationErrorType;
  public readonly details: ValidationErrorDetails;
  public readonly zodError?: z.ZodError;

  constructor(type: ValidationErrorType, details: ValidationErrorDetails = {}, zodError?: z.ZodError) {
    super(ValidationErrorMessages[type]);
    this.name = 'ValidationError';
    this.type = type;
    this.details = details;
    this.zodError = zodError;
  }
}

/**
 * Helper functions for creating specific ValidationError instances by error type.
 *
 * Usage:
 *   throw createValidationError.invalidEmail({ field: 'email' });
 */
export const createValidationError = {
  invalidType: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_TYPE, details, zodError),
  invalidString: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_STRING, details, zodError),
  invalidNumber: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_NUMBER, details, zodError),
  invalidBoolean: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_BOOLEAN, details, zodError),
  invalidDate: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_DATE, details, zodError),
  invalidEmail: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_EMAIL, details, zodError),
  invalidUrl: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_URL, details, zodError),
  invalidUuid: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_UUID, details, zodError),
  tooSmall: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.TOO_SMALL, details, zodError),
  tooBig: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.TOO_BIG, details, zodError),
  invalidLength: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_LENGTH, details, zodError),
  invalidFormat: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_FORMAT, details, zodError),
  invalidEnum: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_ENUM, details, zodError),
  invalidUnion: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_UNION, details, zodError),
  invalidObject: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_OBJECT, details, zodError),
  invalidArray: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.INVALID_ARRAY, details, zodError),
  missingField: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.MISSING_FIELD, details, zodError),
  unrecognizedKeys: (details: ValidationErrorDetails, zodError?: z.ZodError) => new ValidationError(ValidationErrorTypes.UNRECOGNIZED_KEYS, details, zodError),
};

/**
 * Converts a ZodError to a custom ValidationError instance.
 *
 * @param {z.ZodError} zodError - The original Zod error object.
 * @returns {ValidationError} The custom ValidationError instance.
 */
export function fromZodError(zodError: z.ZodError): ValidationError {
  const firstError = zodError.errors[0];
  const details: ValidationErrorDetails = {
    field: firstError.path.map(p => String(p)).join('.'),
    path: firstError.path,
    value: 'received' in firstError ? firstError.received : undefined,
    expected: 'expected' in firstError ? firstError.expected : undefined,
  };

  // Map Zod error codes to our error types
  switch (firstError.code) {
    case 'invalid_type':
      return createValidationError.invalidType(details, zodError);
    case 'invalid_string':
      return createValidationError.invalidString(details, zodError);
    case 'invalid_enum_value':
      return createValidationError.invalidEnum({ ...details, enum: firstError.options }, zodError);
    case 'unrecognized_keys':
      return createValidationError.unrecognizedKeys({ ...details, value: firstError.keys }, zodError);
    case 'too_small':
      return createValidationError.tooSmall({ 
        ...details, 
        minimum: typeof firstError.minimum === 'number' ? firstError.minimum : undefined 
      }, zodError);
    case 'too_big':
      return createValidationError.tooBig({ 
        ...details, 
        maximum: typeof firstError.maximum === 'number' ? firstError.maximum : undefined 
      }, zodError);
    default:
      return createValidationError.invalidType(details, zodError);
  }
} 