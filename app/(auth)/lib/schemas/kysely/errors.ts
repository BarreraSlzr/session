/**
 * Centralized Kysely database error types and helpers for the authentication API
 *
 * This module defines error types, messages, details, and helper functions for handling
 * database-specific errors in a type-safe and consistent way. Intended for use in query logic,
 * error handling middleware, and debugging database issues.
 *
 * Usage:
 *   - Use `DatabaseError` to throw or catch typed database errors.
 *   - Use `createDatabaseError` helpers to generate specific error instances.
 *   - Reference `DatabaseErrorTypes` and `DatabaseErrorMessages` for error handling and messaging.
 */

/**
 * Enum-like object of supported database error types.
 *
 * Used for type-safe error handling and messaging throughout the application.
 */
export const DatabaseErrorTypes = {
  CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
  FOREIGN_KEY_VIOLATION: 'FOREIGN_KEY_VIOLATION',
  UNIQUE_VIOLATION: 'UNIQUE_VIOLATION',
  NOT_NULL_VIOLATION: 'NOT_NULL_VIOLATION',
  CHECK_VIOLATION: 'CHECK_VIOLATION',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  QUERY_ERROR: 'QUERY_ERROR',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
} as const;

/**
 * Type alias for a valid database error type string.
 *
 * Example: 'CONSTRAINT_VIOLATION', 'QUERY_ERROR', etc.
 */
export type DatabaseErrorType = typeof DatabaseErrorTypes[keyof typeof DatabaseErrorTypes];

/**
 * Maps each database error type to a human-readable error message.
 *
 * Used by the DatabaseError class and error handlers to provide user-friendly error responses.
 */
export const DatabaseErrorMessages: Record<DatabaseErrorType, string> = {
  CONSTRAINT_VIOLATION: 'Database constraint violation',
  FOREIGN_KEY_VIOLATION: 'Foreign key constraint violation',
  UNIQUE_VIOLATION: 'Unique constraint violation',
  NOT_NULL_VIOLATION: 'Not null constraint violation',
  CHECK_VIOLATION: 'Check constraint violation',
  CONNECTION_ERROR: 'Database connection error',
  QUERY_ERROR: 'Database query error',
  TRANSACTION_ERROR: 'Database transaction error',
};

/**
 * Details about a database error, such as table, column, constraint, or original error message.
 *
 * Used to provide context for debugging and error reporting.
 */
export interface DatabaseErrorDetails {
  table?: string;
  column?: string;
  constraint?: string;
  value?: any;
  query?: string;
  originalError?: string;
}

/**
 * Custom error class for database-specific errors.
 *
 * @class
 * @extends Error
 * @param {DatabaseErrorType} type - The type of database error.
 * @param {DatabaseErrorDetails=} details - Optional additional error details.
 */
export class DatabaseError extends Error {
  public readonly type: DatabaseErrorType;
  public readonly details: DatabaseErrorDetails;

  constructor(type: DatabaseErrorType, details: DatabaseErrorDetails = {}) {
    super(DatabaseErrorMessages[type]);
    this.name = 'DatabaseError';
    this.type = type;
    this.details = details;
  }
}

/**
 * Helper functions for creating specific DatabaseError instances by error type.
 *
 * Usage:
 *   throw createDatabaseError.uniqueViolation({ table: 'user', column: 'email' });
 */
export const createDatabaseError = {
  constraintViolation: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.CONSTRAINT_VIOLATION, details),
  foreignKeyViolation: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.FOREIGN_KEY_VIOLATION, details),
  uniqueViolation: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.UNIQUE_VIOLATION, details),
  notNullViolation: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.NOT_NULL_VIOLATION, details),
  checkViolation: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.CHECK_VIOLATION, details),
  connectionError: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.CONNECTION_ERROR, details),
  queryError: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.QUERY_ERROR, details),
  transactionError: (details: DatabaseErrorDetails) => new DatabaseError(DatabaseErrorTypes.TRANSACTION_ERROR, details),
}; 