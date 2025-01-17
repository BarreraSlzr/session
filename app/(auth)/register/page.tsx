import Link from 'next/link';
import { Form } from '@/app/(auth)/components/auth-form';
import { useRegister } from '@/app/(auth)/hooks/useRegister';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { registerAction, registerState } = useRegister();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'register') {
      await registerAction(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Regístrate</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Crea una cuenta con tu correo electrónico y contraseña
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <SubmitButton id="register" isLoading={registerState.status === 'in_progress'}>
          Regístrate
        </SubmitButton>
        <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
          {'¿Ya tienes una cuenta? '}
          <Link
            href="/create"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Inicia sesión
          </Link>
        </p>
      </Form>
    </>
  );
}
