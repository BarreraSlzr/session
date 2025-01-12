'use client'

import { PropsWithChildren, useMemo } from 'react';
import content from '../content.json';
import NoiseFilter from './backgrounds/noise-filter-div';
import { motion } from 'framer-motion';
import { BgGoo } from './backgrounds/gloo';
import { getRandomColors } from '../lib/color-palette';

const DefaultHero = () => (
    <div className='text-3xl md:text-4xl lg:text-5xl leading-relaxed'>
        <h1 className="font-bold">{content.hero.title}</h1>
        <p className="text-lg mb-6 font-mono">{content.hero.description}</p>
    </div>
)

type Props = {
    className?: string,
}

export default function HeroText({ children = <DefaultHero />, className }: PropsWithChildren<Props>) {

    const randomColors = useMemo(() => getRandomColors(), []);
    return (
        <section className={`relative min-h-[60vh] ${className}`}>
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <NoiseFilter className='mix-blend-hue'/>
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
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative sm:px-6 px-2 md:px-8 py-12 max-w-4xl text-white">
                {children}
            </motion.div>
        </section>
    );
}
