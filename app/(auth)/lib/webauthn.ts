import {
  generateRegistrationOptions as simpleGenerateRegistrationOptions,
  generateAuthenticationOptions as simpleGenerateAuthenticationOptions,
  verifyRegistrationResponse as simpleVerifyRegistrationResponse,
  verifyAuthenticationResponse as simpleVerifyAuthenticationResponse,
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
  VerifyAuthenticationResponseOpts,
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

export function generateRegistrationOptions(userID: string, userName: string) {
  const WebAuthConfig: GenerateRegistrationOptionsOpts = {
    ...baseWebAuthConfig,
    userID: new Uint8Array(
      Buffer.from(userID, "base64"),
    ),
    userName,
  };
  return simpleGenerateRegistrationOptions(WebAuthConfig);
}

export function generateAuthenticationOptions(challenge: string) {
  return simpleGenerateAuthenticationOptions({ challenge, rpID: baseWebAuthConfig.rpID });
}

export function verifyRegistrationResponse(response: VerifyRegistrationResponseOpts['response'], challenge: string) {
  return simpleVerifyRegistrationResponse({ response, expectedChallenge: challenge, expectedOrigin: 'https://your-app-origin' });
}

export function verifyAuthenticationResponse(response: VerifyAuthenticationResponseOpts['response'], authmethod: AuthMethod) {
  return simpleVerifyAuthenticationResponse({
    response: response,
    expectedChallenge: authmethod.credential,
    expectedOrigin: origin,
    expectedRPID: baseWebAuthConfig.rpID,
    credential: {
      id: authmethod.id,
      publicKey: new Uint8Array(
        Buffer.from(authmethod.userId, "base64"),
      ),
      counter: 0,
    },
    requireUserVerification: false,
  });
}
