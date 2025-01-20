import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { getUserIdFromSession, getUser } from "@/app/(auth)/lib/session";
import { createPasskey } from "@/app/(auth)/lib/db/queries";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    const user = await getUser(userId);

    // Create a passkey for the user
    const passkey = await createPasskey(userId);

    const options = generateAuthenticationOptions({
      rpID: "your-app-id",
      userVerification: "preferred",
      timeout: 60000,
      allowCredentials: [
        {
          id: passkey.credential,
          type: "public-key",
          transports: ["usb", "ble", "nfc"],
        },
      ],
    });

    return new Response(JSON.stringify(options), { status: 200 });
  } catch (error) {
    console.error("Error generating authentication options:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
