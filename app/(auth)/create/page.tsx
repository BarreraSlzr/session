import Link from 'next/link';
import { LoginForm } from '@/app/(auth)/components/form/LoginForm';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Inicia sesión</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Usa tu correo electrónico y contraseña para iniciar sesión
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
        {"¿No tienes una cuenta? "}
        <Link
          href="/register"
          className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
        >
          Regístrate
        </Link>
      </p>
    </>
  );
}
