import { db, sql } from "..";
import { AuthMethod, AuthMethodType } from "../../types/database";

/**
 * Query utilities for the 'auth_method' table
 *
 * Provides functions to create, retrieve, update, and delete authentication methods for users.
 * All functions are type-safe and return typed results for use in authentication flows.
 */

/**
 * Retrieves an authentication method for a user by type.
 * @param userId - The user's unique identifier.
 * @param type - The authentication method type (e.g., 'session', 'passkey').
 * @returns The matching AuthMethod record if found, otherwise throws if not found.
 */
export const getAuthMethodByType = async (userId: string, type: AuthMethodType) => {
  return db
    .selectFrom('auth_method')
    .selectAll()
    .where('userId', '=', userId)
    .where('type', '=', type)
    .executeTakeFirstOrThrow();
};

/**
 * Retrieves an authentication method by type and credential value.
 * @param type - The authentication method type.
 * @param credential - The credential value (e.g., token, passkey).
 * @returns The matching AuthMethod record if found, otherwise throws if not found.
 */
export const getAuthMethodByCredential = async (type: AuthMethodType, credential: string): Promise<AuthMethod | undefined> => {
  return db
    .selectFrom('auth_method')
    .selectAll()
    .where('type', '=', type)
    .where('credential', '=', credential)
    .executeTakeFirstOrThrow();
};

/**
 * Retrieves an update-password AuthMethod by token.
 * @param token - The update-password token.
 * @returns The AuthMethod record if found, otherwise throws if not found.
 */
export const getAuthMethodForUpdate = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('update-password', token);
};

/**
 * Retrieves a reset-password AuthMethod by token.
 * @param token - The reset-password token.
 * @returns The AuthMethod record if found, otherwise throws if not found.
 */
export const getAuthMethodForReset = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('reset-password', token);
};

/**
 * Retrieves a validate-email AuthMethod by token.
 * @param token - The validate-email token.
 * @returns The AuthMethod record if found, otherwise throws if not found.
 */
export const getAuthMethodForValidation = async (token: string): Promise<AuthMethod | undefined> => {
  return await getAuthMethodByCredential('validate-email', token);
};

/**
 * Updates the credential value for a user's authentication method of a given type.
 * @param userId - The user's unique identifier.
 * @param type - The authentication method type.
 * @param credential - The new credential value.
 * @returns The updated AuthMethod record.
 */
export const updateAuthMethod = async (userId: string, type: AuthMethodType, credential: string) => {
  return db
    .updateTable('auth_method')
    .set({ credential })
    .where('userId', '=', userId)
    .where('type', '=', type)
    .returningAll()
    .executeTakeFirstOrThrow();
};

/**
 * Creates a new authentication method for a user.
 * @param userId - The user's unique identifier.
 * @param type - The authentication method type.
 * @param credential - Optional credential value (if not provided, a UUID is generated).
 * @returns The created AuthMethod record.
 */
export async function createAuthMethod(userId: string, type: AuthMethodType, credential?: string) {
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

/**
 * Deletes all authentication methods of a given type for a user.
 * @param userId - The user's unique identifier.
 * @param type - The authentication method type.
 * @returns The result of the delete operation.
 */
export async function deleteAuthMethodByType(userId: string, type: AuthMethodType) {
  return db
    .deleteFrom('auth_method')
    .where('userId', '=', userId)
    .where('type', '=', type)
    .execute();
}

/**
 * Deletes an authentication method by credential and type.
 * @param token - The credential value (e.g., token).
 * @param type - The authentication method type.
 * @returns The result of the delete operation.
 */
export async function deleteAuthMethodByToken(token: string, type: AuthMethodType) {
  return db
    .deleteFrom('auth_method')
    .where('type', '=', type)
    .where('credential', '=', token)
    .execute();
} 