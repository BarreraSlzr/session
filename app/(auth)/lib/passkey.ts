import {
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
  VerifyAuthenticationResponseOpts,
  verifyRegistrationResponse as verifyRegistrationResponseServer,
  verifyAuthenticationResponse as verifyAuthenticationResponseServer,
  generateAuthenticationOptions as generateAuthenticationOptionsServer,
  generateRegistrationOptions as generateRegistrationOptionsServer
} from '@simplewebauthn/server';
import { AuthMethod } from './db/types';

const baseWebAuthConfig: Omit<GenerateRegistrationOptionsOpts, 'userID' | 'userName'> = {
  rpName: 'Internet Friends Accounts',
  rpID: 'internetfriends.com',
  attestationType: 'none',
  authenticatorSelection: {
    authenticatorAttachment: 'platform',
    requireResidentKey: false,
    userVerification: 'preferred',
  },
  timeout: 60000,
};

export function verifyRegistrationResponse(
  response: VerifyRegistrationResponseOpts['response'], expectedChallenge: string) {
  const opts: VerifyRegistrationResponseOpts = {
    ...baseWebAuthConfig,
    response,
    expectedChallenge,
    expectedOrigin: baseWebAuthConfig.rpID,
  };

  // Call the actual verification function from @simplewebauthn/server
  return verifyRegistrationResponseServer(opts);
}

export function verifyAuthenticationResponse(response: VerifyAuthenticationResponseOpts['response'], expectedChallenge: string) {
  const opts: VerifyAuthenticationResponseOpts = {
    ...baseWebAuthConfig,
    response,
    expectedOrigin: baseWebAuthConfig.rpID,
    expectedRPID: baseWebAuthConfig.rpID,
    credential: {
      id: expectedChallenge,
      transports: ['internal'],
      publicKey: Uint8Array.from(expectedChallenge, c => c.charCodeAt(0)),
      counter: 0
    },
    expectedChallenge: expectedChallenge
  };

  // Call the actual verification function from @simplewebauthn/server
  return verifyAuthenticationResponseServer(opts);
}

export function generateAuthenticationOptions(passkey: AuthMethod) {
  return generateAuthenticationOptionsServer({
    ...baseWebAuthConfig,
    challenge: passkey.credential
  });
}

export function generateRegistrationOptions (userId: string, userName: string, passkey: AuthMethod) {
  return generateRegistrationOptionsServer({
    ...baseWebAuthConfig,
    userID: Uint8Array.from(userId, c => c.charCodeAt(0)),
    userName: userName,
    challenge: passkey.credential
  });
}
