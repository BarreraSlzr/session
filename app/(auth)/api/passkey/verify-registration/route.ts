import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { getUserIdFromSession, renewSession } from "@/app/(auth)/lib/session";
import { getUser } from "@/app/(auth)/lib/db/queries";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = JSON.parse(formData.get("response") as string);

    const userId = await getUserIdFromSession();
    const user = await getUser(userId);

    const verification = await verifyRegistrationResponse(response, user.email);

    if (verification.verified) {
      await renewSession(userId);
      return new Response(JSON.stringify({ passkey: verification.passkey }), { status: 200 });
    }

    return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
  } catch (error) {
    console.error("Error verifying registration response:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
