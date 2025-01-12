'use client'
import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  overlayBlendMode?: CSSProperties['backgroundBlendMode'];
  gradient?: string;
}

export default function NoiseFilter({
  className = '',
  overlayBlendMode = 'multiply',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`absolute size-full min-w-fit min-h-fit bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundBlendMode: overlayBlendMode,
      }}
    />
  );
}
