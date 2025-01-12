'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { login, register, type LoginActionState, type RegisterActionState } from '@/app/(auth)/actions'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { SubmitButton } from './submit-button'

type AuthFormProps = {
  type: 'login' | 'register'
  children?: React.ReactNode
  defaultEmail?: string
}

export function AuthForm({ type, children, defaultEmail = '' }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState(defaultEmail)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const [loginState, loginAction] = useActionState<LoginActionState, FormData>(login, {
    status: 'idle',
  })

  const [registerState, registerAction] = useActionState<RegisterActionState, FormData>(register, {
    status: 'idle',
  })

  useEffect(() => {
    if (type === 'login') {
      handleLoginState(loginState)
    } else {
      handleRegisterState(registerState)
    }
  }, [loginState, registerState, type])

  const handleLoginState = (state: LoginActionState) => {
    if (state.status === 'failed') {
      toast.error('Invalid credentials!')
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!')
    } else if (state.status === 'success') {
      setIsSuccessful(true)
      router.refresh()
    }
  }

  const handleRegisterState = (state: RegisterActionState) => {
    if (state.status === 'user_exists') {
      toast.error('Account already exists')
    } else if (state.status === 'failed') {
      toast.error('Failed to create account')
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!')
    } else if (state.status === 'success') {
      toast.success('Account created successfully')
      setIsSuccessful(true)
      router.refresh()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setEmail(formData.get('email') as string)

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
    if (submitter.id === 'login') {
      loginAction(formData)
    } else if (submitter.id === 'register') {
      registerAction(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Correo electrónico
        </Label>
        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="hola@internetfriends.xyz"
          autoComplete="email"
          required
          autoFocus
          defaultValue={email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          required
        />
      </div>
      <SubmitButton
        id={type}
        isSuccessful={isSuccessful}
      >
        {type === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </SubmitButton>
      {children}
    </form>
  )
}

