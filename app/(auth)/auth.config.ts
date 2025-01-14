import NextAuth, { type User, type Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUser, getAuthMethod, verifyPassword } from '@/app/(auth)/db/queries';  // Import verifyPassword
import { createSession, validateSession, renewSession, deleteSession, sessionTokenConfig } from '@/app/(auth)/lib/session';

interface ExtendedSession extends Session {
  user: User & {
    credential: string;  // Store credential in the session
  };
}

export const authConfig = {
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        // Fetch user information by email
        const users = await getUser(email);
        if (users.length === 0) return null;

        // Fetch the email-based credential (token) for MFA, WebAuthn, or email-based verification
        const authMethod = await getAuthMethod(email, 'email');  // 'email' as the auth method
        if (!authMethod) return null;  // If no email token exists, deny access

        // Verify the password using the custom verifyPassword function
        const passwordIsValid = await verifyPassword(users[0].id, password);
        if (!passwordIsValid) return null;

        // Now, create the session and return the user info along with the credential
        const session = {
          id: users[0].id,
          email: users[0].email,
          credential: authMethod.credential,  // Store the credential (e.g., token) in the session
        };
        return session;  // Return session object directly
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}:{ token: {id: string, email: string, credential: string}, user: {id: string, email: string, credential: string} }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.credential = user.credential;  // Store the credential in JWT token
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.credential = token.credential as string;  // Attach credential to session
      }

      return session;
    },
  },
  cookies: {
    sessionToken: sessionTokenConfig,
  },
};
