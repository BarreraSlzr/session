import {
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
  VerifyAuthenticationResponseOpts,
  verifyRegistrationResponse as verifyRegistrationResponseServer,
  verifyAuthenticationResponse as verifyAuthenticationResponseServer,
} from '@simplewebauthn/server';
import { AuthMethod } from '@/app/(auth)/lib/db/types';

const baseWebAuthConfig: Omit<GenerateRegistrationOptionsOpts, 'userID' | 'userName'> = {
  rpName: 'Your App Name',
  rpID: 'your-app-id',
  attestationType: 'direct',
  authenticatorSelection: {
    authenticatorAttachment: 'platform',
    requireResidentKey: false,
    userVerification: 'preferred',
  },
  timeout: 60000,
};

export function generateRegistrationOptions(userId: string, userName: string) {
  return {
    ...baseWebAuthConfig,
    userID: userId,
    userName: userName,
  };
}

export function verifyRegistrationResponse(response: any, challenge: string) {
  const opts: VerifyRegistrationResponseOpts = {
    credential: response,
    expectedChallenge: challenge,
    expectedOrigin: 'https://your-app.com',
    expectedRPID: 'your-app-id',
  };

  // Call the actual verification function from @simplewebauthn/server
  return verifyRegistrationResponseServer(opts);
}

export function verifyAuthenticationResponse(response: any, authMethod: AuthMethod) {
  const opts: VerifyAuthenticationResponseOpts = {
    credential: response,
    expectedChallenge: authMethod.credential,
    expectedOrigin: 'https://your-app.com',
    expectedRPID: 'your-app-id',
  };

  // Call the actual verification function from @simplewebauthn/server
  return verifyAuthenticationResponseServer(opts);
}
