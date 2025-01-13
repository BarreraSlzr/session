import { serialize } from 'cookie';

export function clearSessionCookie(res: any) {
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    domain: '.domain.xyz',
    path: '/',
    maxAge: -1, // Expire the cookie immediately
  });

  res.setHeader('Set-Cookie', cookie);
}
