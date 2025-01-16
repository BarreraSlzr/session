import { db, sql } from "./index";

export async function initializeDatabase() {
  // Create User table
  await db.schema
    .createTable('User')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql.raw(`gen_random_uuid()`)))
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql.raw(`now()`)).notNull())
    .execute();

  // Create AuthMethod table
  await db.schema
    .createTable('AuthMethod')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql.raw(`gen_random_uuid()`)))
    .addColumn('userId', 'uuid', (col) => col.references('User.id').onDelete('cascade').notNull())
    .addColumn('type', 'varchar', (col) => col.notNull().check(sql.raw(`type in ('session' , 'mfa' , 'web-authn' , 'password' , 'email' , 'reset-password')`))) // Enum: 'session', 'MFA', 'WebAuthn', 'password', 'email'
    .addColumn('credential', 'text', (col) => col.notNull().defaultTo(sql.raw(`gen_random_uuid()`))) // Generated or hashed
    .addColumn('verifiedAt', 'timestamptz')
    .addColumn(
      'expiresAt',
      'timestamptz',
      (col) =>
        col
          .defaultTo(sql.raw(`CASE 
                          WHEN type IN ('session', 'MFA', 'WebAuthn', 'email') THEN now() + interval '1 week'
                          ELSE NULL
                       END`))
    )
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql.raw(`now()`)).notNull())
    .execute();

  console.log('Database schema initialized.');
  return db;
}
