import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { getUserIdFromSession, renewSession } from "@/app/(auth)/lib/session";
import { getPasskeyChallenge } from "@/app/(auth)/lib/db/queries";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = JSON.parse(formData.get("response") as string);

    const userId = await getUserIdFromSession();
    const passkey = await getPasskeyChallenge(userId);

    const verification = await verifyAuthenticationResponse(response, passkey);

    if (verification.verified) {
      await renewSession(userId);
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    }

    return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
  } catch (error) {
    console.error("Error verifying authentication response:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
