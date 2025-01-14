import { serialize, SerializeOptions } from 'cookie';
import { validateSession as validateSessionDB, renewSession as renewSessionDB, createAuthMethod, deleteTokenAuthMethod } from '@/app/(auth)/db/queries';

export async function createSession(res: any, userId: string) {
  const session = await createAuthMethod(userId, 'session');

  setSessionCookie(res, session.credential);
  return session;
}

export async function validateSession(token: string) {
  return await validateSessionDB(token);
}

export async function renewSession(res: any, token: string) {
  const newSession = await renewSessionDB(token);

  setSessionCookie(res, newSession.credential);
  return newSession;
}

export async function deleteSession(res: any, token: string) {
  await deleteTokenAuthMethod(token, 'session');

  clearSessionCookie(res);
}

export const sessionTokenConfig: {name: string, options: SerializeOptions} = {
  name: 'session', // Cookie name for the session
  options: {
    httpOnly: true, // Make the cookie inaccessible to JavaScript (important for security)
    secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
    sameSite: 'lax', // CSRF protection
    domain: '.InternetFriends.xyz', // Adjust domain as necessary (make sure it matches your app domain)
    path: '/', // The cookie will be sent for requests to the root and any subpaths
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};


export function setSessionCookie(res: any, token: string) {
  const cookie = serialize(sessionTokenConfig.name, token, sessionTokenConfig.options);

  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res: any) {
  const cookie = serialize(sessionTokenConfig.name, '', sessionTokenConfig.options);

  res.setHeader('Set-Cookie', cookie);
}
