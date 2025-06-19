import { UserSchema, GetUserResponseSchema, AuthMethodSchema } from '../zod/validation';
import { validateRequest } from './core';
import type {
  UserFromSchema as User,
  GetUserResponseFromSchema as GetUserResponse,
  AuthMethodFromSchema as AuthMethod,
} from '../../types/schemas';

/**
 * Validates user data
 * @param data - User data to validate
 * @returns Validated user data
 * @throws {z.ZodError} When validation fails
 */
export function validateUser(data: unknown): User {
  return validateRequest(UserSchema, data);
}

/**
 * Validates get user response
 * @param data - Get user response to validate
 * @returns Validated get user response
 * @throws {z.ZodError} When validation fails
 */
export function validateGetUserResponse(data: unknown): GetUserResponse {
  return validateRequest(GetUserResponseSchema, data);
}

/**
 * Validates authentication method data
 * @param data - Authentication method data to validate
 * @returns Validated authentication method data
 * @throws {z.ZodError} When validation fails
 */
export function validateAuthMethod(data: unknown): AuthMethod {
  return validateRequest(AuthMethodSchema, data);
} 