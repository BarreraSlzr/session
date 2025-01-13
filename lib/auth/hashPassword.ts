import { hash, genSalt } from 'bcrypt-ts';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return await hash(password, salt);
}
