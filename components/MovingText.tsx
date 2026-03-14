'use client';

import { motion } from 'framer-motion';

interface MovingTextProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function MovingText({ text, duration = 20, className = '' }: MovingTextProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        initial={{ x: '-100%' }}
        animate={{ x: '100vw' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
      >
        <span className="text-2xl md:text-4xl font-bold opacity-10">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
