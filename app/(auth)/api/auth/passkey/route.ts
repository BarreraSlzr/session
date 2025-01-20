import { NextResponse } from "next/server";
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
} from "@/app/(auth)/lib/passkey";
import {
  createPasskey,
  getPasskeysByUserId,
  deletePasskeyById,
  updatePasskeyNameById,
  getPasskeyChallenge,
  getUser,
} from "@/app/(auth)/lib/db/queries";
import { getUserIdFromSession } from "@/app/(auth)/lib/session";
import { handleAuthMethodValidation } from "@/app/(auth)/lib/token";
import { setCookie, getCookie } from "@/app/(auth)/lib/cookies";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const userId = await getUserIdFromSession();

  if (pathname === "/passkey/generate-register-options") {
    const challenge = await createPasskey(userId);
    const user = await getUser(userId);
    const options = await generateRegistrationOptions(challenge.userId, user.email);
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
    const challenge = await createPasskey(userId);
    const options = await generateAuthenticationOptions(challenge.credential);
    return NextResponse.json(options);
  }

  if (pathname === "/passkey/verify-registration") {
    const passkey = await getPasskeyChallenge(userId);
    const verification = await verifyRegistrationResponse({
      ...body
    }, passkey.credential);
    if (verification.verified) {
      await updatePasskeyNameById(userId, body.credentialID, body.name);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  if (pathname === "/passkey/verify-authentication") {
    const passkey = await getPasskeyChallenge(userId);
    const verification = await verifyAuthenticationResponse({
      ...body
    }, passkey);
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
