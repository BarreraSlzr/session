import { renewSession } from "@/app/(auth)/lib/session";

export async function POST(req: Request) {
  try {
    const newSession = await renewSession();
    return new Response(JSON.stringify({ token: newSession.credential }), { status: 200 });
  } catch (error) {
    console.error("Error renewing session:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
