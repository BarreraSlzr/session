import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import content from '../content.json';
import NoiseFilter from './backgrounds/noise-filter-div';
import { getRandomColors } from '../lib/color-palette';
import { BgGoo } from './backgrounds/gloo';

export default function Header() {
    const randomColors = getRandomColors();
    return (
        <header className="flex items-center justify-between sm:p-6 p-2 py-4 md:p-8 rounded-t-lg bg-foreground border-2 border-brand-blue-800">
            <Link href='/'>
                <div className="flex items-center gap-2">
                    <div className="relative overflow-hidden flex items-center h-10 w-32 rounded bg-gradient-to-br from-orange-500 to-pink-500">
                        <div className="absolute opacity-69 size-full pointer-events-none z-0 mix-blend-color">
                            <NoiseFilter className='opacity-26 mix-blend-hue' />
                            <BgGoo
                                speed={0.2}
                                resolution={1.0}
                                depth={3}
                                seed={0.4}
                                color1={randomColors[0]}
                                color2={randomColors[1]}
                                color3={randomColors[2]}
                        />
                        </div>
                        <Image
                            className="select-none pointer-events-none z-10"
                            alt={`${content.companyName}.xyz`}
                            width={600}
                            height={600}
                            src="/600x600.jpg"
                        />
                    </div>
                </div>
            </Link>

            <Link href="https://www.internetfriends.xyz/samples" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                {content.headerLink}
                <ArrowUpRight className="size-4" />
            </Link>
        </header>
    );
}