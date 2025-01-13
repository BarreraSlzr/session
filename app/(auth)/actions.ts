'use server';

import { z } from 'zod';

import { createUser, getUser, getUserByToken, updateUserPassword, createSession, validateSession, renewSession, deleteSession } from '@/lib/db/queries';
import { sendVerificationEmail } from '@/lib/email/sendVerificationEmail';
import { sendResetEmail } from '@/lib/email/sendResetEmail';
import { generateToken } from '@/lib/auth/generateToken';
import { verifyToken } from '@/lib/auth/verifyToken';
import { setSessionCookie } from '@/lib/cookies/setSessionCookie';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.email);

    if (!user) {
      return { status: 'failed' };
    }

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    const sessionToken = await createSession(user.id);
    setSessionCookie(res, sessionToken);

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: 'user_exists' } as RegisterActionState;
    }

    const newUser = await createUser(validatedData.email, validatedData.password);

    await sendVerificationEmail(validatedData.email, newUser.id);

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    const sessionToken = await createSession(newUser.id);
    setSessionCookie(res, sessionToken);

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const [user] = await getUser(email);
  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = await generateToken(32);
  await sendResetEmail(email, resetToken);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    throw new Error('Invalid or expired token');
  }

  const user = await getUserByToken(token);
  if (!user) {
    throw new Error('User not found');
  }

  await updateUserPassword(user.id, newPassword);
};
