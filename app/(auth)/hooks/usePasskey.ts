"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { handlePasskeyAuth } from '@/app/(auth)/actions'

export function usePasskey() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasskeyRequest = async (email: string) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', email)
      const status = await handlePasskeyAuth(formData)

      if (status.status === 'success') {
        toast.success('WebAuthn login successful')
        router.refresh()
        return true
      } else if (status.status === 'failed') {
        toast.error('WebAuthn login failed')
        return false
      } else if (status.status === 'invalid_data') {
        toast.error('Invalid data provided')
        return false
      }
    } catch (error) {
      toast.error('WebAuthn login error')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { handlePasskeyRequest, isLoading }
}
