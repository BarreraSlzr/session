import { cookies } from "next/headers";
import {
  validateSession as validateSessionDB,
  renewSession as renewSessionDB,
  createAuthMethod,
  deleteAuthMethodByToken,
} from "@/app/(auth)/db/queries";

export async function createSession(userId: string) {
  const session = await createAuthMethod(userId, "session");
  await setSessionCookie(session.credential);
  return session;
}

export async function validateSession(token: string) {
  return await validateSessionDB(token);
}

export async function renewSession(token: string) {
  const newSession = await renewSessionDB(token);
  await setSessionCookie(newSession.credential);
  return newSession;
}

export async function deleteSession(token: string) {
  await deleteAuthMethodByToken(token, "session");
  await clearSessionCookie();
}

export async function getUserIdFromSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(sessionTokenConfig.name)?.value;
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

async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: sessionTokenConfig.name,
    value: token,
    ...sessionTokenConfig.options,
  });
}

async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: sessionTokenConfig.name,
    value: "",
    ...sessionTokenConfig.options,
    maxAge: 0,
  });
}
