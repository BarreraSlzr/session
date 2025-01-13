import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import Header from '@/app/(internetfriends)/components/header';
import NoiseFilter from '@/app/(internetfriends)/components/backgrounds/noise-filter-div';
import { BgGoo } from '@/app/(internetfriends)/components/backgrounds/gloo';
import { getRandomColors } from '@/app/(internetfriends)/lib/color-palette';

export default function Page() {
  const randomColors = getRandomColors();
  return (
    <main className='flex flex-col h-dvh'>
      <div className="relative grow flex items-start md:items-center justify-center bg-background">
        <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col bg-background mt-12 md:-mt-12 pb-12 z-10">
          <Header />
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
            <h3 className="text-xl font-semibold dark:text-zinc-50">Regístrate</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Crea una cuenta con tu correo electrónico y contraseña
            </p>
          </div>
          <AuthForm type='register'>
            <div className="flex flex-col gap-2">
              <label htmlFor="mfaToken" className="text-zinc-600 font-normal dark:text-zinc-400">
                MFA Token
              </label>
              <input
                id="mfaToken"
                name="mfaToken"
                className="bg-muted text-md md:text-sm"
                type="text"
                placeholder="Enter your MFA token"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="verificationCode" className="text-zinc-600 font-normal dark:text-zinc-400">
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                className="bg-muted text-md md:text-sm"
                type="text"
                placeholder="Enter your verification code"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
              {'¿Ya tienes una cuenta? '}
              <Link
                href="/login"
                className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              >
                Inicia sesión
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
