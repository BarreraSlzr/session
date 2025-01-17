import { setCookie, clearCookie } from "@/app/(auth)/lib/cookies";
import {
  validateSession as validateSessionDB,
  renewSession as renewSessionDB,
  createAuthMethod,
  deleteAuthMethodByToken,
} from "@/app/(auth)/lib/db/queries";

export async function createSession(userId: string) {
  const session = await createAuthMethod(userId, "session");
  await setCookie(sessionTokenConfig.name, session.credential, sessionTokenConfig.options);
  return session;
}

export async function validateSession(token?: string) {
  const sessionToken = token || (await cookies()).get(sessionTokenConfig.name)?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }
  return await validateSessionDB(sessionToken);
}

export async function renewSession(token?: string) {
  const sessionToken = token || (await cookies()).get(sessionTokenConfig.name)?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }
  const newSession = await renewSessionDB(sessionToken);
  await setCookie(sessionTokenConfig.name, newSession.credential, sessionTokenConfig.options);
  return newSession;
}

export async function deleteSession(token?: string) {
  const sessionToken = token || (await cookies()).get(sessionTokenConfig.name)?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }
  await deleteAuthMethodByToken(sessionToken, "session");
  await clearCookie(sessionTokenConfig.name, sessionTokenConfig.options);
}

export async function getUserIdFromSession(token?: string) {
  const sessionToken = token || (await cookies()).get(sessionTokenConfig.name)?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }
  const session = await validateSessionDB(sessionToken);
  if (!session) {
    throw new Error("Invalid session token");
  }
  return session.userId;
}

export const sessionTokenConfig: { name: string; options: Object } = {
  name: 'session', // Cookie name for the session
  options: {
    httpOnly: true, // Make the cookie inaccessible to JavaScript (important for security)
    secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
    sameSite: 'lax', // CSRF protection
    domain: process.env.COOKIE_DOMAIN || '.internetfriends.xyz', // Use env for flexibility
    path: '/', // The cookie will be sent for requests to the root and any subpaths
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};
