'use client';

import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface ScrollIndicatorProps {
  theme: string;
}

export default function ScrollIndicator({ theme }: ScrollIndicatorProps) {
  const scrollToContent = () => {
    const firstSection = document.getElementById('projects');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      onClick={scrollToContent}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span
          className={`text-xs uppercase tracking-[0.2em] ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          Scroll
        </span>
        <FiChevronDown
          size={24}
          className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
        />
      </motion.div>
    </motion.div>
  );
}
