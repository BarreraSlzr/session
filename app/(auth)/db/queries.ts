import { db, sql } from ".";
import { hash, genSalt, compare } from "bcrypt-ts";
import { TType } from "./types";


export async function createPassword(userId: string, rawPassword: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(rawPassword, salt);

  return await db
    .insertInto('AuthMethod')
    .values({
      userId,
      type: 'password',
      credential: hashedPassword,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updatePassword(userId: string, currentPassword: string, newPassword: string) {
  // Fetch the current password hash from the database
  const authMethod = await db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', 'password')
    .executeTakeFirst();

  if (!authMethod) {
    throw new Error("User does not have a password set.");
  }

  // Verify the current password
  const isPasswordValid = await compare(currentPassword, authMethod.credential);
  if (!isPasswordValid) {
    throw new Error("Current password is incorrect.");
  }

  // Generate a hash for the new password
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);

  // Update the password in the database
  return await db
    .updateTable('AuthMethod')
    .set({ credential: hashedPassword })
    .where('userId', '=', userId)
    .where('type', '=', 'password')
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function resetPassword(userId: string, token: string, newPassword: string) {
  // Verify the email token
  const isTokenValid = await verifyCredential("email", userId, token);
  if (!isTokenValid) {
    throw new Error("Invalid or expired email verification token.");
  }

  // Generate a hash for the new password
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);

  // Update the password in the database
  return await db
    .updateTable('AuthMethod')
    .set({ credential: hashedPassword })
    .where('userId', '=', userId)
    .where('type', '=', 'password')
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function verifyPassword(userId: string, rawPassword: string): Promise<boolean> {
  const authMethod = await db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', 'password')
    .executeTakeFirst();

  if (!authMethod) return false;

  return await compare(rawPassword, authMethod.credential);
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  const session = await db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('type', '=', 'session')
    .where('credential', '=', sessionToken)
    .executeTakeFirst();

  if (session && (!session.expiresAt || new Date(session.expiresAt) > new Date())) {
    return true;
  }
  return false;
}

export async function renewSession(sessionToken: string) {
  // Retrieve the existing session
  const session = await db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('type', '=', 'session')
    .where('credential', '=', sessionToken)
    .executeTakeFirst();

  if (!session) {
    throw new Error("Session not found or expired.");
  }

  // Delete the old session
  await db
    .deleteFrom('AuthMethod')
    .where('id', '=', session.id)
    .execute();

  // Create a new session for the same user
  const newSession = await db
    .insertInto('AuthMethod')
    .values({
      userId: session.userId,
      type: 'session',
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return newSession;
}

export async function createAuthMethod(userId: string, type: TType) {
  return await db
    .insertInto('AuthMethod')
    .values({
      userId,
      type,
      credential: sql`gen_random_uuid()`,  // or another method to generate credentials
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getAuthMethod(userId: string, type: TType) {
  return await db
    .selectFrom('AuthMethod')
    .select('credential')
    .where('userId', '=', userId)
    .where('type', '=', type)
    .executeTakeFirst();
}

export async function deleteUserAuthMethod(userId: string, type: TType) {
  return await db
    .deleteFrom('AuthMethod')
    .where('userId', '=', userId)
    .where('type', '=', type)
    .execute();
}

export async function deleteTokenAuthMethod(token: string, type: TType) {
  await db
    .deleteFrom('AuthMethod')
    .where('type', '=', type)
    .where('credential', '=', token)
    .execute();
}


export async function verifyCredential(
  type: TType,
  userId: string,
  credential: string
): Promise<boolean> {
  const authMethod = await db
    .selectFrom('AuthMethod')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', type)
    .where('credential', '=', credential)
    .executeTakeFirst();

  if (authMethod) {
    await db
      .updateTable('AuthMethod')
      .set({ verifiedAt: sql`now()` })
      .where('id', '=', authMethod.id)
      .execute();
    return true;
  }

  return false;
}

export async function getUser(email: string) {
  // Fetch the user from the User table by email
  const users = await db
    .selectFrom('User')
    .selectAll()
    .where('email', '=', email)
    .execute();

  // Return the users found (returns an array, even if only one user is found)
  return users;
}
