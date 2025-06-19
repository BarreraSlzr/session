# Centralized Type System

This document describes the centralized type system used throughout the authentication API, which serves as the single source of truth for all shared types.

## Overview

The type system is organized in a modular structure under `app/(auth)/lib/types/` and provides:

- **Database types** from Kysely (User, AuthMethod, etc.)
- **API request/response types** for all endpoints
- **Zod schemas** for validation
- **Error types** from the error registry
- **Utility types** for common patterns
- **Type guards** for runtime type checking
- **Constants** for configuration

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Types Directory                          │
│                app/(auth)/lib/types/                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Modular Files                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │  database.ts │  │    api.ts    │  │    schemas.ts      │ │
│  │ (DB types)   │  │ (API types)  │  │ (Zod schemas)      │ │
│  └──────────────┘  └──────────────┘  └────────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   config.ts  │  │  index.ts    │                        │
│  │ (constants)  │  │ (re-exports) │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Re-export Files                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   db/types.ts   │  │ schemas/index.ts│  │   errors.ts  │ │
│  │ (backward compat)│  │ (backward compat)│  │ (error types)│ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Usage Throughout App                     │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │ Route Handlers│  │   Database   │  │   OpenAPI Spec    │ │
│  │              │  │   Queries    │  │                    │ │
│  └──────────────┘  └──────────────┘  └────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

### `app/(auth)/lib/types/database.ts`
Contains all database-related types:
- Kysely table interfaces
- Database type helpers (Selectable, Insertable, Updateable)
- Type guards for database entities
- Auth method constants

### `app/(auth)/lib/types/api.ts`
Contains all API-related types:
- Request/response interfaces
- Form types
- Pagination types
- Request context types

### `app/(auth)/lib/types/schemas.ts`
Contains all Zod validation schemas:
- Input validation schemas
- Type inference from schemas
- Form validation schemas

### `app/(auth)/lib/types/config.ts`
Contains all configuration constants:
- Session configuration
- Passkey configuration
- Validation rules
- Rate limiting settings

### `app/(auth)/lib/types/index.ts`
Main entry point that re-exports everything:
- Clean re-exports from all modules
- Single import point for the entire type system
- Maintains backward compatibility

## Type Categories

### 1. Database Types (`database.ts`)

```typescript
// Base table interface
interface BaseTable {
  id: Generated<string>;
  createdAt: ColumnType<Date, string | undefined, never>;
}

// Table interfaces
export interface UserTable extends BaseTable {
  email: string;
}

export interface AuthMethodTable extends BaseTable {
  userId: string;
  type: AuthMethodType;
  credential: Generated<string>;
  verifiedAt?: Date;
  expiresAt?: Date;
}

// Kysely type helpers
export type User = Selectable<UserTable>;
export type UserInsert = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

// Type guards
export const isUser = (obj: any): obj is User => {
  return obj && typeof obj.id === 'string' && typeof obj.email === 'string';
};
```

### 2. API Types (`api.ts`)

```typescript
import type { User, AuthMethod } from './database';

// Session types
export interface SessionStatus {
  status: 'valid';
  userId: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

// Request context
export interface RequestContext {
  userId?: string;
  session?: AuthMethod;
  user?: User;
}
```

### 3. Zod Schemas (`schemas.ts`)

```typescript
import { z } from 'zod';

// Base schemas
export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

// Session schemas
export const SessionStatusSchema = z.object({
  status: z.enum(['valid']),
  userId: z.string(),
});

// Type inference
export type Error = z.infer<typeof ErrorSchema>;
export type SessionStatusFromSchema = z.infer<typeof SessionStatusSchema>;
```

### 4. Configuration (`config.ts`)

```typescript
// Session configuration
export const SESSION_CONFIG = {
  MAX_AGE: 7 * 24 * 60 * 60 * 1000,
  COOKIE_NAME: 'session',
  SECURE: process.env.NODE_ENV === 'production',
  HTTP_ONLY: true,
  SAME_SITE: 'lax' as const,
} as const;

// Passkey configuration
export const PASSKEY_CONFIG = {
  RP_NAME: 'Internet Friends Accounts',
  RP_ID: 'internetfriends.com',
  TIMEOUT: 60000,
  ATTESTATION: 'none' as const,
  USER_VERIFICATION: 'preferred' as const,
} as const;
```

## Usage Patterns

### 1. Importing from Main Entry Point

```typescript
// Import everything from the main entry point
import type { 
  User, 
  AuthMethod, 
  SessionStatus, 
  LoginForm,
  SESSION_CONFIG 
} from '@/app/(auth)/lib/types';

// Import schemas for validation
import { 
  LoginFormSchema, 
  SessionStatusSchema 
} from '@/app/(auth)/lib/types';
```

### 2. Importing from Specific Modules

```typescript
// Import only database types
import type { User, AuthMethod } from '@/app/(auth)/lib/types/database';

// Import only API types
import type { SessionStatus, LoginForm } from '@/app/(auth)/lib/types/api';

// Import only schemas
import { LoginFormSchema } from '@/app/(auth)/lib/types/schemas';

// Import only configuration
import { SESSION_CONFIG } from '@/app/(auth)/lib/types/config';
```

### 3. Route Handler Example

```typescript
import { handleRouteError, createError } from '@/app/(auth)/lib/errors';
import type { SessionStatus } from '@/app/(auth)/lib/types/api';
import { SessionStatusSchema } from '@/app/(auth)/lib/types/schemas';

export async function GET(req: Request): Promise<Response> {
  try {
    const session = await validateSession();
    
    if (!session) {
      throw createError.session.tokenInvalid();
    }
    
    const response: SessionStatus = {
      status: 'valid',
      userId: session.userId,
    };
    
    // Validate response against schema
    SessionStatusSchema.parse(response);
    
    return new Response(JSON.stringify(response));
  } catch (error) {
    return handleRouteError(error);
  }
}
```

### 4. Database Query Example

```typescript
import { db } from '@/app/(auth)/lib/db';
import type { User, UserInsert } from '@/app/(auth)/lib/types/database';

export async function createUser(email: string): Promise<User> {
  const userInsert: UserInsert = {
    email,
  };
  
  const [user] = await db
    .insertInto('user')
    .values(userInsert)
    .returningAll();
    
  return user;
}
```

### 5. Form Validation Example

```typescript
import { LoginFormSchema } from '@/app/(auth)/lib/types/schemas';
import type { LoginForm } from '@/app/(auth)/lib/types/api';

export async function validateLoginForm(formData: FormData): Promise<LoginForm> {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  
  // Validate and return typed data
  return LoginFormSchema.parse(rawData);
}
```

## Benefits of Modular Structure

### 1. **Better Organization**
- Related types are grouped together
- Easier to find and maintain specific types
- Clear separation of concerns

### 2. **Selective Imports**
- Import only what you need
- Smaller bundle sizes
- Better tree-shaking

### 3. **Easier Maintenance**
- Changes to one category don't affect others
- Clear ownership of types
- Easier to refactor

### 4. **Better IDE Support**
- Faster autocomplete
- Better type inference
- Clearer import suggestions

### 5. **LLM-Friendly**
- Clear file structure
- Logical grouping
- Easy to understand relationships

## Migration Guide

If you're updating existing code to use the new modular structure:

1. **Update imports** to use the new file structure
2. **Use specific imports** when you only need certain types
3. **Use the main entry point** for convenience when importing many types
4. **Update documentation** to reflect the new structure

## Best Practices

### 1. Use Specific Imports When Possible

```typescript
// Good - specific import
import type { User } from '@/app/(auth)/lib/types/database';

// Good - main entry point for convenience
import type { User, SessionStatus, LoginForm } from '@/app/(auth)/lib/types';
```

### 2. Keep Related Types Together

```typescript
// All database types in database.ts
// All API types in api.ts
// All schemas in schemas.ts
```

### 3. Use Type Guards for Runtime Checks

```typescript
import { isUser } from '@/app/(auth)/lib/types/database';

if (isUser(obj)) {
  // obj is now typed as User
  console.log(obj.email);
}
```

### 4. Validate Data with Schemas

```typescript
import { UserSchema } from '@/app/(auth)/lib/types/schemas';

const validatedUser = UserSchema.parse(rawData);
```

The modular type system provides better organization, maintainability, and developer experience while maintaining the benefits of a centralized type system! 🚀 