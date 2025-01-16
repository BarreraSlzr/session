import {
  generateRegistrationOptions as simpleGenerateRegistrationOptions,
  generateAuthenticationOptions as simpleGenerateAuthenticationOptions,
  verifyRegistrationResponse as simpleVerifyRegistrationResponse,
  verifyAuthenticationResponse as simpleVerifyAuthenticationResponse,
} from '@simplewebauthn/server';

export function generateRegistrationOptions() {
  return simpleGenerateRegistrationOptions({
    rpName: 'Your App Name',
    rpID: 'your-app-id',
    userID: 'user-id',
    userName: 'user-name',
    attestationType: 'direct',
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      requireResidentKey: false,
      userVerification: 'preferred',
    },
    timeout: 60000,
    excludeCredentials: [],
    extensions: {},
  });
}

export function generateAuthenticationOptions() {
  return simpleGenerateAuthenticationOptions({
    timeout: 60000,
    rpID: 'your-app-id',
    allowCredentials: [],
    userVerification: 'preferred',
    extensions: {},
  });
}

export function verifyRegistrationResponse(response) {
  return simpleVerifyRegistrationResponse({
    credential: response,
    expectedChallenge: 'expected-challenge',
    expectedOrigin: 'https://your-app.com',
    expectedRPID: 'your-app-id',
  });
}

export function verifyAuthenticationResponse(response) {
  return simpleVerifyAuthenticationResponse({
    credential: response,
    expectedChallenge: 'expected-challenge',
    expectedOrigin: 'https://your-app.com',
    expectedRPID: 'your-app-id',
    authenticator: {
      counter: 0,
      credentialPublicKey: 'public-key',
      credentialID: 'credential-id',
    },
  });
}
