
import { createPasskey, getUser } from "@/app/(auth)/lib/db/queries";
import { generateRegistrationOptions } from "@/app/(auth)/lib/passkey";
import { getUserIdFromSession } from "@/app/(auth)/lib/session";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    const user = await getUser(userId);
    const passkey = await createPasskey(userId);
    const options = generateRegistrationOptions(userId, user.email, passkey);

    return new Response(JSON.stringify(options), { status: 200 });
  } catch (error) {
    console.error("Error generating registration options:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
