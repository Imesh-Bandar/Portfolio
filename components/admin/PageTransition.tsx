'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/context/ThemeContext';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function AdminPageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageName, setPageName] = useState('');

  const getPageName = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'dashboard';
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    setPageName(getPageName(pathname));
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={`${pathname}-transition`}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Circle expand transition */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: theme === 'dark'
                  ? 'radial-gradient(circle at center, #0a0a0a, #1a1a1a, #2a2a2a)'
                  : 'radial-gradient(circle at center, #fafafa, #f0f0f0, #e0e0e0)',
              }}
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
              exit={{ clipPath: 'circle(0% at 50% 50%)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Page name display */}
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-[#C1BFBE]' : 'text-[#2a2a2a]'
                }`}
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: theme === 'dark'
                    ? '0 10px 40px rgba(193, 191, 190, 0.3)'
                    : '0 10px 40px rgba(0,0,0,0.1)'
                }}
              >
                {pageName}
              </motion.div>
              <motion.div
                className={`h-1 w-32 mx-auto rounded-full ${
                  theme === 'dark'
                    ? 'bg-linear-to-r from-[#C1BFBE] via-[#5F5F60] to-[#C1BFBE]'
                    : 'bg-linear-to-r from-[#5F5F60] via-[#2a2a2a] to-[#5F5F60]'
                }`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={`${pathname}-content`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: isTransitioning ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
