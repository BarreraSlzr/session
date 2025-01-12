import { sql } from 'kysely';
import { db } from '../connection';

export async function createContactSubmissionsTable() {
    try {
        await db.schema
            .createTable('contact_submissions')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey())
            .addColumn('first_name', 'text', (col) => col.notNull())
            .addColumn('last_name', 'text', (col) => col.notNull())
            .addColumn('company_name', 'text', (col) => col.notNull())
            .addColumn('email', 'text', (col) => col.notNull())
            .addColumn('project_start_date', 'text', (col) => col.notNull())
            .addColumn('budget', 'text', (col) => col.notNull())
            .addColumn('project_scope', 'text', (col) => col.notNull())
            .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
            .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
            .execute();

        console.log('Table "contact_submissions" is ready');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}