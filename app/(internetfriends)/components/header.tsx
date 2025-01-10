
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import content from '../content.json';
import NoiseFilterDiv from './noise-filter-div';

export default function Header() {
    return (
        <header className="flex items-center justify-between sm:p-6 p-2 py-4 md:p-8 rounded-t-lg bg-foreground border-2 border-brand-blue-800">
            <Link href='/'>
                <div className="flex items-center gap-2">
                    <div className="relative overflow-hidden flex items-center h-10 w-32 rounded bg-gradient-to-br from-orange-500 to-pink-500">
                        <NoiseFilterDiv className="scale-400 inset-0 opacity-75 hover:opacity-100 transition duration-2000 hover:duration-200 animate-tilt mix-blend-saturation"
                            overlayBlendMode='hue' />
                        <Image
                            className="select-none pointer-events-none"
                            alt={`${content.companyName}.xyz`}
                            width={600}
                            height={600}
                            src="/600x600.jpg"
                        />
                    </div>
                </div>
            </Link>

            <Link href="/samples" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                {content.headerLink}
                <ArrowUpRight className="size-4" />
            </Link>
        </header>
    );
}