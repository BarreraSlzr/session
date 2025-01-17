import { db, sql } from "./index";

export async function initializeDatabase() {
  // Create User table
  await db.schema
    .createTable('user')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey()
      .defaultTo(sql.raw(`gen_random_uuid()`)))
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql.raw(`now()`)).notNull())
    .execute();

  await db.schema
    .createTable('auth_method')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey()
      .defaultTo(sql.raw(`gen_random_uuid()`)))
    .addColumn('userId', 'uuid', (col) => col.references('user.id').onDelete('cascade').notNull())
    .addColumn('type', 'varchar', (col) => col.notNull()
      .check(sql.raw(`type in ('session' , 'mfa' , 'passkey' , 'password' , 'email' , 'reset-password')`)))
    .addColumn('credential', 'text', (col) => col.notNull()
      .defaultTo(sql.raw(`gen_random_uuid()`))) // Generated or hashed
    .addColumn('verifiedAt', 'timestamptz')
    .addColumn('expiresAt', 'timestamptz', (col) => col.defaultTo(sql.raw(
          `CASE 
            WHEN type IN ('session', 'mfa', 'passkey', 'email') THEN now() + interval '1 week'
            ELSE NULL
          END`
    )))
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql.raw(`now()`)).notNull())
    .execute();

  console.log('Database schema initialized.');
  return db;
}
