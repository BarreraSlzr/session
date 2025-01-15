import { generateAuthenticationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialRequestOptionsJSON, AuthenticatorAssertionResponseJSON } from '@simplewebauthn/types';
import { getUser, createAuthMethod, verifyCredential } from '../db/queries';

export async function generateWebAuthnChallenge(userId: string): Promise<PublicKeyCredentialRequestOptionsJSON | null> {
  const user = await getUser(userId);
  if (!user) {
    return null;
  }

  const authMethod = await createAuthMethod(userId, 'web-authn');
  const credential = authMethod.credential;

  const options = generateAuthenticationOptions({
    allowCredentials: [{ id: credential, type: 'public-key' }],
  });

  return options;
}

export async function verifyWebAuthnAssertion(assertion: AuthenticatorAssertionResponseJSON): Promise<boolean> {
  const { id, rawId, response, type } = assertion;
  const credential = await verifyCredential('web-authn', id);

  if (!credential) {
    return false;
  }

  const expectedChallenge = credential.credential;

  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge
  });

  return verification.verified;
}
