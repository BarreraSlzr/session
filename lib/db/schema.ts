import { db, sql } from ".";

export async function initializeDatabase() {
  
  // Ensure tables exist
  await db.schema
    .createTable('User')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`).notNull())
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('password', 'varchar')
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('Chat')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`).notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('visibility', 'varchar', (col) =>
      col.notNull().defaultTo('private').check(sql`visibility IN ('public', 'private')`)
    )
    .execute();

  await db.schema
    .createTable('Message')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`).notNull())
    .addColumn('chatId', 'uuid', (col) =>
      col.references('Chat.id').onDelete('cascade').notNull()
    )
    .addColumn('role', 'varchar', (col) => col.notNull())
    .addColumn('content', 'json', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('Vote')
    .ifNotExists()
    .addColumn('chatId', 'uuid', (col) =>
      col.references('Chat.id').onDelete('cascade').notNull()
    )
    .addColumn('messageId', 'uuid', (col) =>
      col.references('Message.id').onDelete('cascade').notNull()
    )
    .addColumn('isUpvoted', 'boolean', (col) => col.notNull())
    .addPrimaryKeyConstraint('Vote_pk', ['chatId', 'messageId'])
    .execute();

  await db.schema
    .createTable('Document')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.notNull().defaultTo(sql`gen_random_uuid()`))
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('content', 'text')
    .addColumn('kind', 'varchar', (col) =>
      col.notNull().defaultTo('text').check(sql`kind IN ('text', 'code')`)
    )
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addPrimaryKeyConstraint('Document_pk', ['id', 'createdAt'])
    .execute();

  await db.schema
    .createTable('Suggestion')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.notNull().defaultTo(sql`gen_random_uuid()`))
    .addColumn('documentId', 'uuid', (col) => col.notNull())
    .addColumn('documentCreatedAt', 'timestamp', (col) => col.notNull())
    .addColumn('originalText', 'text', (col) => col.notNull())
    .addColumn('suggestedText', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('isResolved', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .addPrimaryKeyConstraint('Suggestion_pk', ['id'])
    .addForeignKeyConstraint('Suggestion_fk_document', ['documentId', 'documentCreatedAt'], 'Document', [
      'id',
      'createdAt',
    ])
    .execute();

  await db.schema
    .createTable('Session')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`).notNull())
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('sessionToken', 'varchar', (col) => col.notNull())
    .addColumn('expiresAt', 'timestamptz', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('Mfa')
    .ifNotExists()
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('secret', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('WebAuthn')
    .ifNotExists()
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('credential', 'json', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('WebAuthnChallenge')
    .ifNotExists()
    .addColumn('userId', 'uuid', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('challenge', 'varchar', (col) => col.notNull())
    .execute();
    
  console.log('Database schema initialized.');
  return db;
}
