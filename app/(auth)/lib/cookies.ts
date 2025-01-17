import { cookies } from "next/headers";

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  domain: process.env.COOKIE_DOMAIN || '.internetfriends.xyz',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export async function setCookie(name: string, value: string, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    ...cookieConfig,
    ...options,
  });
}

export async function clearCookie(name: string, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value: "",
    ...cookieConfig,
    ...options,
    maxAge: 0,
  });
}
