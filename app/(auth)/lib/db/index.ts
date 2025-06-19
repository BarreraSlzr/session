import { createKysely } from '@vercel/postgres-kysely'
import { Database } from '../types'

export const db = createKysely<Database>()
export { sql } from 'kysely'

/**
 * Initialize the database schema by creating tables and triggers
 * @returns Promise that resolves to the database instance
 */
export { initializeDatabase } from './initialize';