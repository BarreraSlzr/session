// Configuration constants for the authentication API
// All configuration values and constants

// Session configuration
export const SESSION_CONFIG = {
  MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
  COOKIE_NAME: 'session',
  SECURE: process.env.NODE_ENV === 'production',
  HTTP_ONLY: true,
  SAME_SITE: 'lax' as const,
} as const;

// Passkey configuration
export const PASSKEY_CONFIG = {
  RP_NAME: 'Internet Friends Accounts',
  RP_ID: 'internetfriends.com',
  TIMEOUT: 60000, // 60 seconds
  ATTESTATION: 'none' as const,
  USER_VERIFICATION: 'preferred' as const,
} as const;

// Validation configuration
export const VALIDATION_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_MAX_LENGTH: 254,
  NAME_MAX_LENGTH: 100,
} as const;

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // requests per window
} as const; 