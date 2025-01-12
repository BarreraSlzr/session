'use client'
import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface IMotionDivProps extends MotionProps{
    className: string;
}

export default function MotionDiv ({children, transition, className}: React.PropsWithChildren<IMotionDivProps>) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut', ...transition }}
    className={className}
    >
        {children}      
    </motion.div>
  );
}
