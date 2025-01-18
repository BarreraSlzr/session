"use client";

import { Form } from "@/app/(auth)/components/auth-form";
import { useRegister } from "@/app/(auth)/hooks/useRegister";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/(auth)/components/submit-button";

export function RegisterForm() {
  const { registerAction, registerState } = useRegister();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === "register") {
      await registerAction(formData);
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
        <Input id="password" name="password" type="password" required />
      </div>
      <SubmitButton id="register" isLoading={registerState.status === "in_progress"}>
        Regístrate
      </SubmitButton>
    </Form>
  );
}
