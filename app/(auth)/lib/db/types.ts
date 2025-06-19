// Re-export database types from centralized type system
// This file maintains backward compatibility while using the centralized types

import type { AuthMethodType } from '../types/database';

export type {
  // Database interfaces
  Database,
  UserTable,
  AuthMethodTable,
  
  // Kysely type helpers
  User,
  UserInsert,
  UserUpdate,
  AuthMethod,
  AuthMethodInsert,
  AuthMethodUpdate,
  
  // Auth method types
  AuthMethodType,
  
  // Constants
  AUTH_METHOD_TYPES,
  
  // Type guards
  isAuthMethodType,
  isUser,
  isAuthMethod,
} from '../types/database';

// Legacy type export for backward compatibility
export type TType = AuthMethodType;
