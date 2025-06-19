/**
 * Centralized validation functions for the authentication API
 *
 * This module re-exports all validation functions for API, forms, users, passkeys, and helpers.
 */

// --- Core Validation Functions ---
/**
 * Core validation utilities for generic schema validation
 */
export {
  validateRequest, // Validate and throw on error
  validateRequestSafe, // Validate and return success/error
  validateResponse, // Validate API response
} from './core';

// --- Passkey Validation Functions ---
/**
 * Passkey-related validation functions
 */
export {
  validatePasskeyAuthenticationOptions, // Validate passkey auth options
  validatePasskeyRegistrationOptions, // Validate passkey registration options
  validatePasskeyVerificationResponse, // Validate passkey verification response
  validatePasskeyVerificationSuccess, // Validate passkey verification success
  validatePasskeyRegistrationSuccess, // Validate passkey registration success
} from './passkey';

// --- User Validation Functions ---
/**
 * User-related validation functions
 */
export {
  validateUser, // Validate user data
  validateGetUserResponse, // Validate get user response
  validateAuthMethod, // Validate auth method
} from './user';

// --- Form Validation Functions ---
/**
 * Form validation functions for user input
 */
export {
  validateLoginForm, // Validate login form
  validateRegisterForm, // Validate register form
  validateResetForm, // Validate reset form
  validateUpdateForm, // Validate update form
  validateTokenValidation, // Validate token
} from './forms';

// --- API Response Validation Functions ---
/**
 * API response validation functions
 */
export {
  validateError, // Validate error response
  validateSuccess, // Validate success response
  validateFailed, // Validate failed response
} from './api';

// --- Validation Helper Functions ---
/**
 * Validation helper functions and pre-configured validators
 */
export {
  createApiValidator, // Create a reusable validator
  apiValidators, // Pre-configured validators for common API patterns
} from './helpers'; 