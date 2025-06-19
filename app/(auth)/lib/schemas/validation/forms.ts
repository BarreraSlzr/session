import { validateRequest } from './core';
import type {
  LoginFormFromSchema,
  RegisterFormFromSchema,
  ResetFormFromSchema,
  UpdateFormFromSchema,
  TokenValidationFromSchema,
} from '../../types/schemas';
import {
    UserValidationSchema,
    UserRegistrationSchema,
    UserResetSchema,
    UserUpdateSchema,
    TokenValidationSchema
} from '../zod/validation'

/**
 * Validates login form data
 * @param data - Login form data to validate
 * @returns Validated login form data
 * @throws {z.ZodError} When validation fails
 */
export function validateLoginForm(data: unknown): LoginFormFromSchema {
  return validateRequest(UserValidationSchema, data);
}

/**
 * Validates register form data
 * @param data - Register form data to validate
 * @returns Validated register form data
 * @throws {z.ZodError} When validation fails
 */
export function validateRegisterForm(data: unknown): RegisterFormFromSchema {
  return validateRequest(UserRegistrationSchema, data);
}

/**
 * Validates reset form data
 * @param data - Reset form data to validate
 * @returns Validated reset form data
 * @throws {z.ZodError} When validation fails
 */
export function validateResetForm(data: unknown): ResetFormFromSchema {
  return validateRequest(UserResetSchema, data);
}

/**
 * Validates update form data
 * @param data - Update form data to validate
 * @returns Validated update form data
 * @throws {z.ZodError} When validation fails
 */
export function validateUpdateForm(data: unknown): UpdateFormFromSchema {
  return validateRequest(UserUpdateSchema, data);
}

/**
 * Validates token validation data
 * @param data - Token validation data to validate
 * @returns Validated token validation data
 * @throws {z.ZodError} When validation fails
 */
export function validateTokenValidation(data: unknown): TokenValidationFromSchema {
  return validateRequest(TokenValidationSchema, data);
}
