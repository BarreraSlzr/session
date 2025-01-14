import Link from 'next/link';
import { AuthForm } from '@/app/(auth)/components/auth-form';
import Header from '@/app/(internetfriends)/components/header';
import { getRandomColors } from '@/app/(internetfriends)/lib/color-palette';
import NoiseFilter from '@/app/(internetfriends)/components/backgrounds/noise-filter-div';
import { BgGoo } from '@/app/(internetfriends)/components/backgrounds/gloo';

export default function Page() {
  const randomColors = getRandomColors();
  
  return (
    <main className='flex flex-col h-full'>
      <div className="relative grow flex items-start md:items-center justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-lg flex flex-col gap-12 bg-background mt-12 md:-mt-12 pb-12 z-10">
          <Header />
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
            <h3 className="text-xl font-semibold dark:text-zinc-50">Inicia sesión</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Usa tu correo electrónico y contraseña para iniciar sesión
            </p>
          </div>
          <AuthForm type='login'>
            <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
              {"¿No tienes una cuenta? "}
              <Link
                href="/register"
                className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              >
                Regístrate
              </Link>
            </p>
          </AuthForm>
        </div>
        <div className="absolute w-full h-full pointer-events-none z-0">
          <NoiseFilter className='mix-blend-hue' />
          <BgGoo
            speed={0.3}
            resolution={2.0}
            depth={2}
            seed={0.4}
            color1={randomColors[0]}
            color2={randomColors[1]}
            color3={randomColors[2]}
          />
        </div>
      </div>
    </main>
  );
}
