// API types for the authentication API
// Request/response types for all endpoints

import type { User, AuthMethod } from './database';

// Session types
export interface SessionStatus {
  status: 'valid';
  userId: string;
}

export interface SessionRenew {
  token: string;
}

export interface SessionDestroy {
  message: string;
}

// Passkey types
export interface PasskeyAuthenticationOptions {
  challenge: string;
  timeout: number;
  rpId: string;
  allowCredentials?: Array<{
    id: string;
    type: string;
  }>;
  userVerification: string;
}

export interface PasskeyRegistrationOptions {
  challenge: string;
  timeout: number;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{
    type: string;
    alg: number;
  }>;
  authenticatorSelection: {
    authenticatorAttachment: string;
    requireResidentKey: boolean;
    userVerification: string;
  };
  attestation: string;
}

export interface PasskeyVerificationResponse {
  response: string; // JSON stringified authentication/registration response
}

export interface PasskeyVerificationSuccess {
  status: 'success';
}

export interface PasskeyRegistrationSuccess {
  registrationInfo: {
    credentialID: string;
    credentialPublicKey: string;
    counter: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
}

export interface ResetForm {
  email: string;
}

export interface UpdateForm {
  name?: string;
  email?: string;
}

// Token validation types
export interface TokenValidation {
  token: string;
}

// API response types
export interface ApiSuccess {
  status: 'success';
}

export interface ApiFailed {
  status: 'failed';
}

// API response wrapper
export interface ApiResponse<T = any> {
  data?: T;
  error?: any;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request context types
export interface RequestContext {
  userId?: string;
  session?: AuthMethod;
  user?: User;
} 