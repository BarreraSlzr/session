import { randomBytes } from 'crypto';

export function generateToken(length: number): string {
  return randomBytes(length).toString('hex');
}
