import { db } from "..";

/**
 * Query utilities for the 'user' table
 *
 * Provides functions to create and retrieve user records in the database.
 * All functions are type-safe and return typed results for use in authentication flows.
 */

/**
 * Creates a new user in the database with the given email address.
 * @param email - The user's email address (must be unique).
 * @returns The created user record.
 */
export async function createUser(email: string) {
  return await db
    .insertInto('user')
    .values({ email })
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Retrieves a user by their email address.
 * @param email - The user's email address.
 * @returns The user record if found, otherwise throws if not found.
 */
export async function getUser(email: string) {
  return db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirstOrThrow();
} 