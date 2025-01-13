import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from '@/app/(auth)/auth.config';
import { handleRedirect } from '@/lib/redirect';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};

export function middleware(req: NextRequest) {
  const csrfToken = req.headers.get('csrf-token');
  if (!csrfToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    const validatedUrl = handleRedirect(redirectUrl, '/');
    return NextResponse.redirect(validatedUrl);
  }

  return NextResponse.next();
}
