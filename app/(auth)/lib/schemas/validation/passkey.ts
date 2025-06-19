import {
  PasskeyAuthenticationOptionsSchema,
  PasskeyRegistrationOptionsSchema,
  PasskeyVerificationResponseSchema,
  PasskeyVerificationSuccessSchema,
  PasskeyRegistrationSuccessSchema,
} from '../zod/validation';
import { validateRequest } from './core';
import type {
  PasskeyAuthenticationOptionsFromSchema as PasskeyAuthenticationOptions,
  PasskeyRegistrationOptionsFromSchema as PasskeyRegistrationOptions,
  PasskeyVerificationResponseFromSchema as PasskeyVerificationResponse,
  PasskeyVerificationSuccessFromSchema as PasskeyVerificationSuccess,
  PasskeyRegistrationSuccessFromSchema as PasskeyRegistrationSuccess,
} from '../../types/schemas';

/**
 * Validates passkey authentication options
 * @param data - Passkey authentication options to validate
 * @returns Validated passkey authentication options
 * @throws {z.ZodError} When validation fails
 */
export function validatePasskeyAuthenticationOptions(data: unknown): PasskeyAuthenticationOptions {
  return validateRequest(PasskeyAuthenticationOptionsSchema, data);
}

/**
 * Validates passkey registration options
 * @param data - Passkey registration options to validate
 * @returns Validated passkey registration options
 * @throws {z.ZodError} When validation fails
 */
export function validatePasskeyRegistrationOptions(data: unknown): PasskeyRegistrationOptions {
  return validateRequest(PasskeyRegistrationOptionsSchema, data);
}

/**
 * Validates passkey verification response
 * @param data - Passkey verification response to validate
 * @returns Validated passkey verification response
 * @throws {z.ZodError} When validation fails
 */
export function validatePasskeyVerificationResponse(data: unknown): PasskeyVerificationResponse {
  return validateRequest(PasskeyVerificationResponseSchema, data);
}

/**
 * Validates passkey verification success response
 * @param data - Passkey verification success to validate
 * @returns Validated passkey verification success
 * @throws {z.ZodError} When validation fails
 */
export function validatePasskeyVerificationSuccess(data: unknown): PasskeyVerificationSuccess {
  return validateRequest(PasskeyVerificationSuccessSchema, data);
}

/**
 * Validates passkey registration success response
 * @param data - Passkey registration success to validate
 * @returns Validated passkey registration success
 * @throws {z.ZodError} When validation fails
 */
export function validatePasskeyRegistrationSuccess(data: unknown): PasskeyRegistrationSuccess {
  return validateRequest(PasskeyRegistrationSuccessSchema, data);
} 