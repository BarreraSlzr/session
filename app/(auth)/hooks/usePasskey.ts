"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { handlePasskeyAuth, handlePasskeyRegistration } from '@/app/(auth)/actions'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

export function usePasskey() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasskeyRequest = async (email: string, isRegistration: boolean = false) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', email)

      let response
      if (isRegistration) {
        response = await startRegistration()
      } else {
        response = await startAuthentication()
      }

      formData.append('response', JSON.stringify(response))

      const status = isRegistration ? await handlePasskeyRegistration({ status: 'idle' }, formData) : await handlePasskeyAuth({ status: 'idle' }, formData)

      if (status.status === 'success') {
        toast.success(`WebAuthn ${isRegistration ? 'registration' : 'login'} successful`)
        router.refresh()
        return true
      } else if (status.status === 'failed') {
        toast.error(`WebAuthn ${isRegistration ? 'registration' : 'login'} failed`)
        return false
      } else if (status.status === 'invalid_data') {
        toast.error('Invalid data provided')
        return false
      }
    } catch (error) {
      toast.error(`WebAuthn ${isRegistration ? 'registration' : 'login'} error`)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { handlePasskeyRequest, isLoading }
}
