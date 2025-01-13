import { randomBytes } from 'crypto';
import { createClient } from 'redis';
import { generateChallenge, verifyAssertionResponse, verifyAttestationResponse } from '@simplewebauthn/server';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function generateWebAuthnChallenge(userId: string): Promise<string> {
  const challenge = generateChallenge();
  await redisClient.set(`webauthn:challenge:${userId}`, challenge, {
    EX: 60 * 5, // 5 minutes expiration
  });
  return challenge;
}

export async function verifyWebAuthnAttestation(userId: string, attestationResponse: any): Promise<boolean> {
  const challenge = await redisClient.get(`webauthn:challenge:${userId}`);
  if (!challenge) {
    return false;
  }

  const verification = await verifyAttestationResponse({
    credential: attestationResponse,
    expectedChallenge: challenge,
    expectedOrigin: process.env.WEBAUTHN_ORIGIN,
    expectedRPID: process.env.WEBAUTHN_RPID,
  });

  if (verification.verified) {
    await redisClient.set(`webauthn:credential:${userId}`, JSON.stringify(verification.authenticatorInfo), {
      EX: 60 * 60 * 24 * 365, // 1 year expiration
    });
    return true;
  }

  return false;
}

export async function verifyWebAuthnAssertion(userId: string, assertionResponse: any): Promise<boolean> {
  const challenge = await redisClient.get(`webauthn:challenge:${userId}`);
  if (!challenge) {
    return false;
  }

  const credential = await redisClient.get(`webauthn:credential:${userId}`);
  if (!credential) {
    return false;
  }

  const verification = await verifyAssertionResponse({
    credential: assertionResponse,
    expectedChallenge: challenge,
    expectedOrigin: process.env.WEBAUTHN_ORIGIN,
    expectedRPID: process.env.WEBAUTHN_RPID,
    authenticator: JSON.parse(credential),
  });

  return verification.verified;
}
