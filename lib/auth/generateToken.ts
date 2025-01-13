import { generateRandomBytes } from '../randomBytes';

export function generateToken(length: number): string {
  return generateRandomBytes(length).toString('hex');
}
