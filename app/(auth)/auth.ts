import { authConfig } from '@/app/(auth)/auth.config';
import NextAuth, { type User, type Session } from 'next-auth';

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig
});
