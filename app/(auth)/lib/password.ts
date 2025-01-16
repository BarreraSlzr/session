import { compare, genSalt, hash } from "bcrypt-ts";

export const generateHashedPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export const isPasswordValid = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
  return compare(rawPassword, hashedPassword);
};