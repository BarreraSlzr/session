/**
 * Centralized Kysely database schema definitions for the authentication API
 *
 * This module defines the structure of the database tables and supported authentication method types
 * for use with Kysely. It provides type-safe schema objects and type aliases for use throughout the codebase.
 *
 * Usage:
 *   - Import `DatabaseSchema` to define or validate table structures in migrations and queries.
 *   - Use `AuthMethodTypes` and `AuthMethodType` for type-safe handling of authentication methods.
 */

/**
 * Table schema definitions for Kysely migrations and type safety.
 *
 * - `user`: Stores user accounts (id, email, createdAt)
 * - `auth_method`: Stores authentication methods for users (session, passkey, etc.)
 */
export const DatabaseSchema = {
  user: {
    id: 'uuid',
    email: 'varchar',
    createdAt: 'timestamptz',
  },
  auth_method: {
    id: 'uuid',
    userId: 'uuid',
    type: 'varchar',
    credential: 'text',
    verifiedAt: 'timestamptz',
    expiresAt: 'timestamptz',
    createdAt: 'timestamptz',
  },
} as const;

// Auth method types for type safety
/**
 * Supported authentication method types for the system.
 *
 * Used for type-safe validation and constraints in the database and application logic.
 */
export const AuthMethodTypes = [
  'session',
  'mfa', 
  'passkey',
  'update-password',
  'validate-email',
  'reset-password'
] as const;

/**
 * Type alias for a valid authentication method type string.
 *
 * Example: 'session', 'passkey', 'reset-password', etc.
 */
export type AuthMethodType = typeof AuthMethodTypes[number]; 