import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function useWebAuthn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleWebAuthnLogin = async (email: string) => {
    setIsLoading(true)
    try {
      const publicKeyCredentialRequestOptions = await fetch('/api/auth/webauthn/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json())

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })

      const response = await fetch('/api/auth/webauthn/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assertion }),
      })

      if (response.ok) {
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

  return { handleWebAuthnLogin, isLoading }
}

