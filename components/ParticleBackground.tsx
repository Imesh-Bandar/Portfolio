'use client';

import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme: string;
  variant?: 'particles' | 'waves' | 'grid' | 'constellation';
  opacity?: number;
}

export default function ParticleBackground({
  theme,
  variant = 'particles',
  opacity = 1,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    if (variant === 'particles') {
      // Particle constellation
      const particles: {
        x: number; y: number; vx: number; vy: number; radius: number; alpha: number;
      }[] = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }

      const color = isDark ? '99,102,241' : '79,70,229';

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.15;
              ctx.strokeStyle = `rgba(${color},${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw particles
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${p.alpha})`;
          ctx.fill();

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Bounce
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    } else if (variant === 'waves') {
      let t = 0;
      const color = isDark ? '99,102,241' : '79,70,229';

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.005;

        for (let w = 0; w < 3; w++) {
          ctx.beginPath();
          const amp = 30 + w * 10;
          const freq = 0.005 + w * 0.002;
          const yBase = canvas.height * (0.3 + w * 0.2);
          const alpha = 0.06 - w * 0.015;

          ctx.moveTo(0, yBase);
          for (let x = 0; x <= canvas.width; x += 4) {
            const y = yBase + Math.sin(x * freq + t + w) * amp;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }

        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    } else if (variant === 'grid') {
      const color = isDark ? '99,102,241' : '79,70,229';
      let offset = 0;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        offset = (offset + 0.3) % 60;
        ctx.strokeStyle = `rgba(${color},0.05)`;
        ctx.lineWidth = 1;

        for (let x = offset; x < canvas.width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        for (let y = offset; y < canvas.height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [theme, variant, isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
}
