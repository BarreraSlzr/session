import { getUserIdFromSession, renewSession } from "@/app/(auth)/lib/session";
import { getPasskeyChallenge, getUser } from "@/app/(auth)/lib/db/queries";
import { verifyRegistrationResponse } from "@/app/(auth)/lib/passkey";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = JSON.parse(formData.get("response") as string);

    const userId = await getUserIdFromSession();
    const passkey = await getPasskeyChallenge(userId);

    const verification = await verifyRegistrationResponse(response, passkey.credential);

    if (verification.verified) {
      await renewSession(userId);
      return new Response(JSON.stringify({ registrationInfo: verification.registrationInfo }), { status: 200 });
    }

    return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
  } catch (error) {
    console.error("Error verifying registration response:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
