import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';
import { setCookie, clearCookie, getCookie } from '@/app/(auth)/lib/cookies';
import { getAuthMethodForReset, getAuthMethodForValidation, verifyCredential, isExpired } from './app/(auth)/lib/db/queries';

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/create', '/register', '/update', '/reset', '/validate'],
};

async function handleAuthMethodValidation(authMethod) {
  if (!authMethod) {
    throw new Error('Invalid token');
  }
  if (isExpired(authMethod.expiresAt)) {
    throw new Error('Token expired');
  }
  if (authMethod.verifiedAt) {
    throw new Error('Token already verified');
  }
  await verifyCredential(authMethod.type, authMethod.credential);
}

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
        await handleAuthMethodValidation(authMethod);
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
    const errorUrl = new URL('/token-error', req.url);
    if (error.message === 'Token expired') {
      errorUrl.searchParams.set('title', 'Token Error');
      errorUrl.searchParams.set('message', 'Your token has expired.');
    } else if (error.message === 'Token already verified') {
      errorUrl.searchParams.set('title', 'Token Error');
      errorUrl.searchParams.set('message', 'Your token has already been verified.');
    } else {
      errorUrl.searchParams.set('title', 'Token Error');
      errorUrl.searchParams.set('message', 'Invalid token.');
    }
    return NextResponse.redirect(errorUrl);
  }
}
