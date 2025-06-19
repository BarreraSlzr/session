import { z } from 'zod';

/**
 * Validates data against a Zod schema and throws an error if validation fails
 * @returns The validated data with proper typing
 * 
 * @example
 * ```typescript
 * const user = validateRequest(UserSchema, userData);
 * ```
 */
export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Validates data against a Zod schema and returns a result object
 * @returns Object with success status and either validated data or error
 * 
 * @example
 * ```typescript
 * const result = validateRequestSafe(UserSchema, userData);
 * if (result.success) {
 *   const user = result.data;
 * } else {
 *   console.error('Validation failed:', result.error);
 * }
 * ```
 */
export function validateRequestSafe<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates API response data against a Zod schema
 * @returns The validated response data
 * @throws {z.ZodError} When validation fails
 * 
 * @example
 * ```typescript
 * const response = validateResponse(SessionStatusSchema, apiResponse);
 * ```
 */
export function validateResponse<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
} 