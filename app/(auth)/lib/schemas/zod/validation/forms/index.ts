/**
 * User-related form validation schemas
 *
 * This module exports Zod schemas for validating user input in forms such as login, registration, password reset, and profile update.
 */
export { 
  UserValidationSchema, // Login form (email, password)
  UserRegistrationSchema,  // Registration form (email, name)
  UserResetSchema, // Password reset form (email)
  UserUpdateSchema  // Profile update form (name, email)
} from './user'; 