"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function usePasskey() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasskeyRequest = async (email: string) => {
    setIsLoading(true)
    try {
      const credentialRequestOptions = await fetch('/api/auth/passkey/...', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json())

      const assertion = await navigator.credentials.get({
        publicKey: credentialRequestOptions,
      })

      const verifyResponse = await fetch('/api/auth/passkey/...', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assertion }),
      })

      if (verifyResponse.ok) {
        toast.success('WebAuthn login successful')
        router.refresh()
        return true
      } else {
        toast.error('WebAuthn login failed')
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

