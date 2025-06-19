// Database types for the authentication API
// Kysely database schema types and helpers

import { Generated, ColumnType, Selectable, Insertable, Updateable } from "kysely";

// Base table interface for common fields
interface BaseTable {
  id: Generated<string>;
  createdAt: ColumnType<Date, string | undefined, never>;
}

// Database table interfaces
export interface UserTable extends BaseTable {
  email: string;
}

export type AuthMethodType = 'session' | 'mfa' | 'passkey' | 'update-password' | 'validate-email' | 'reset-password';

export interface AuthMethodTable extends BaseTable {
  userId: string; // UUID
  type: AuthMethodType;
  credential: Generated<string>; // Auto-generated token (or hashed for passwords)
  verifiedAt?: Date; // Nullable until the credential is verified
  expiresAt?: Date; // Nullable for password method without expiration
}

// Database interface
export interface Database {
  user: UserTable;
  auth_method: AuthMethodTable;
}

// Kysely type helpers
export type User = Selectable<UserTable>;
export type UserInsert = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type AuthMethod = Selectable<AuthMethodTable>;
export type AuthMethodInsert = Insertable<AuthMethodTable>;
export type AuthMethodUpdate = Updateable<AuthMethodTable>;

// Auth method types as const
export const AUTH_METHOD_TYPES = {
  SESSION: 'session',
  MFA: 'mfa',
  PASSKEY: 'passkey',
  UPDATE_PASSWORD: 'update-password',
  VALIDATE_EMAIL: 'validate-email',
  RESET_PASSWORD: 'reset-password',
} as const;

// Type guards for database types
export const isAuthMethodType = (type: string): type is AuthMethodType => {
  return Object.values(AUTH_METHOD_TYPES).includes(type as AuthMethodType);
};

export const isUser = (obj: any): obj is User => {
  return obj && typeof obj.id === 'string' && typeof obj.email === 'string';
};

export const isAuthMethod = (obj: any): obj is AuthMethod => {
  return obj && 
         typeof obj.id === 'string' && 
         typeof obj.userId === 'string' && 
         isAuthMethodType(obj.type);
}; 