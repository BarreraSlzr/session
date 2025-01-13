import { randomBytes as cryptoRandomBytes } from 'crypto';

export function generateRandomBytes(length: number): Buffer {
  return cryptoRandomBytes(length);
}
