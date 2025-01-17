"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import {
  login,
  register,
  type LoginActionState,
  type RegisterActionState,
} from "@/app/(auth)/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./submit-button"
import { useWebAuthn } from "../hooks/useWebAuthn"

type AuthFormProps = {
  type: "login" | "register"
  children?: React.ReactNode
}

export function AuthForm({ type, children }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""
  const { handleWebAuthnLogin } = useWebAuthn()

  const [loginState, loginAction] = useActionState<LoginActionState, FormData>(
    login,
    { status: "idle" }
  )

  const [registerState, registerAction] = useActionState<
    RegisterActionState,
    FormData
  >(register, { status: "idle" })

  const [webAuthnState, webAuthnAction] = useActionState<LoginActionState, FormData>(
    async (state: LoginActionState, formData: FormData) => {
      const email = formData.get("email") as string
      if (email) {
        const success = await handleWebAuthnLogin(email)
        return success ? { status: "success" } : { status: "failed" }
      } else {
        toast.error("Please enter your email for WebAuthn login")
        return { status: "invalid_data" }
      }
    },
    { status: "idle" }
  )

  useEffect(() => {
    if (type === "login") {
      handleLoginState(loginState)
    } else {
      handleRegisterState(registerState)
    }
  }, [loginState, registerState, type])

  const handleLoginState = (state: LoginActionState) => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!")
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!")
    } else if (state.status === "success") {
      router.refresh()
    }
  }

  const handleRegisterState = (state: RegisterActionState) => {
    if (state.status === "user_exists") {
      toast.error("Account already exists")
    } else if (state.status === "failed") {
      toast.error("Failed to create account")
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!")
    } else if (state.status === "success") {
      toast.success("Account created successfully")
      router.refresh()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    if (submitter.id === "login") {
      loginAction(formData);
    } else if (submitter.id === "register") {
      registerAction(formData);
    } else if (submitter.id === "webauthn-login") {
      webAuthnAction(formData);
    }
  };

  const commonFormFields: IFormField[] = [
    {
      name: "email",
      label: "Email",
      children: (
        <Input
          id="email"
          name="email"
          required
          defaultValue={emailParam}
        />
      ),
    },
    {
      name: "password",
      label: "Password",
      children: <Input id="password" name="password" type="password" />,
    },
  ]

  const actions: Record<"login" | "register", IAction[]> = {
    login: [
      {
        children: (
          <SubmitButton id="login" isLoading={loginState.status === "in_progress"}>
            Login
          </SubmitButton>
        ),
        handler: loginAction,
      },
      {
        children: (
          <SubmitButton id="webauthn-login" isLoading={webAuthnState.status === "in_progress"}>
            Login with WebAuthn
          </SubmitButton>
        ),
        handler: webAuthnAction,
      },
    ],
    register: [
      {
        children: (
          <SubmitButton id="register" isLoading={registerState.status === "in_progress"}>
            Register
          </SubmitButton>
        ),
        handler: registerAction,
      },
    ],
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-16">
      {commonFormFields.map(({ name, label, children }) => (
        <div key={name} className="flex flex-col gap-2">
          <Label htmlFor={name}>{label}</Label>
          {children}
        </div>
      ))}
      <div className="flex flex-col gap-2">
        {actions[type].map((action, index) => (
          <div key={index}>
              {action.children}
          </div>
        ))}
      </div>
      {children}
    </form>
  )
}

