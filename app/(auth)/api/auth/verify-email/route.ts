import { verifyCredential } from "@/app/(auth)/db/queries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyCredential('email', token);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Email verified" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}