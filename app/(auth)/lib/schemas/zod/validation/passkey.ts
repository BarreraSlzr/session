import { z } from 'zod';

/**
 * Passkey authentication options schema
 */
export const PasskeyAuthenticationOptionsSchema = z.object({
  challenge: z.string(),
  timeout: z.number(),
  rpId: z.string(),
  allowCredentials: z.array(z.object({
    id: z.string(),
    type: z.string(),
  })).optional(),
  userVerification: z.string(),
});

/**
 * Passkey registration options schema
 */
export const PasskeyRegistrationOptionsSchema = z.object({
  challenge: z.string(),
  timeout: z.number(),
  rp: z.object({
    name: z.string(),
    id: z.string(),
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
  }),
  pubKeyCredParams: z.array(z.object({
    type: z.string(),
    alg: z.number(),
  })),
  authenticatorSelection: z.object({
    authenticatorAttachment: z.string(),
    requireResidentKey: z.boolean(),
    userVerification: z.string(),
  }),
  attestation: z.string(),
});

/**
 * Passkey verification response schema
 */
export const PasskeyVerificationResponseSchema = z.object({
  response: z.string(), // JSON stringified authentication/registration response
});

/**
 * Passkey verification success schema
 */
export const PasskeyVerificationSuccessSchema = z.object({
  status: z.enum(['success']),
});

/**
 * Passkey registration success schema
 */
export const PasskeyRegistrationSuccessSchema = z.object({
  registrationInfo: z.object({
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    counter: z.number(),
  }),
});
