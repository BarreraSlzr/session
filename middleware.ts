import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/login', '/register'],
};

export async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    NextResponse.cookies.set('redirect', redirectUrl);
  }

  const sessionToken = req.cookies.get('session')?.value;
  if (!sessionToken || !(await validateSession(sessionToken))) {
    if (!['/login', '/register', '/600x600.jpg'].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    const redirectUrlFromCookie = req.cookies.get('redirect')?.value;
    if (redirectUrlFromCookie) {
      const validatedUrl = handleRedirect(redirectUrlFromCookie, '/');
      const response = NextResponse.redirect(validatedUrl);
      response.cookies.delete('redirect');
      return response;
    }
  }
  return NextResponse.next();
}
