import { NextResponse } from "next/server";
import { generateWebAuthnChallenge } from "@/app/(auth)/lib/webauthn";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const challenge = await generateWebAuthnChallenge(email);

    if (!challenge) {
      return NextResponse.json(
        { error: "Error generating challenge" },
        { status: 400 }
      );
    }

    return NextResponse.json({ challenge });
  } catch (error) {
    console.error("Error generating WebAuthn challenge:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
