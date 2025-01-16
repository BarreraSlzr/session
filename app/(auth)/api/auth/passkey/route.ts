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
import { getUserIdFromSession } from "@/app/(auth)/lib/session";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const userId = await getUserIdFromSession();

  if (pathname === "/passkey/generate-register-options") {
    const options = generateRegistrationOptions();
    await createPasskey(userId, options.challenge);
    return NextResponse.json(options);
  }

  if (pathname === "/passkey/list-user-passkeys") {
    const passkeys = await getPasskeysByUserId(userId);
    return NextResponse.json(passkeys);
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
}

export async function POST(req: Request) {
  const { pathname } = new URL(req.url);
  const body = await req.json();
  const userId = await getUserIdFromSession();

  if (pathname === "/passkey/generate-authenticate-options") {
    const options = generateAuthenticationOptions();
    await createPasskey(userId, options.challenge);
    return NextResponse.json(options);
  }

  if (pathname === "/passkey/verify-registration") {
    const expectedChallenge = await getExpectedChallenge(userId);
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
    const expectedChallenge = await getExpectedChallenge(userId);
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
    const { passkeyId } = body;
    await deletePasskeyById(userId, passkeyId);
    return NextResponse.json({ success: true });
  }

  if (pathname === "/passkey/update-passkey") {
    const { passkeyId, name } = body;
    await updatePasskeyNameById(userId, passkeyId, name);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
}
