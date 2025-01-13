import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { db } from '../db/index';
import { verifyToken } from './verifyToken';
import { serialize } from 'cookie';

const randomBytesAsync = promisify(randomBytes);

export async function createSession(userId: string): Promise<string> {
  const sessionId = (await randomBytesAsync(16)).toString('hex');
  const sessionToken = (await randomBytesAsync(32)).toString('hex');

  await db.insertInto('Session').values({
    id: sessionId,
    userId,
    sessionToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 1 week expiration
  }).execute();

  return sessionToken;
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  const session = await db.selectFrom('Session').selectAll().where('sessionToken', '=', sessionToken).executeTakeFirst();
  if (session && new Date(session.expiresAt) > new Date()) {
    return true;
  }
  return false;
}

export async function renewSession(sessionToken: string): Promise<string | null> {
  const session = await db.selectFrom('Session').selectAll().where('sessionToken', '=', sessionToken).executeTakeFirst();
  if (session) {
    const newSessionToken = (await randomBytesAsync(32)).toString('hex');
    await db.updateTable('Session').set({
      sessionToken: newSessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 1 week expiration
    }).where('id', '=', session.id).execute();
    return newSessionToken;
  }
  return null;
}

export async function deleteSession(sessionToken: string): Promise<void> {
  await db.deleteFrom('Session').where('sessionToken', '=', sessionToken).execute();
}

export function setSessionCookie(res: any, token: string) {
  const cookie = serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    domain: '.InternetFriends.xyz',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res: any) {
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    domain: '.InternetFriends.xyz',
    path: '/',
    maxAge: -1, // Expire the cookie immediately
  });

  res.setHeader('Set-Cookie', cookie);
}
