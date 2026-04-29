'use client';

interface HeroIllustrationProps {
  theme: string;
  className?: string;
}

export default function HeroIllustration({ theme, className = '' }: HeroIllustrationProps) {
  const isDark = theme === 'dark';
  const stroke = isDark ? 'rgba(180,180,240,0.5)' : 'rgba(60,60,140,0.45)';
  const fillAccent = isDark ? 'rgba(130,120,240,0.15)' : 'rgba(100,90,210,0.10)';
  const dotFill = isDark ? 'rgba(180,160,255,0.8)' : 'rgba(80,60,180,0.7)';

  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-label="Designer illustration"
      style={{ overflow: 'visible' }}
    >
      {/* Defs */}
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={isDark ? '#8b7fff' : '#6060c8'} stopOpacity="0.2" />
          <stop offset="100%" stopColor={isDark ? '#8b7fff' : '#6060c8'} stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow background */}
      <circle cx="160" cy="160" r="130" fill="url(#heroGlow)" />

      {/* Outer orbit ring */}
      <circle
        cx="160" cy="160" r="120"
        stroke={stroke}
        strokeWidth="0.6"
        strokeDasharray="4 8"
        style={{ animationName: 'svgSpin', animationDuration: '40s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Mid ring */}
      <circle
        cx="160" cy="160" r="80"
        stroke={stroke}
        strokeWidth="0.5"
        strokeDasharray="2 6"
        style={{ animationName: 'svgSpinRev', animationDuration: '28s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Inner solid ring */}
      <circle
        cx="160" cy="160" r="50"
        stroke={stroke}
        strokeWidth="0.8"
        fill={fillAccent}
      />

      {/* Central diamond */}
      <polygon
        points="160,120 195,160 160,200 125,160"
        stroke={stroke}
        strokeWidth="1"
        fill={fillAccent}
        style={{ animationName: 'svgPulse', animationDuration: '4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Inner diamond */}
      <polygon
        points="160,138 178,160 160,182 142,160"
        stroke={dotFill}
        strokeWidth="0.8"
        fill="none"
        filter="url(#glow)"
      />

      {/* Orbit dot - top */}
      <circle cx="160" cy="40" r="4" fill={dotFill} filter="url(#glow)"
        style={{ animationName: 'svgSpin', animationDuration: '40s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Orbit dot - right */}
      <circle cx="280" cy="160" r="3" fill={dotFill} filter="url(#glow)"
        style={{ animationName: 'svgSpin', animationDuration: '40s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Orbit dot - bottom */}
      <circle cx="160" cy="280" r="4" fill={dotFill} filter="url(#glow)"
        style={{ animationName: 'svgSpin', animationDuration: '40s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Mid ring dot */}
      <circle cx="240" cy="160" r="3.5" fill={dotFill} filter="url(#glow)"
        style={{ animationName: 'svgSpinRev', animationDuration: '28s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />
      <circle cx="80" cy="160" r="2.5" fill={dotFill} filter="url(#glow)"
        style={{ animationName: 'svgSpinRev', animationDuration: '28s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', transformOrigin: '160px 160px' }}
      />

      {/* Cross lines */}
      <line x1="160" y1="60" x2="160" y2="260" stroke={stroke} strokeWidth="0.4" strokeDasharray="1 8" />
      <line x1="60" y1="160" x2="260" y2="160" stroke={stroke} strokeWidth="0.4" strokeDasharray="1 8" />

      {/* Corner accent brackets */}
      <path d="M50,50 L50,65 M50,50 L65,50" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M270,50 L270,65 M270,50 L255,50" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M50,270 L50,255 M50,270 L65,270" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M270,270 L270,255 M270,270 L255,270" stroke={stroke} strokeWidth="1" strokeLinecap="round" />

      <style>{`
        @keyframes svgSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes svgSpinRev {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes svgPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(0.88); opacity: 0.7; }
        }
      `}</style>
    </svg>
  );
}
