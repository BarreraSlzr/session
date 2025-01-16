import { ContactFormData } from '@/app/(internetfriends)/lib/db/schema'
import { db } from '@/app/(internetfriends)/lib/db/connection'

export async function upsertContactSubmission(data: ContactFormData, id?: string) {
  if (id) {
    return await db
      .updateTable('contact_submissions')
      .set({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returning(['id'])
      .executeTakeFirst()
  }

  return await db
    .insertInto('contact_submissions')
    .values(data)
    .returning(['id'])
    .executeTakeFirst()
}

export async function getContactSubmission(id: string) {
  return await db
    .selectFrom('contact_submissions')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
}

