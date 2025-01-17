import { totp } from 'otplib';
import { createAuthMethod, verifyCredential } from '@/app/(auth)/lib/db/queries';

// Generate MFA Secret for a user
export async function generateMfaSecret(userId: string) {
  const mfa = await createAuthMethod(userId, 'mfa');
  const secret = mfa.credential;

  return totp.generate(secret); // Generate the MFA code using the secret
}

// Verify MFA Token
export async function verifyMfaToken(userId: string, token: string) {
  const mfa = await verifyCredential('mfa', token);
  
  if (!mfa || mfa.userId !== userId ) {
    throw new Error("MFA secret not found for user.");
  }

  return totp.check(token, mfa.credential);
}
