import { Generated, ColumnType, Insertable } from 'kysely'

export interface Database {
  contact_submissions: ContactSubmissionsTable
}

export interface ContactSubmissionsTable {
  id: Generated<string>
  first_name: string
  last_name: string
  company_name: string
  email: string
  project_start_date: string
  budget: string
  project_scope: string
  created_at: ColumnType<Date, never, never>
  updated_at: ColumnType<Date, never, string | undefined>
}

export type ContactFormData = Insertable<ContactSubmissionsTable>

