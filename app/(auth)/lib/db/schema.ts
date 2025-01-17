import { CompiledQuery } from "kysely";
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
    .addColumn('userId', 'uuid', (col) => col.notNull().references('user.id').onDelete('cascade'))
    .addColumn('type', 'varchar', (col) => col.notNull()
      .check(sql.raw(`type in ('session' , 'mfa' , 'passkey' , 'update-password' , 'validate-email' , 'reset-password')`)))
    .addColumn('credential', 'text', (col) => col.notNull()
      .defaultTo(sql.raw(`gen_random_uuid()`))) // Generated or hashed
    .addColumn('verifiedAt', 'timestamptz')
    .addColumn('expiresAt', 'timestamptz')
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql.raw(`now()`)).notNull())
    .execute();

  // Create trigger function
  await db.executeQuery(CompiledQuery.raw(`
    CREATE OR REPLACE FUNCTION set_expires_at()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.type IN ('session', 'mfa', 'passkey', 'email') THEN
        NEW.expiresAt := now() + interval '1 week';
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `));

  // Create trigger if not exists
  await db.executeQuery(CompiledQuery.raw(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_expires_at_trigger') THEN
        CREATE TRIGGER set_expires_at_trigger
        BEFORE INSERT ON auth_method
        FOR EACH ROW
        EXECUTE FUNCTION set_expires_at();
      END IF;
    END;
    $$;
  `));

  console.log('Database schema initialized.');
  return db;
}

