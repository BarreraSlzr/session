import { verifyAuthenticationResponse, VerifyAuthenticationResponseOpts, verifyRegistrationResponse, VerifyRegistrationResponseOpts } from '@simplewebauthn/server';
import { createAuthMethod, getAuthMethod, deleteUserAuthMethod } from '../db/queries';
import { db } from '../db';

// Generate and return a WebAuthn challenge for a user
export async function generateWebAuthnChallenge(userId: string): Promise<string> {
  const challenge = await createAuthMethod(userId, 'web-authn');
  return challenge.credential;  // The challenge is returned to the client
}

// Verify the WebAuthn registration (attestation) response from the client
export async function verifyWebAuthnAttestation(userId: string, attestationResponse: VerifyRegistrationResponseOpts['response']): Promise<boolean> {
  const authMethod = await getAuthMethod(userId, 'web-authn');
  if (!authMethod) {
    return false;
  }

  const verification = await verifyRegistrationResponse({
    response: attestationResponse,
    expectedChallenge: authMethod.credential,  // The challenge sent to the client during registration
    expectedOrigin: `${process.env.WEBAUTHN_ORIGIN}`,
    expectedRPID: `${process.env.WEBAUTHN_RPID}`,
  });

  if (verification.verified) {
    // After successful attestation, store the credential (public key) in the database
    await db
      .updateTable('AuthMethod')
      .set({ credential: JSON.stringify({
        credential: authMethod.credential,
        attestation: verification.registrationInfo}) })  // Store the credential (serialized)
      .where('userId', '=', userId)
      .where('type', '=', 'web-authn')
      .execute();
    
    return true;
  }

  return false;
}

// Verify the WebAuthn authentication (assertion) response from the client
export async function verifyWebAuthnAssertion(userId: string, assertionResponse: VerifyAuthenticationResponseOpts['response']): Promise<boolean> {
  const authMethod = await getAuthMethod(userId, 'web-authn');
  if (!authMethod) {
    return false;
  }

  const credentialRecord = JSON.parse(authMethod.credential);  // Deserialize the stored credential

  const verification = await verifyAuthenticationResponse({
    response: assertionResponse,
    expectedChallenge: JSON.parse(authMethod.credential)['credential'],  // The challenge sent to the client during authentication
    expectedOrigin: `${process.env.WEBAUTHN_ORIGIN}`,
    expectedRPID: `${process.env.WEBAUTHN_RPID}`,
    authenticator: credentialRecord,  // The stored credential from previous registration
  });

  return verification.verified;
}

// Delete WebAuthn credentials and challenge for a user
export async function deleteWebAuthn(userId: string) {
  await deleteUserAuthMethod(userId, 'web-authn');
}
