import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';
import { setCookie, clearCookie, getCookie } from '@/app/(auth)/lib/cookies';
import { getAuthMethodByCredential } from '@/app/(auth)/lib/db/queries';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/create', '/register', '/update', '/reset', '/validate'],
};

export async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    await setCookie('redirect', redirectUrl);
  }

  try {
    if (['/reset', '/validate'].includes(req.nextUrl.pathname)) {
      const token = req.nextUrl.searchParams.get('token');
      if (token) {
        const authMethod = await getAuthMethodByCredential(req.nextUrl.pathname === '/reset' ? 'reset-password' : 'validate-email', token);
        if (!authMethod) {
          throw new Error('Invalid token');
        }
      } else {
        throw new Error('Token is required');
      }
    } else if (await validateSession()) {
      const redirectUrlFromCookie = await getCookie('redirect');
      if (redirectUrlFromCookie) {
        const validatedUrl = handleRedirect(redirectUrlFromCookie, '/');
        const response = NextResponse.redirect(validatedUrl);
        await clearCookie('redirect');
        return response;
      }
    }
    return NextResponse.next();
  } catch (error) {
    if (!['/create', '/register', '/600x600.jpg'].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/create', req.url));
    }
  }
}
