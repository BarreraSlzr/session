# Error Handling Guide

This document describes the centralized error handling system used throughout the authentication API.

## Overview

The error registry provides consistent error handling across all API endpoints with:
- Standardized error codes and messages
- Proper HTTP status codes
- Structured error responses
- Type safety with TypeScript
- Integration with Zod validation

## Error Response Format

All API errors follow this structure:

```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_ERROR_CODE",
  "details": {
    "additional": "error details"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Error Categories

### Session Errors
- `SESSION_TOKEN_NOT_FOUND` (401) - Session token not found
- `SESSION_TOKEN_INVALID` (401) - Invalid session token
- `SESSION_TOKEN_EXPIRED` (401) - Session token has expired
- `SESSION_DESTROY_FAILED` (500) - Failed to destroy session
- `SESSION_RENEW_FAILED` (500) - Failed to renew session

### Passkey Errors
- `PASSKEY_GENERATION_FAILED` (500) - Failed to generate passkey options
- `PASSKEY_VERIFICATION_FAILED` (400) - Passkey verification failed
- `PASSKEY_REGISTRATION_FAILED` (400) - Passkey registration failed
- `PASSKEY_AUTHENTICATION_FAILED` (400) - Passkey authentication failed
- `PASSKEY_CHALLENGE_NOT_FOUND` (404) - Passkey challenge not found

### User Errors
- `USER_NOT_FOUND` (404) - User not found
- `USER_ALREADY_EXISTS` (409) - User already exists
- `USER_CREATION_FAILED` (500) - Failed to create user

### Authentication Errors
- `AUTH_METHOD_NOT_FOUND` (404) - Authentication method not found
- `AUTH_METHOD_EXPIRED` (401) - Authentication method has expired
- `AUTH_METHOD_ALREADY_VERIFIED` (400) - Authentication method already verified
- `AUTH_METHOD_INVALID` (400) - Invalid authentication method

### Validation Errors
- `VALIDATION_FAILED` (400) - Validation failed
- `INVALID_EMAIL` (400) - Invalid email address
- `INVALID_PASSWORD` (400) - Invalid password
- `INVALID_TOKEN` (400) - Invalid token
- `INVALID_REQUEST_DATA` (400) - Invalid request data

### General API Errors
- `INTERNAL_SERVER_ERROR` (500) - Internal Server Error
- `UNAUTHORIZED` (401) - Unauthorized
- `FORBIDDEN` (403) - Forbidden
- `NOT_FOUND` (404) - Not Found
- `BAD_REQUEST` (400) - Bad Request
- `RATE_LIMITED` (429) - Rate limit exceeded

## Usage Examples

### In Route Handlers

```typescript
import { handleRouteError, createError } from "@/app/(auth)/lib/errors";

export async function GET(req: Request) {
  try {
    const session = await validateSession();
    
    if (!session) {
      throw createError.session.tokenInvalid();
    }
    
    return new Response(JSON.stringify({ status: "valid", userId: session.userId }));
  } catch (error) {
    return handleRouteError(error);
  }
}
```

### Creating Custom Errors

```typescript
// Basic error
throw createError.user.notFound();

// Error with additional details
throw createError.validation.failed({
  field: "email",
  reason: "Already exists"
});

// Custom error with details
const error = createError.passkey.verificationFailed({
  attemptCount: 3,
  maxAttempts: 5
});
```

### Handling Different Error Types

The `handleRouteError` function automatically handles:

1. **AppError instances** - Returns the error response directly
2. **Zod validation errors** - Converts to validation error response
3. **Standard Error objects** - Converts to internal server error
4. **Unknown errors** - Converts to internal server error with details

## Best Practices

### 1. Always Use the Error Registry

❌ Don't do this:
```typescript
return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
```

✅ Do this:
```typescript
throw createError.general.internalServerError();
```

### 2. Provide Meaningful Details

```typescript
// Good - provides context
throw createError.validation.failed({
  field: "email",
  value: email,
  reason: "Invalid format"
});

// Bad - no context
throw createError.validation.failed();
```

### 3. Use Appropriate Error Categories

```typescript
// For session-related issues
throw createError.session.tokenExpired();

// For user-related issues
throw createError.user.notFound({ userId });

// For validation issues
throw createError.validation.invalidEmail({ email });
```

### 4. Handle Errors Consistently

Always wrap route handlers with try-catch and use `handleRouteError`:

```typescript
export async function POST(req: Request) {
  try {
    // Your logic here
  } catch (error) {
    return handleRouteError(error);
  }
}
```

## Integration with Zod

The error registry automatically handles Zod validation errors:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

try {
  const userData = UserSchema.parse(requestData);
} catch (error) {
  // This will be automatically converted to a validation error
  return handleRouteError(error);
}
```

## Testing Error Responses

When testing your API endpoints, you can verify error responses:

```typescript
// Test that validation errors are handled correctly
const response = await fetch('/api/session/status');
const errorData = await response.json();

expect(response.status).toBe(401);
expect(errorData.code).toBe('SESSION_TOKEN_INVALID');
expect(errorData.error).toBe('Invalid session token');
```

## Adding New Error Types

To add a new error type:

1. Add the error code to `ERROR_CODES`
2. Add the message to `ERROR_MESSAGES`
3. Add the status code to `ERROR_STATUS_CODES`
4. Add a helper function to `createError`
5. Update this documentation

Example:
```typescript
// In errors.ts
export const ERROR_CODES = {
  // ... existing codes
  NEW_ERROR_TYPE: 'NEW_ERROR_TYPE',
} as const;

export const ERROR_MESSAGES = {
  // ... existing messages
  NEW_ERROR_TYPE: 'New error message',
} as const;

export const ERROR_STATUS_CODES = {
  // ... existing codes
  NEW_ERROR_TYPE: 400,
} as const;

export const createError = {
  // ... existing categories
  newCategory: {
    newError: (details?: Record<string, any>) => new AppError(ERROR_CODES.NEW_ERROR_TYPE, details),
  },
};
```

## Migration Guide

If you're updating existing code to use the error registry:

1. Replace `throw new Error("message")` with appropriate `createError` calls
2. Replace manual error responses with `handleRouteError(error)`
3. Update tests to expect the new error format
4. Update client code to handle the new error structure

## OpenAPI Integration

The error registry is documented in the OpenAPI specification with:
- Standardized error response schema
- Example error responses
- Proper HTTP status codes
- Machine-readable error codes for client handling 