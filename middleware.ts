import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';
import { setCookie, clearCookie, getCookie } from '@/app/(auth)/lib/cookies';
import { getAuthMethodForReset, getAuthMethodForValidation, verifyCredential, isTokenExpired } from './app/(auth)/lib/db/queries';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/create', '/register', '/update', '/reset', '/validate'],
};

export async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    await setCookie('redirect', redirectUrl);
  }

  try {
    if (req.nextUrl.pathname === '/reset' || req.nextUrl.pathname === '/validate') {
      const token = req.nextUrl.searchParams.get('token');
      if (token) {
        const authMethod = req.nextUrl.pathname === '/reset' 
          ? await getAuthMethodForReset(token) 
          : await getAuthMethodForValidation(token);
        if (!authMethod) {
          throw new Error('Invalid token');
        }
        if (isTokenExpired(authMethod.expiresAt)) {
          return NextResponse.redirect(new URL(`/token-error?title=${encodeURIComponent('Token Error')}&message=${encodeURIComponent('The token has expired.')}`, req.url));
        }
        if (req.nextUrl.pathname === '/validate' && !authMethod.verifiedAt) {
          await verifyCredential('validate-email', token);
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
