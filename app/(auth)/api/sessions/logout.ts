import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSession } from '@/app/(auth)/db/queries';
import { clearSessionCookie } from '@/lib/cookies/clearSessionCookie';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(400).json({ message: 'No session token found' });
  }

  await deleteSession(sessionToken);

  clearSessionCookie(res);

  return res.status(200).json({ message: 'Logout successful' });
}
