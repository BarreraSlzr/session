"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { verifyAuthentication, verifyRegistration } from '@/app/(auth)/actions'

export function usePasskey() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasskeyRequest = async (isRegistration: boolean = false) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/passkey/${isRegistration ? 'generate-register-options' : 'generate-authenticate-options'}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate options');
      }

      const options = await response.json();

      const webAuthnResponse = isRegistration 
        ? await startRegistration(options) 
        : await startAuthentication(options);

      const formData = new FormData();
      formData.append('response', JSON.stringify(webAuthnResponse));

      const result = isRegistration 
        ? await verifyRegistration(formData) 
        : await verifyAuthentication(formData);

      if (result.status === 'success') {
        toast.success(`WebAuthn ${isRegistration ? 'registration' : 'login'} successful`);
        router.refresh();
        return true
      } else {
        toast.error(`WebAuthn ${isRegistration ? 'registration' : 'login'} failed`)
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
