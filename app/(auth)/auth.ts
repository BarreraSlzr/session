import { authConfig } from '@/app/(auth)/auth.config';
import NextAuth from 'next-auth/next';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig
});
