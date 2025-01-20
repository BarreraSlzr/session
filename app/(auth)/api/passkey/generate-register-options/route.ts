import { generateRegistrationOptions } from "@simplewebauthn/server";
import { getUserIdFromSession, getUser } from "@/app/(auth)/lib/session";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    const user = await getUser(userId);

    const options = generateRegistrationOptions({
      rpName: "Your App Name",
      rpID: "your-app-id",
      userID: userId,
      userName: user.email,
      attestationType: "direct",
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: false,
        userVerification: "preferred",
      },
      timeout: 60000,
    });

    return new Response(JSON.stringify(options), { status: 200 });
  } catch (error) {
    console.error("Error generating registration options:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
