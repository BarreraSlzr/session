# Schemas System

⚠️ For all enforceable rules and standards, see `.cursor/rules/`. This README is for usage, onboarding, and high-level documentation only.

## 🎯 Purpose
This directory contains all schemas, validation logic, and type definitions for the authentication API. It serves as the **single source of truth** for data validation, type safety, and API contracts.

## 📁 Directory Structure

```
schemas/
├── index.ts              # Main exports - re-exports from all modules
├── README.md             # This file - usage & onboarding only
├── zod/                  # Zod validation schemas
│   ├── index.ts         # Zod schema exports
│   ├── core.ts          # Base schemas (Error, Success, Failed)
│   ├── session.ts       # Session-related schemas
│   ├── passkey.ts       # Passkey authentication schemas
│   ├── user.ts          # User and profile schemas
│   ├── forms/           # Form validation schemas (with index.ts)
│   └── api.ts           # API-specific schemas
├── kysely/              # Database schemas and errors
│   ├── index.ts         # Database exports
│   ├── schema.ts        # Kysely database schema
│   ├── errors.ts        # Database error handling
│   └── types.ts         # Database-specific types
└── validation/          # Validation helper functions
    ├── index.ts         # Validation exports
    ├── core.ts          # Core validation utilities
    ├── session.ts       # Session validation helpers
    ├── passkey.ts       # Passkey validation helpers
    ├── user.ts          # User validation helpers
    ├── forms.ts         # Form validation helpers
    ├── api.ts           # API validation helpers
    └── helpers.ts       # Common validation patterns
```

## 🔧 Import & Export Rules

### ✅ DO: Use Named Exports and Document Everything
```typescript
// ✅ Good - Named exports with documentation
export { UserSchema, LoginFormSchema } from './user';
export { validateRequest, validateRequestSafe } from './core';

// ✅ Good - Index files re-export with documentation
export {
  UserSchema,
  LoginFormSchema,
  validateUser,
  validateLoginForm,
} from './user';
```

### ❌ DON'T: Use Default Exports
```typescript
// ❌ Bad - Default exports
export default UserSchema;
```

### ⚠️ Conditional: Use `export * from` ONLY for Documented Submodules
- Only use `export * from './submodule'` in an `index.ts` if the target file or submodule is already fully documented at its own entry point (with a summary doc comment).
- All leaf modules must have JSDoc comments for every export.
- Each index file must have a summary doc comment describing all exports and their purpose.

#### Example: Documented Leaf Module
```typescript
/**
 * Schema for validating user login credentials (email and password).
 * Used for login forms and authentication endpoints.
 */
export const UserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

#### Example: Documented Index File
```typescript
/**
 * User-related form validation schemas
 *
 * This module exports Zod schemas for validating user input in forms such as login, registration, password reset, and profile update.
 * These schemas serve as a single source of truth for user form validation across the application and API documentation/codegen.
 */
export * from './user'; // Only allowed because './user' is fully documented
```

### 📦 Import Patterns
```typescript
// ✅ Good - Import from main index
import { UserSchema, validateRequest } from '@/app/(auth)/lib/schemas';

// ✅ Good - Import directly from source for specific needs
import { UserSchema } from '@/app/(auth)/lib/schemas/zod/user';
import { validateRequest } from '@/app/(auth)/lib/schemas/validation/core';

// ✅ Good - Import types from centralized types
import type { User, AuthMethod } from '@/app/(auth)/lib/types';
```

## 🏗️ Architecture Principles

### 1. **Modular by Concern**
- Each file handles one specific domain (users, sessions, passkeys, etc.)
- Clear separation between Zod schemas, validation helpers, and database schemas
- Avoid circular dependencies by importing from source files

### 2. **Documentation-First**
- Every export must have JSDoc documentation
- Include usage examples in documentation
- Index files serve as documentation summaries
- Only use `export * from` for submodules that are already documented at their entry point

### 3. **Type Safety**
- All schemas are strongly typed
- Validation functions return typed results
- Error handling is type-safe

### 4. **Consistent Error Handling**
- Centralized error registry in `@/app/(auth)/lib/types/errors`
- Consistent error codes and messages
- Type-safe error creation

## 🔄 Validation Patterns

### Request Validation
```typescript
// ✅ Good - Validate and throw on error
const data = validateRequest(LoginFormSchema, requestBody);

// ✅ Good - Validate and return result
const result = validateRequestSafe(LoginFormSchema, requestBody);
if (!result.success) {
  return handleValidationError(result.error);
}
```

### Response Validation
```typescript
// ✅ Good - Validate API responses
const response = validateResponse(SuccessSchema, apiResponse);
```

### Form Validation
```typescript
// ✅ Good - Use specific form validators
const formData = validateLoginForm({
  email: 'user@example.com',
  password: 'password123'
});
```

## 🎨 Schema Design Patterns

### Base Schemas
```typescript
// ✅ Good - Extend base schemas
export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  name: z.string().min(1),
});
```

### API Response Schemas
```typescript
// ✅ Good - Consistent API response structure
export const GetUserResponseSchema = SuccessSchema.extend({
  data: UserSchema,
});
```

### Error Schemas
```typescript
// ✅ Good - Use centralized error types
export const ValidationErrorSchema = ErrorSchema.extend({
  code: z.enum(ValidationErrorTypes),
  details: z.array(ValidationErrorDetailsSchema),
});
```

## 🚨 Error Handling

### Error Creation
```typescript
// ✅ Good - Use centralized error creation
import { createValidationError, ValidationErrorTypes } from '@/app/(auth)/lib/schemas';

const error = createValidationError(
  ValidationErrorTypes.INVALID_EMAIL,
  'Invalid email format'
);
```

### Error Types
```typescript
// ✅ Good - Import from centralized types
import type { ValidationError, DatabaseError } from '@/app/(auth)/lib/types/errors';
```

## 🔍 Testing Patterns

### Schema Testing
```typescript
// ✅ Good - Test schemas directly
describe('UserSchema', () => {
  it('should validate valid user data', () => {
    const result = UserSchema.safeParse(validUserData);
    expect(result.success).toBe(true);
  });
});
```

### Validation Testing
```typescript
// ✅ Good - Test validation functions
describe('validateUser', () => {
  it('should return success for valid data', () => {
    const result = validateUser(validUserData);
    expect(result.success).toBe(true);
  });
});
```

## 📝 Documentation Standards

### JSDoc Format
```typescript
/**
 * Validates user registration form data
 * 
 * @param data - The form data to validate
 * @returns Validation result with success/error
 * 
 * @example
 * ```typescript
 * const result = validateRegisterForm({
 *   email: 'user@example.com',
 *   password: 'password123',
 *   name: 'John Doe'
 * });
 * 
 * if (result.success) {
 *   // Handle valid data
 * } else {
 *   // Handle validation errors
 * }
 * ```
 */
export function validateRegisterForm(data: unknown) {
  // Implementation
}
```

### Index File Documentation
```typescript
/**
 * User-related validation schemas and functions
 * 
 * @example
 * ```typescript
 * import { UserSchema, validateUser } from '@/app/(auth)/lib/schemas';
 * ```
 */
export {
  UserSchema,
  GetUserResponseSchema,
  validateUser,
  validateGetUserResponse,
} from './user';
```

## 🔧 Development Workflow

### Adding New Schemas
1. Create schema in appropriate `zod/` file, with JSDoc for every export
2. Add validation function in corresponding `validation/` file, with JSDoc
3. Export from module's `index.ts` (with summary doc comment)
4. Re-export from main `schemas/index.ts` (with summary doc comment)
5. Use `export * from` only if the submodule is already documented at its entry point
6. Update this README if needed

### Adding New Validation Functions
1. Create function in appropriate `validation/` file, with JSDoc
2. Add comprehensive JSDoc documentation
3. Include usage examples
4. Export from module's `index.ts` (with summary doc comment)
5. Re-export from main `schemas/index.ts` (with summary doc comment)

### Error Handling
1. Add error type to `@/app/(auth)/lib/types/errors`
2. Add error creation function
3. Use in validation functions
4. Update error registry documentation

## 🎯 LLM Instructions

When working with this schemas system:

1. **Always use named exports** - never default exports
2. **Only use `export * from` in index files for submodules that are already documented at their entry point**
3. **Document every export** with JSDoc including examples
4. **Import from source files** to avoid circular dependencies
5. **Use centralized error types** from `@/app/(auth)/lib/types/errors`
6. **Follow the modular structure** - don't create monolithic files
7. **Maintain type safety** - all functions should be strongly typed
8. **Use consistent patterns** - follow the examples in this README
9. **Update index files** when adding new exports
10. **Test schemas and validation** functions thoroughly
11. **Keep this README updated** with any architectural changes

## 🔗 Related Files

- **Error Registry**: `@/app/(auth)/lib/types/errors`
- **OpenAPI Spec**: `/openapi.yaml`
- **Database Types**: `@/app/(auth)/lib/types/database`
- **API Types**: `@/app/(auth)/lib/types/api`
- **Configuration**: `@/app/(auth)/lib/types/config`

## 🆕 Index File Export & Documentation Pattern

All `index.ts` files in this system follow a documentation-first, explicit export pattern:

- Each `index.ts` must have a summary doc comment at the top describing its purpose and the exports it provides.
- Only use `export * from` for submodules that are already documented at their entry point (i.e., the submodule's own index.ts or file has a summary doc comment).
- All leaf modules must have JSDoc comments for every export.
- Each export group in an index file should reference the submodule's documentation for details.
- This pattern is now used in `validation/index.ts`, `kysely/index.ts`, `zod/validation/index.ts`, and `types/index.ts`.

### Example: Documented Leaf Module
```typescript
/**
 * Schema for validating user login credentials (email and password).
 * Used for login forms and authentication endpoints.
 */
export const UserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

### Example: Documented Index File
```typescript
/**
 * Centralized validation functions for the authentication API
 *
 * This module re-exports all validation functions for API, forms, users, passkeys, and helpers.
 * Each export is documented at its source; see individual files for detailed documentation and usage examples.
 * Only use `export * from` for submodules that are already documented at their entry point.
 */
export {
  validateRequest,
  validateRequestSafe,
  validateResponse,
} from './core';
export * from './forms'; // Only allowed because './forms' is fully documented
```

See the top of each `index.ts` for a summary and references to submodule documentation.

## Usage & Onboarding

- Use this directory as the source for all schema and validation logic.
- For rules, code style, and architectural standards, see `.cursor/rules/`.
- For onboarding, see the main project `README.md`.

## Examples

- See each subfolder and file for usage examples and schema documentation.
- For API contracts, see `/openapi.yaml` in the project root. 