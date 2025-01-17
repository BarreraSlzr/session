import { validateSession } from "@/app/(auth)/lib/session";

export async function GET(req: Request) {
  try {
    const session = await validateSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session token" }), { status: 401 });
    }

    return new Response(JSON.stringify({ status: "valid", userId: session.userId }), { status: 200 });
  } catch (error) {
    console.error("Error validating session:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
