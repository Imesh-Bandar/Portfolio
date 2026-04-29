'use client';

import { useEffect, useRef } from 'react';

interface NumberColumnsProps {
  theme: string;
}

export default function NumberColumns({ theme }: NumberColumnsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const digits = Array.from({ length: 10 }, (_, i) => i); // 0–9
  const repeatCount = 8; // each column repeats digits 8 times

  const columns = [
    { speed: 18, delay: 0, reverse: false },
    { speed: 25, delay: -4, reverse: true },
    { speed: 20, delay: -8, reverse: false },
    { speed: 30, delay: -2, reverse: true },
    { speed: 15, delay: -6, reverse: false },
    { speed: 22, delay: -10, reverse: true },
    { speed: 28, delay: -1, reverse: false },
    { speed: 17, delay: -5, reverse: true },
    { speed: 24, delay: -9, reverse: false },
    { speed: 19, delay: -3, reverse: true },
    { speed: 26, delay: -7, reverse: false },
    { speed: 21, delay: -12, reverse: true },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {columns.map((col, colIdx) => {
        const numberList = Array.from({ length: repeatCount }, () => digits).flat();
        return (
          <div
            key={colIdx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              flex: 1,
              maxWidth: 60,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                animation: `numScroll${col.reverse ? 'Rev' : ''} ${col.speed}s ${col.delay}s linear infinite`,
                willChange: 'transform',
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...numberList, ...numberList].map((n, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: '2.4em',
                    letterSpacing: '0.05em',
                    color: theme === 'dark'
                      ? `rgba(160,160,220,${0.06 + ((colIdx % 3) * 0.015)})`
                      : `rgba(80,80,160,${0.06 + ((colIdx % 3) * 0.01)})`,
                    fontFamily: "'JetBrains Mono', monospace",
                    userSelect: 'none',
                    textAlign: 'center',
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes numScroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes numScrollRev {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
