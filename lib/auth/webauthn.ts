import { verifyAssertionResponse, verifyAttestationResponse } from '@simplewebauthn/server';
import { db } from '../db/index';
import { generateRandomBytes } from '../randomBytes';

export async function generateWebAuthnChallenge(userId: string): Promise<string> {
  const challenge = (await generateRandomBytes(32)).toString('hex');
  await db.insertInto('WebAuthnChallenge').values({ userId, challenge }).execute();
  return challenge;
}

export async function verifyWebAuthnAttestation(userId: string, attestationResponse: any): Promise<boolean> {
  const challengeRecord = await db.selectFrom('WebAuthnChallenge').selectAll().where('userId', '=', userId).executeTakeFirst();
  if (!challengeRecord) {
    return false;
  }

  const verification = await verifyAttestationResponse({
    credential: attestationResponse,
    expectedChallenge: challengeRecord.challenge,
    expectedOrigin: process.env.WEBAUTHN_ORIGIN,
    expectedRPID: process.env.WEBAUTHN_RPID,
  });

  if (verification.verified) {
    await db.insertInto('WebAuthnCredential').values({ userId, credential: JSON.stringify(verification.authenticatorInfo) }).execute();
    return true;
  }

  return false;
}

export async function verifyWebAuthnAssertion(userId: string, assertionResponse: any): Promise<boolean> {
  const challengeRecord = await db.selectFrom('WebAuthnChallenge').selectAll().where('userId', '=', userId).executeTakeFirst();
  if (!challengeRecord) {
    return false;
  }

  const credentialRecord = await db.selectFrom('WebAuthnCredential').selectAll().where('userId', '=', userId).executeTakeFirst();
  if (!credentialRecord) {
    return false;
  }

  const verification = await verifyAssertionResponse({
    credential: assertionResponse,
    expectedChallenge: challengeRecord.challenge,
    expectedOrigin: process.env.WEBAUTHN_ORIGIN,
    expectedRPID: process.env.WEBAUTHN_RPID,
    authenticator: JSON.parse(credentialRecord.credential),
  });

  return verification.verified;
}
