import { serialize } from 'cookie';

export function setSessionCookie(res: any, token: string) {
  const cookie = serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    domain: '.domain.xyz',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  res.setHeader('Set-Cookie', cookie);
}
