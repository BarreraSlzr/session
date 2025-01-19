import { db, sql } from ".";
import { generateHashedPassword, isPasswordValid } from "@/app/(auth)/lib/password";
import { AuthMethod, TType } from "@/app/(auth)/lib/db/types";

const getAuthMethodByType = async (userId: string, type: TType) => {
  return db
    .selectFrom('auth_method')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', type)
    .executeTakeFirstOrThrow();
};

const getAuthMethodByCredential = async (type: TType, credential: string): Promise<AuthMethod | undefined> => {
  return db
    .selectFrom('auth_method')
    .selectAll()
    .where('type', '=', type)
    .where('credential', '=', credential)
    .executeTakeFirstOrThrow();
};

export const getAuthMethodForUpdate = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('set-password', token);
};

export const getAuthMethodForReset = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('reset-password', token);
};

export const getAuthMethodForValidation = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('validate-email', token);
};

const updateAuthMethod = async (userId: string, type: TType, credential: string) => {
  return db
    .updateTable('auth_method')
    .set({ credential })
    .where('userId', '=', userId)
    .where('type', '=', type)
    .returningAll()
    .executeTakeFirstOrThrow();
};

// CRUD Operations for User
export async function createUser(email: string) {
  return await db
    .insertInto('user')
    .values({ email })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getUser(email: string) {
  return db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirstOrThrow();
}

// Auth Method Operations
export async function createAuthMethod(userId: string, type: TType, credential?: string) {
  return db
    .insertInto('auth_method')
    .values({
      userId,
      type,
      credential: credential || sql`gen_random_uuid()`,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteAuthMethodByType(userId: string, type: TType) {
  return db
    .deleteFrom('auth_method')
    .where('userId', '=', userId)
    .where('type', '=', type)
    .execute();
}

export async function deleteAuthMethodByToken(token: string, type: TType) {
  return db
    .deleteFrom('auth_method')
    .where('type', '=', type)
    .where('credential', '=', token)
    .execute();
}

// Password Management
export async function createPassword(userId: string, rawPassword: string) {
  const hashedPassword = await generateHashedPassword(rawPassword);
  return createAuthMethod(userId, 'set-password', hashedPassword);
}

export async function updatePassword(userId: string, currentPassword: string, newPassword: string) {
  const isValid = validatePassword(userId, currentPassword);
  if (!isValid) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await generateHashedPassword(newPassword);
  return updateAuthMethod(userId, 'set-password', hashedPassword);
}

export async function resetPassword(token: string, newPassword: string) {
  const authMethod = await getAuthMethodByCredential('reset-password', token);
  if (!authMethod) {
    throw new Error("Invalid or expired token.");
  }

  const hashedPassword = await generateHashedPassword(newPassword);
  return updateAuthMethod(authMethod.userId, 'set-password', hashedPassword);
}

export async function validatePassword(userId: string, rawPassword: string): Promise<boolean> {
  const authMethod = await getAuthMethodByType(userId, 'set-password');

  if (!authMethod) return false;

  return isPasswordValid(rawPassword, authMethod.credential);
}

// Session Management
export async function createSession(userId: string) {
  return createAuthMethod(userId, 'session');
}

export async function renewSession(sessionToken: string) {
  const session = await getAuthMethodByCredential('session', sessionToken);

  if (!session) {
    throw new Error("Session not found or expired.");
  }

  await deleteAuthMethodByToken(sessionToken, 'session');
  return createSession(session.userId);
}

export async function validateSession(sessionToken: string) {
  const session = await getAuthMethodByCredential('session', sessionToken);

  if(!!session && !isExpired(session.expiresAt)){
    return session
  }
  return undefined
}

// Credential Verification
export async function verifyCredential(type: TType, credential: string) {
  const authMethod = await getAuthMethodByCredential(type, credential);

  if (authMethod) {
    await db
      .updateTable('auth_method')
      .set({ verifiedAt: sql`now()` })
      .where('id', '=', authMethod.id)
      .execute();
    return authMethod;
  }

  return undefined;
}

// WebAuthn Challenge and Passkey Management
export async function createPasskey(userId: string) {
  return createAuthMethod(userId, 'passkey');
}

export async function getPasskeyChallenge(userId: string) {
  return getAuthMethodByType(userId, 'passkey');
}

export async function getPasskeysByUserId(userId: string) {
  return db
    .selectFrom('auth_method')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', 'passkey')
    .execute();
}

export async function deletePasskeyById(userId: string, passkeyId: string) {
  return db
    .deleteFrom('auth_method')
    .where('userId', '=', userId)
    .where('id', '=', passkeyId)
    .execute();
}

export async function updatePasskeyNameById(userId: string, passkeyId: string, name: string) {
  return db
    .updateTable('auth_method')
    .set({ credential: name })
    .where('userId', '=', userId)
    .where('id', '=', passkeyId)
    .execute();
}

export function isExpired(date: Date | undefined): boolean {
  return !!date && new Date(date) < new Date();
}
