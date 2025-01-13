import { totp } from 'otplib';
import { db } from '../db/index';
import { generateRandomBytes } from '../randomBytes';

export async function generateMfaSecret(userId: string): Promise<string> {
  const secret = (await generateRandomBytes(20)).toString('hex');
  await db.insertInto('Mfa').values({ userId, secret }).execute();
  return secret;
}

export async function verifyMfaToken(userId: string, token: string): Promise<boolean> {
  const mfa = await db.selectFrom('Mfa').selectAll().where('userId', '=', userId).executeTakeFirst();
  if (!mfa) {
    return false;
  }
  return totp.check(token, mfa.secret);
}

export async function deleteMfaSecret(userId: string): Promise<void> {
  await db.deleteFrom('Mfa').where('userId', '=', userId).execute();
}
