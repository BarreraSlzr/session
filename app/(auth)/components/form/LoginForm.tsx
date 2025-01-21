"use client";

import { Form } from "@/app/(auth)/components/form";
import { useLogin } from "@/app/(auth)/hooks/useLogin";
import { usePasskey } from "@/app/(auth)/hooks/usePasskey";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/(auth)/components/submit-button";

export function LoginForm() {
  const { loginAction, loginState } = useLogin();
  const { handlePasskeyRequest, isLoading: webAuthnLoading } = usePasskey();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === "login") {
      await loginAction(formData);
    } else if (submitterId === "webauthn") {
      await handlePasskeyRequest(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <SubmitButton id="login" isLoading={loginState.status === "in_progress"}>
        Iniciar sesión
      </SubmitButton>
      <SubmitButton id="webauthn" isLoading={webAuthnLoading}>
        Iniciar sesión con Passkey
      </SubmitButton>
    </Form>
  );
}
