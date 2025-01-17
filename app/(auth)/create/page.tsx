"use client";

import Link from 'next/link';
import { Form } from '@/app/(auth)/components/auth-form';
import { useLogin } from '@/app/(auth)/hooks/useLogin';
import { usePasskey } from '@/app/(auth)/hooks/usePasskey';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { loginAction, loginState } = useLogin();
  const { handlePasskeyRequest: handlePasskeyRequest, isLoading: webAuthnLoading } = usePasskey();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'login') {
      await loginAction(formData);
    } else if (submitterId === 'webauthn') {
      const email = formData.get('email') as string;
      await handlePasskeyRequest(email);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Inicia sesión</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Usa tu correo electrónico y contraseña para iniciar sesión
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password"/>
        </div>
        <SubmitButton id="login" isLoading={loginState.status === 'in_progress'}>
          Iniciar sesión
        </SubmitButton>
        <SubmitButton id="webauthn" isLoading={webAuthnLoading}>
          Iniciar sesión con WebAuthn
        </SubmitButton>
        <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
          {"¿No tienes una cuenta? "}
          <Link
            href="/register"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Regístrate
          </Link>
        </p>
      </Form>
    </>
  );
}
