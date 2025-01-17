import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/login', '/register'],
};

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('session')?.value;
  if (!sessionToken || !(await validateSession(sessionToken))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    const validatedUrl = handleRedirect(redirectUrl, '/');
    return NextResponse.redirect(validatedUrl);
  }

  return NextResponse.next();
}
