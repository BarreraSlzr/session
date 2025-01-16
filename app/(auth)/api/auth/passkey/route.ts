import { NextResponse } from "next/server";
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
} from "@/app/(auth)/lib/webauthn";
import {
  createPasskey,
  getPasskeysByUserId,
  deletePasskeyById,
  updatePasskeyNameById,
  getExpectedChallenge,
} from "@/app/(auth)/db/queries";
import { cookies } from "next/headers";

interface WebAuthnChallengeValue {
  expectedChallenge: string;
  userId: string;
}

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);

  if (pathname === "/passkey/generate-register-options") {
    const { userId } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const options = generateRegistrationOptions();
    await createPasskey(userId, options.challenge);
    return NextResponse.json(options);
  }

  if (pathname === "/passkey/list-user-passkeys") {
    const { userId } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const passkeys = await getPasskeysByUserId(userId);
    return NextResponse.json(passkeys);
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
}

export async function POST(req: Request) {
  const { pathname } = new URL(req.url);
  const body = await req.json();

  if (pathname === "/passkey/generate-authenticate-options") {
    const { userId } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const options = generateAuthenticationOptions();
    await createPasskey(userId, options.challenge);
    return NextResponse.json(options);
  }

  if (pathname === "/passkey/verify-registration") {
    const { userId, expectedChallenge } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const verification = await verifyRegistrationResponse({
      ...body,
      expectedChallenge,
    });
    if (verification.verified) {
      await updatePasskeyNameById(userId, body.credentialID, body.name);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  if (pathname === "/passkey/verify-authentication") {
    const { userId, expectedChallenge } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const verification = await verifyAuthenticationResponse({
      ...body,
      expectedChallenge,
    });
    if (verification.verified) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  if (pathname === "/passkey/delete-passkey") {
    const { userId } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const { passkeyId } = body;
    await deletePasskeyById(userId, passkeyId);
    return NextResponse.json({ success: true });
  }

  if (pathname === "/passkey/update-passkey") {
    const { userId } = cookies().get("WebAuthnChallengeValue") as WebAuthnChallengeValue;
    const { passkeyId, name } = body;
    await updatePasskeyNameById(userId, passkeyId, name);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
}
