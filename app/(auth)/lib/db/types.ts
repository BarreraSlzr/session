import { Generated, ColumnType, Selectable } from "kysely";

interface BaseTable {
  id: Generated<string>;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface UserTable extends BaseTable {
  email: string;
}

export type TType = 'session' | 'otp' | 'passkey' | 'set-password' | 'validate-email' | 'reset-password'
export interface AuthMethodTable extends BaseTable {
  userId: string; // UUID
  type: TType; // Enum for auth methods
  credential: Generated<string>; // Auto-generated token (or hashed for passwords)
  verifiedAt?: Date; // Nullable until the credential is verified
  expiresAt?: Date; // Nullable for password method without expiration
}

export type User = Selectable<UserTable>;
export type AuthMethod = Selectable<AuthMethodTable>;

export interface Database {
  user: UserTable;
  auth_method: AuthMethodTable;
}
