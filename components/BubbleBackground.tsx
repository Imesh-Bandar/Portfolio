'use client';

interface BubbleBackgroundProps {
  theme: string;
  count?: number;
  opacity?: number;
}

// Pre-defined bubble configs for stability (no random on each render)
const BUBBLE_CONFIGS = [
  { size: 28, left: 5,  delay: 0,   dur: 14, drift:  40, colorIdx: 0 },
  { size: 64, left: 12, delay: 2.5, dur: 11, drift: -50, colorIdx: 1 },
  { size: 18, left: 22, delay: 5,   dur: 16, drift:  30, colorIdx: 2 },
  { size: 80, left: 30, delay: 1,   dur: 9,  drift: -60, colorIdx: 3 },
  { size: 36, left: 40, delay: 7,   dur: 13, drift:  50, colorIdx: 0 },
  { size: 50, left: 50, delay: 3,   dur: 10, drift: -40, colorIdx: 4 },
  { size: 22, left: 58, delay: 9,   dur: 15, drift:  35, colorIdx: 1 },
  { size: 70, left: 65, delay: 0.5, dur: 12, drift: -55, colorIdx: 2 },
  { size: 32, left: 72, delay: 6,   dur: 17, drift:  45, colorIdx: 3 },
  { size: 55, left: 80, delay: 4,   dur: 8,  drift: -30, colorIdx: 0 },
  { size: 24, left: 88, delay: 8,   dur: 14, drift:  60, colorIdx: 4 },
  { size: 44, left: 94, delay: 2,   dur: 11, drift: -45, colorIdx: 1 },
  { size: 15, left: 18, delay: 11,  dur: 18, drift:  25, colorIdx: 2 },
  { size: 60, left: 45, delay: 13,  dur: 10, drift: -35, colorIdx: 3 },
  { size: 38, left: 75, delay: 10,  dur: 13, drift:  50, colorIdx: 0 },
  { size: 20, left: 35, delay: 14,  dur: 16, drift: -20, colorIdx: 4 },
  { size: 48, left: 55, delay: 7.5, dur: 9,  drift:  40, colorIdx: 1 },
  { size: 30, left: 90, delay: 12,  dur: 15, drift: -50, colorIdx: 2 },
];

const DARK_COLORS = [
  'rgba(99,102,241,@)',    // indigo
  'rgba(139,92,246,@)',    // violet
  'rgba(168,85,247,@)',    // purple
  'rgba(59,130,246,@)',    // blue
  'rgba(6,182,212,@)',     // cyan
];
const LIGHT_COLORS = [
  'rgba(99,102,241,@)',
  'rgba(139,92,246,@)',
  'rgba(168,85,247,@)',
  'rgba(59,130,246,@)',
  'rgba(6,182,212,@)',
];

export default function BubbleBackground({ theme, count = 18, opacity = 0.13, showCards = false }: BubbleBackgroundProps & { showCards?: boolean }) {
  const palette = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const configs = BUBBLE_CONFIGS.slice(0, count);

  return (
    <div
      className="bubble-container"
      aria-hidden="true"
    >
      {configs.map((b, i) => {
        const isCard = showCards && i % 4 === 0; // Every 4th bubble is a card
        const bg = palette[b.colorIdx % palette.length].replace('@', String(opacity));
        const highlight = palette[b.colorIdx % palette.length].replace('@', String(Math.min(1, opacity + 0.06)));
        
        if (isCard) {
          return (
            <div
              key={i}
              className="bubble card-bubble"
              style={{
                width: b.size * 1.5,
                height: b.size * 1.2,
                left: `${b.left}%`,
                background: theme === 'dark' ? 'rgba(30, 30, 50, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${highlight}`,
                borderRadius: '12px',
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--drift': `${b.drift}px`,
              } as React.CSSProperties}
            >
              <div style={{ fontSize: b.size * 0.6 }}>{['⚡', '◈', '✦', '▣', '⚡'][b.colorIdx % 5]}</div>
            </div>
          );
        }

        return (
          <div
            key={i}
            className="bubble"
            style={{
              width:  b.size,
              height: b.size,
              left:   `${b.left}%`,
              background: `radial-gradient(circle at 30% 30%, ${highlight}, ${bg})`,
              animationDelay:    `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              '--drift': `${b.drift}px`,
              '--delay': `${b.delay}s`,
              '--dur':   `${b.dur}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
