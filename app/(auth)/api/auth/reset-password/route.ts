
import { resetPassword } from "@/app/(auth)/db/queries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const isReset = await resetPassword(token, newPassword);

    if (!isReset) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
