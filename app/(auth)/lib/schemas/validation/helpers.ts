import { z } from 'zod';
import { validateRequest, validateRequestSafe } from './core';
import {
  SessionStatusSchema,
  SessionRenewSchema,
  SessionDestroySchema,
  PasskeyAuthenticationOptionsSchema,
  PasskeyRegistrationOptionsSchema,
  PasskeyVerificationResponseSchema,
  PasskeyVerificationSuccessSchema,
  PasskeyRegistrationSuccessSchema,
  UserSchema,
  GetUserResponseSchema,
  AuthMethodSchema,
  LoginFormSchema,
  RegisterFormSchema,
  ResetFormSchema,
  UpdateFormSchema,
  TokenValidationSchema,
  ErrorSchema,
  SuccessSchema,
  FailedSchema,
} from '../zod/validation';

/**
 * Creates a reusable API validator with both strict and safe validation methods
 * @returns Object with validate and validateSafe methods
 * 
 * @example
 * ```typescript
 * const userValidator = createApiValidator(UserSchema);
 * const user = userValidator.validate(userData);
 * const result = userValidator.validateSafe(userData);
 * ```
 */
export function createApiValidator<T extends z.ZodType>(schema: T) {
  return {
    validate: (data: unknown): z.infer<T> => validateRequest(schema, data),
    validateSafe: (data: unknown) => validateRequestSafe(schema, data),
  };
}

/**
 * Pre-configured validators for common API patterns
 * Provides ready-to-use validators for all major schemas
 * 
 * @example
 * ```typescript
 * const sessionData = apiValidators.sessionStatus.validate(data);
 * const result = apiValidators.loginForm.validateSafe(formData);
 * ```
 */
export const apiValidators = {
  sessionStatus: createApiValidator(SessionStatusSchema),
  sessionRenew: createApiValidator(SessionRenewSchema),
  sessionDestroy: createApiValidator(SessionDestroySchema),
  passkeyAuthOptions: createApiValidator(PasskeyAuthenticationOptionsSchema),
  passkeyRegOptions: createApiValidator(PasskeyRegistrationOptionsSchema),
  passkeyVerification: createApiValidator(PasskeyVerificationResponseSchema),
  passkeyVerificationSuccess: createApiValidator(PasskeyVerificationSuccessSchema),
  passkeyRegistrationSuccess: createApiValidator(PasskeyRegistrationSuccessSchema),
  user: createApiValidator(UserSchema),
  getUserResponse: createApiValidator(GetUserResponseSchema),
  authMethod: createApiValidator(AuthMethodSchema),
  loginForm: createApiValidator(LoginFormSchema),
  registerForm: createApiValidator(RegisterFormSchema),
  resetForm: createApiValidator(ResetFormSchema),
  updateForm: createApiValidator(UpdateFormSchema),
  tokenValidation: createApiValidator(TokenValidationSchema),
  error: createApiValidator(ErrorSchema),
  success: createApiValidator(SuccessSchema),
  failed: createApiValidator(FailedSchema),
}; 