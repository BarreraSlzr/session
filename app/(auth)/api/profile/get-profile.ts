import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/app/(auth)/lib/db/queries';
import { validateSession } from '@/app/(auth)/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = req.cookies.session;

  if (!sessionToken || !(await validateSession(sessionToken))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await getUser(req.query.email as string);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({ user });
}
