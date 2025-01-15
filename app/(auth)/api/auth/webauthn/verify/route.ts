import { NextResponse } from "next/server";
import { verifyWebAuthnAssertion } from "@/app/(auth)/lib/webauthn";

export async function POST(req: Request) {
  try {
    const { assertion } = await req.json();

    if (!assertion) {
      return NextResponse.json({ error: "Assertion is required" }, { status: 400 });
    }

    const isValid = await verifyWebAuthnAssertion(assertion);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or failed assertion" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Authentication successful" });
  } catch (error) {
    console.error("Error verifying WebAuthn assertion:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
