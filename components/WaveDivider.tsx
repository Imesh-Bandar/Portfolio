'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WaveDividerProps {
  theme: string;
  variant?: 'top' | 'bottom' | 'both';
  animated?: boolean;
}

export default function WaveDivider({ theme, variant = 'bottom', animated = true }: WaveDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);

  const strokeColor = theme === 'dark' ? '#525252' : '#a3a3a3';
  const accentColor = theme === 'dark' ? '#737373' : '#8a8a8a';

  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll trigger for initial animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the path drawing
      if (pathRef.current) {
        const path = pathRef.current;
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        tl.to(path, {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 2,
          ease: 'power2.inOut',
        });

        // Continuous wave motion animation
        gsap.to(path, {
          attr: {
            d: "M0,75 Q25,50 50,75 T100,75 Q125,100 150,75 T200,75 Q225,50 250,75 T300,75"
          },
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2
        });
      }

      // Animate dots appearing
      dotsRef.current.forEach((dot, i) => {
        if (dot) {
          tl.fromTo(dot,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 0.8,
              duration: 0.4,
              ease: 'back.out(2)',
              delay: i * 0.15
            },
            1.2
          );

          // Continuous floating animation for each dot
          gsap.to(dot, {
            attr: { cy: `+=${gsap.utils.random(-10, 10)}` },
            scale: gsap.utils.random(1, 1.4),
            opacity: gsap.utils.random(0.4, 0.9),
            duration: gsap.utils.random(2, 3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3 + 2
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animated, theme]);

  return (
    <div ref={containerRef} className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Animated Graph SVG */}
      <svg
        className="absolute"
        width="300"
        height="150"
        viewBox="0 0 300 150"
      >
        {/* Animated wave path */}
        <path
          ref={pathRef}
          d="M0,75 Q25,60 50,75 T100,75 Q125,90 150,75 T200,75 Q225,60 250,75 T300,75"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />

        {/* Data point dots */}
        {[50, 100, 150, 200, 250].map((x, i) => (
          <circle
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            cx={x}
            cy={75}
            r="4"
            fill={accentColor}
            style={{ opacity: 0 }}
          />
        ))}

        {/* Grid lines for graph effect */}
        <line x1="0" y1="37.5" x2="300" y2="37.5" stroke={strokeColor} strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="75" x2="300" y2="75" stroke={strokeColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="112.5" x2="300" y2="112.5" stroke={strokeColor} strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
}
