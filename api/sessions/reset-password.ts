import { NextApiRequest, NextApiResponse } from 'next';
import { validatePassword } from '@/lib/auth/validatePassword';
import { generateToken } from '@/lib/auth/generateToken';
import { verifyToken } from '@/lib/auth/verifyToken';
import { sendResetEmail } from '@/lib/email/sendResetEmail';
import { getUser, updateUserPassword } from '@/lib/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const [user] = await getUser(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = generateToken(32);
    await sendResetEmail(email, token);

    return res.status(200).json({ message: 'Password reset email sent' });
  }

  if (req.method === 'PUT') {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    const isValidToken = verifyToken(token);

    if (!isValidToken) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const [user] = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await validatePassword(newPassword);
    await updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({ message: 'Password reset successful' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
