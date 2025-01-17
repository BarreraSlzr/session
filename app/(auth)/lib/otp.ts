import { totp } from 'otplib';
import { createAuthMethod, verifyCredential } from '@/app/(auth)/lib/db/queries';

// Generate OTP Secret for a user
export async function generateOTPSecret(userId: string) {
  const otp = await createAuthMethod(userId, 'otp');
  const secret = otp.credential;

  return totp.generate(secret); // Generate the OTP code using the secret
}

// Verify OTP Token
export async function verifyOTPToken(userId: string, token: string) {
  const otp = await verifyCredential('otp', token);
  
  if (!otp || otp.userId !== userId ) {
    throw new Error("OTP secret not found for user.");
  }

  return totp.check(token, otp.credential);
}
