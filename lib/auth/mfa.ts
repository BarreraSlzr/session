import { randomBytes } from 'crypto';
import { totp } from 'otplib';
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function generateMfaSecret(userId: string): Promise<string> {
  const secret = randomBytes(20).toString('hex');
  await redisClient.set(`mfa:${userId}`, secret, {
    EX: 60 * 60 * 24 * 7, // 1 week expiration
  });
  return secret;
}

export async function verifyMfaToken(userId: string, token: string): Promise<boolean> {
  const secret = await redisClient.get(`mfa:${userId}`);
  if (!secret) {
    return false;
  }
  return totp.check(token, secret);
}

export async function deleteMfaSecret(userId: string): Promise<void> {
  await redisClient.del(`mfa:${userId}`);
}
