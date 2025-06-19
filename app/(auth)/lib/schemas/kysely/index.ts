// Central export for all Kysely database-related schemas, types, and error handling.
// This file provides a clear summary of what is available from this module for type safety, migrations, and error management.

// Export all database-related schemas and types from the current folder

// Kysely database schemas and error handling
export { 
    DatabaseSchema, // Table definitions for type safety and schema validation.
    AuthMethodTypes, // Array of valid authentication method types for type safety.
    type AuthMethodType, // Type for authentication method types (e.g., 'session', 'passkey').
 } from './database';

// --- Database Error Handling ---
export { 
    DatabaseError, // Custom error class for handling database-specific errors.
    DatabaseErrorTypes, // Enum of database error types for type-safe error handling.
    DatabaseErrorMessages, // Map of database error messages for consistent error reporting.
    createDatabaseError, // Helper functions for creating specific database errors
    type DatabaseErrorType, // Type for database error types
    type DatabaseErrorDetails, // Interface for database error details
 } from './errors';
