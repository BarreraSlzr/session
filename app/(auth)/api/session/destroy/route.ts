import { deleteSession } from "@/app/(auth)/lib/session";

export async function POST(req: Request) {
  try {
    await deleteSession();
    return new Response(JSON.stringify({ message: "Session destroyed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error destroying session:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
