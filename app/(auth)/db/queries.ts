import { db, sql } from ".";
import { generateHashedPassword, isPasswordValid } from "../lib/password";
import { AuthMethod, TType } from "./types";

const getAuthMethodByType = async (userId: string, type: TType) => {
  return db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', type)
    .executeTakeFirst();
};

const getAuthMethodByCredential = async (type: TType, credential: string): Promise<AuthMethod | undefined> => {
  return db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('type', '=', type)
    .where('credential', '=', credential)
    .executeTakeFirst();
};

const updateAuthMethod = async (userId: string, type: TType, credential: string) => {
  return db
    .updateTable('AuthMethod')
    .set({ credential })
    .where('userId', '=', userId)
    .where('type', '=', type)
    .returningAll()
    .executeTakeFirstOrThrow();
};

// CRUD Operations for User
export async function createUser(email: string) {
  return await db
    .insertInto('User')
    .values({ email })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getUser(email: string) {
  return db
    .selectFrom('User')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
}

// Auth Method Operations
export async function createAuthMethod(userId: string, type: TType, credential?: string) {
  return db
    .insertInto('AuthMethod')
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
    .deleteFrom('AuthMethod')
    .where('userId', '=', userId)
    .where('type', '=', type)
    .execute();
}

export async function deleteAuthMethodByToken(token: string, type: TType) {
  return db
    .deleteFrom('AuthMethod')
    .where('type', '=', type)
    .where('credential', '=', token)
    .execute();
}

// Password Management
export async function createPassword(userId: string, rawPassword: string) {
  const hashedPassword = await generateHashedPassword(rawPassword);
  return createAuthMethod(userId, 'password', hashedPassword);
}

export async function updatePassword(userId: string, currentPassword: string, newPassword: string) {
  const authMethod = await getAuthMethodByType(userId, 'password');

  if (!authMethod) {
    throw new Error("User does not have a password set.");
  }

  const isValid = await isPasswordValid(currentPassword, authMethod.credential);
  if (!isValid) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await generateHashedPassword(newPassword);
  return updateAuthMethod(userId, 'password', hashedPassword);
}

export async function resetPassword(token: string, newPassword: string) {
  const authMethod = await getAuthMethodByCredential('reset-password', token);
  if (!authMethod) {
    throw new Error("Invalid or expired token.");
  }

  const hashedPassword = await generateHashedPassword(newPassword);
  return updateAuthMethod(authMethod.userId, 'password', hashedPassword);
}

export async function verifyPassword(userId: string, rawPassword: string): Promise<boolean> {
  const authMethod = await getAuthMethodByType(userId, 'password');

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

export async function validateSession(sessionToken: string): Promise<boolean> {
  const session = await getAuthMethodByCredential('session', sessionToken);

  return !!session && (!session.expiresAt || new Date(session.expiresAt) > new Date());
}

// Credential Verification
export async function verifyCredential(type: TType, credential: string) {
  const authMethod = await getAuthMethodByCredential(type, credential);

  if (authMethod) {
    await db
      .updateTable('AuthMethod')
      .set({ verifiedAt: sql`now()` })
      .where('id', '=', authMethod.id)
      .execute();
    return authMethod;
  }

  return undefined;
}
