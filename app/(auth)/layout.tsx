import Header from '@/app/(internetfriends)/components/header';
import NoiseFilter from '@/app/(internetfriends)/components/backgrounds/noise-filter-div';
import { BgGoo } from '@/app/(internetfriends)/components/backgrounds/gloo';
import { getRandomColors } from '@/app/(internetfriends)/lib/color-palette';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const randomColors = getRandomColors();
  
  return (
    <main className='flex flex-col grow'>
      <div className="relative grow flex items-start md:items-center justify-center bg-background">
        <div className="w-full max-w-md overflow-hidden rounded-lg gap-12 flex flex-col bg-background mt-12 md:-mt-12 pb-12 z-10">
          <Header />
          {children}
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
