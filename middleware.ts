import { NextRequest, NextResponse } from 'next/server';
import { handleRedirect } from '@/app/(auth)/lib/redirect';
import { validateSession } from '@/app/(auth)/lib/session';
import { setCookie, clearCookie, getCookie } from '@/app/(auth)/lib/cookies';
import { getAuthMethodForReset, getAuthMethodForValidation } from './app/(auth)/lib/db/queries';
import { handleAuthMethodValidation, errorMessages } from "@/app/(auth)/lib/token";

export const config = {
  matcher: ['/', '/600x600.jpg', '/api/:path*', '/create', '/register', '/update', '/reset', '/validate'],
};

function handleError(error: Error, req: NextRequest) {
  const errorMessage = error.message as keyof typeof errorMessages;
  const errorTokenUrl = new URL('/token-error', req.url);
  const errorAuthUrl = new URL('/create', req.url);

  if (errorMessages[errorMessage]) {
    errorTokenUrl.searchParams.set('title', error.message);
    errorTokenUrl.searchParams.set('message', errorMessages[errorMessage] || 'An error occurred with the token.' );
    return NextResponse.redirect(errorTokenUrl);
  }

  if (!['/create', '/register', '/600x600.jpg'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(errorAuthUrl);
  }
}

export async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get('redirect');
  if (redirectUrl) {
    await setCookie('redirect', redirectUrl);
  }

  try {
    if (req.nextUrl.pathname === '/reset' || req.nextUrl.pathname === '/validate' || req.nextUrl.pathname === '/update') {
      const token = req.nextUrl.searchParams.get('token');
      if (!token) {
        throw new Error('Token is required');
      }
      const authMethod = await handleAuthMethodValidation(
        req.nextUrl.pathname === '/reset' 
        ? await getAuthMethodForReset(token)
        : await getAuthMethodForValidation(token)
      );
      await setCookie('token', authMethod.credential);
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
    return handleError(error as Error, req);
  }
}
