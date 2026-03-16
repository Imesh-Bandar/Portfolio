'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    setIsTouchDevice(checkTouchDevice());

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot — snappy but smooth */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        }}
      />

      {/* Cursor ring — trails behind smoothly */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white mix-blend-difference rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.2,
        }}
      />

      {/* Outer glow trail — slowest, most fluid */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-white/30 mix-blend-difference rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 12,
          mass: 0.3,
        }}
      />
    </>
  );
}
