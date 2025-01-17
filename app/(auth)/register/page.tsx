import Link from 'next/link';
import { AuthForm } from '@/app/(auth)/components/auth-form';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Regístrate</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Crea una cuenta con tu correo electrónico y contraseña
        </p>
      </div>
      <AuthForm type='register'>
        <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
          {'¿Ya tienes una cuenta? '}
          <Link
            href="/create"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Inicia sesión
          </Link>
        </p>
      </AuthForm>
    </>
  );
}
