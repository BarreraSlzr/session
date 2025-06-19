import { ErrorSchema, SuccessSchema, FailedSchema } from '../zod/validation';
import { validateRequest } from './core';
import type {
  Error,
  Success,
  Failed,
} from '../../types/schemas';

/**
 * Validates error response data
 * @param data - Error response data to validate
 * @returns Validated error response data
 * @throws {z.ZodError} When validation fails
 */
export function validateError(data: unknown): Error {
  return validateRequest(ErrorSchema, data);
}

/**
 * Validates success response data
 * @param data - Success response data to validate
 * @returns Validated success response data
 * @throws {z.ZodError} When validation fails
 */
export function validateSuccess(data: unknown): Success {
  return validateRequest(SuccessSchema, data);
}

/**
 * Validates failed response data
 * @param data - Failed response data to validate
 * @returns Validated failed response data
 * @throws {z.ZodError} When validation fails
 */
export function validateFailed(data: unknown): Failed {
  return validateRequest(FailedSchema, data);
} 