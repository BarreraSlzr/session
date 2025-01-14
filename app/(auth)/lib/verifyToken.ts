import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}