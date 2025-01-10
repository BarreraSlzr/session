'use client'

import { PropsWithChildren } from 'react';
import content from '../content.json';
import NoiseFilterDiv from './noise-filter-div';
import { motion } from 'framer-motion';

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
    return (
        <section className={`relative min-h-[60vh] ${className}`}>
            <NoiseFilterDiv/>
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
