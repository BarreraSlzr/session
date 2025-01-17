import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';
import { setCookie, clearCookie } from '@/app/(auth)/lib/cookies';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/login', '/register'],
};

export async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    await setCookie('redirect', redirectUrl);
  }

  const sessionToken = (await cookies()).get('session')?.value;
  if (!sessionToken || !(await validateSession(sessionToken))) {
    if (!['/login', '/register', '/600x600.jpg'].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    const redirectUrlFromCookie = (await cookies()).get('redirect')?.value;
    if (redirectUrlFromCookie) {
      const validatedUrl = handleRedirect(redirectUrlFromCookie, '/');
      const response = NextResponse.redirect(validatedUrl);
      await clearCookie('redirect');
      return response;
    }
  }
  return NextResponse.next();
}
