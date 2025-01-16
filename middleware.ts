import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/login', '/register'],
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
