'use client';

interface CSSWaveProps {
  theme: string;
  position?: 'top' | 'bottom';
  color?: string;
  height?: number;
  speed?: 'slow' | 'normal' | 'fast';
  opacity?: number;
  flip?: boolean;
}

export default function CSSWave({
  theme,
  position = 'bottom',
  color,
  height = 80,
  speed = 'normal',
  opacity = 1,
  flip = false,
}: CSSWaveProps) {
  const waveColor = color || (theme === 'dark' ? '#0a0a0f' : '#f8f9ff');
  const duration = speed === 'slow' ? '18s' : speed === 'fast' ? '7s' : '12s';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        [position]: 0,
        left: 0,
        right: 0,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
        transform: flip ? 'scaleY(-1)' : undefined,
        opacity,
      }}
    >
      {/* Wave 1 — main */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: '100%',
          animation: `wave-drift ${duration} linear infinite`,
        }}
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z"
          fill={waveColor}
          opacity="0.6"
        />
      </svg>
      {/* Wave 2 — offset, faster */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: '100%',
          animation: `wave-drift ${parseFloat(duration) * 0.7}s linear infinite reverse`,
          opacity: 0.4,
        }}
      >
        <path
          d="M0,20 C240,70 480,0 720,35 C960,70 1200,10 1440,30 L1440,80 L0,80 Z"
          fill={waveColor}
        />
      </svg>
      {/* Wave 3 — slowest, subtle */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: '100%',
          animation: `wave-drift ${parseFloat(duration) * 1.4}s linear infinite`,
          opacity: 0.25,
        }}
      >
        <path
          d="M0,50 C360,10 720,70 1080,30 C1260,10 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={waveColor}
        />
      </svg>
    </div>
  );
}
