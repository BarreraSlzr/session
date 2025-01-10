'use server'

import { upsertContactSubmission } from '@/db/queries/contact'
import { ContactFormData } from '@/db/schema'

export async function submitContactForm(formData: FormData) {
  try {
    const data: ContactFormData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      company_name: formData.get('company_name') as string,
      email: formData.get('email') as string,
      project_start_date: formData.get('project_start_date') as string,
      budget: formData.get('budget') as string,
      project_scope: formData.get('project_scope') as string,
    }

    const result = await upsertContactSubmission(data)
    
    if (!result?.id) {
      return { error: 'Failed to submit form' }
    }

    return { success: true, id: result.id }
  } catch (error) {
    console.error(error)
    return { error: 'An unexpected error occurred' }
  }
}

