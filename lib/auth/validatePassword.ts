import { compare } from 'bcrypt-ts';

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}
