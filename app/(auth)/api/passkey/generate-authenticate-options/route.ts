import { getUserIdFromSession } from "@/app/(auth)/lib/session";
import { createPasskey, getUser } from "@/app/(auth)/lib/db/queries";
import { generateAuthenticationOptions } from "@/app/(auth)/lib/passkey";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    const passkey = await createPasskey(userId);
    const options = generateAuthenticationOptions(passkey);

    return new Response(JSON.stringify(options), { status: 200 });
  } catch (error) {
    console.error("Error generating authentication options:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
