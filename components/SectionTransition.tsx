'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type AnimationType =
  | 'fade-up'
  | 'scale-up'
  | 'slide-right'
  | 'slide-left'
  | 'rotate-in'
  | 'blur-in'
  | 'circle-expand'
  | 'wave-in'
  | 'flip-in'
  | 'zoom-rotate';

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  sectionName?: string;
}

export default function SectionTransition({
  children,
  id,
  className = '',
  animationType = 'fade-up',
  delay = 0,
  sectionName,
}: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const getVariants = () => {
    switch (animationType) {
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        };
      case 'rotate-in':
        return {
          hidden: { opacity: 0, rotateX: -45, y: 100 },
          visible: { opacity: 1, rotateX: 0, y: 0 },
        };
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(20px)', y: 50 },
          visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
        };
      case 'circle-expand':
        return {
          hidden: {
            opacity: 0,
            scale: 0,
            clipPath: 'circle(0% at 50% 50%)',
          },
          visible: {
            opacity: 1,
            scale: 1,
            clipPath: 'circle(100% at 50% 50%)',
          },
        };
      case 'wave-in':
        return {
          hidden: {
            opacity: 0,
            scaleY: 0,
            originY: 0,
          },
          visible: {
            opacity: 1,
            scaleY: 1,
            originY: 0,
          },
        };
      case 'flip-in':
        return {
          hidden: {
            opacity: 0,
            rotateY: 90,
            perspective: 1000,
          },
          visible: {
            opacity: 1,
            rotateY: 0,
            perspective: 1000,
          },
        };
      case 'zoom-rotate':
        return {
          hidden: {
            opacity: 0,
            scale: 0.3,
            rotate: -180,
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
          },
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 80 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
