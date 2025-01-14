import { NextApiRequest, NextApiResponse } from 'next';
import { validatePassword } from '@/lib/auth/validatePassword';
import { getUser } from '@/lib/db/queries';
import { createSession, setSessionCookie } from '@/lib/auth/session';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await getUser(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isValidPassword = await validatePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const sessionToken = await createSession(user.id);

  setSessionCookie(res, sessionToken);

  return res.status(200).json({ message: 'Login successful' });
}
