import { validateSession } from "@/app/(auth)/lib/session";
import { handleRouteError, createError } from "@/app/(auth)/lib/errors";

export async function GET(req: Request) {
  try {
    const session = await validateSession();

    if (!session) {
      throw createError.session.tokenInvalid();
    }

    return new Response(JSON.stringify({ status: "valid", userId: session.userId }), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
