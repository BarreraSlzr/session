import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth/verifyToken';
import { getUserByToken, updateUserVerificationStatus } from '@/lib/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token' });
  }

  const isValidToken = verifyToken(token);

  if (!isValidToken) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await updateUserVerificationStatus(user.id, true);

  return res.status(200).json({ message: 'Email verified successfully' });
}
