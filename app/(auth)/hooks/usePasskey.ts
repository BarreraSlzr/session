"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

export function usePasskey() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasskeyRequest = async (email: string, isRegistration: boolean = false) => {
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

      let webAuthnResponse;
      if (isRegistration) {
        webAuthnResponse = await startRegistration(options);
      } else {
        webAuthnResponse = await startAuthentication(options);
      }

      const formData = new FormData();
      formData.append('response', JSON.stringify(webAuthnResponse));

      const verifyResponse = await fetch(`/api/passkey/${isRegistration ? 'verify-registration' : 'verify-authentication'}`, {
        method: 'POST',
        body: formData,
      });

      if (!verifyResponse.ok) {
        throw new Error('Failed to verify response');
      }

      const result = await verifyResponse.json();

      if (result.status === 'success') {
        toast.success(`WebAuthn ${isRegistration ? 'registration' : 'login'} successful`)
        router.refresh()
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
