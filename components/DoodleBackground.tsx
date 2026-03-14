'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';

interface DoodleBackgroundProps {
  fixed?: boolean;
  opacity?: number;
  doodleCount?: number;
}

export default function DoodleBackground({
  fixed = true,
  opacity,
  doodleCount = 30
}: DoodleBackgroundProps = {}) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Doodle elements
    const doodles: any[] = [];

    // Create doodles with theme-aware colors
    const getGrayValue = () => {
      if (theme === 'dark') {
        return Math.floor(Math.random() * 60 + 180); // Lighter gray values for dark mode (180-240)
      } else {
        return Math.floor(Math.random() * 60 + 80); // Darker gray values for light mode (80-140)
      }
    };

    for (let i = 0; i < doodleCount; i++) {
      const grayValue = getGrayValue();
      doodles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        type: Math.floor(Math.random() * 12),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.08 + 0.02,
        color: `rgb(${grayValue}, ${grayValue}, ${grayValue})`,
      });
    }

    // Developer-themed draw functions
    const drawCodeBrackets = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.font = `${size}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('<>', x - size / 3, y + size / 4);
    };

    const drawCurlyBraces = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.font = `${size}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('{}', x - size / 3, y + size / 4);
    };

    const drawGitBranch = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x, y + size / 2);
      ctx.arc(x + size / 3, y, size / 6, Math.PI, 0);
      ctx.stroke();
      // Dots
      ctx.beginPath();
      ctx.arc(x, y - size / 2, 3, 0, Math.PI * 2);
      ctx.arc(x, y + size / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTerminal = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      ctx.font = `${size / 2}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('$_', x - size / 3, y + size / 6);
    };

    const drawFunction = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.font = `${size * 0.6}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('f(x)', x - size / 2, y + size / 6);
    };

    const drawArrowFunction = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.font = `${size * 0.7}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('=>', x - size / 3, y + size / 6);
    };

    const drawSemicolon = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `${size}px monospace`;
      ctx.fillText(';', x - size / 6, y + size / 4);
    };

    const drawComment = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - size / 2, y - size / 3);
      ctx.lineTo(x + size / 2, y + size / 3);
      ctx.moveTo(x - size / 2, y + size / 3);
      ctx.lineTo(x + size / 2, y - size / 3);
      ctx.stroke();
    };

    const drawVariable = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.font = `italic ${size * 0.8}px monospace`;
      ctx.fillStyle = color;
      ctx.fillText('var', x - size / 2, y + size / 6);
    };

    const drawBug = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      // Body
      ctx.beginPath();
      ctx.arc(x, y, size / 3, 0, Math.PI * 2);
      ctx.stroke();
      // Legs
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI / 4) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x - size / 3, y);
        ctx.lineTo(x - size / 2, y + Math.sin(angle) * size / 2);
        ctx.moveTo(x + size / 3, y);
        ctx.lineTo(x + size / 2, y + Math.sin(angle) * size / 2);
        ctx.stroke();
      }
    };

    const drawCoffeeCup = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      // Cup
      ctx.beginPath();
      ctx.moveTo(x - size / 3, y - size / 3);
      ctx.lineTo(x - size / 2, y + size / 3);
      ctx.lineTo(x + size / 2, y + size / 3);
      ctx.lineTo(x + size / 3, y - size / 3);
      ctx.closePath();
      ctx.stroke();
      // Handle
      ctx.beginPath();
      ctx.arc(x + size / 2, y, size / 4, -Math.PI / 2, Math.PI / 2, false);
      ctx.stroke();
      // Steam
      ctx.beginPath();
      ctx.moveTo(x - size / 6, y - size / 2);
      ctx.quadraticCurveTo(x - size / 8, y - size / 1.5, x, y - size / 2);
      ctx.stroke();
    };

    const drawBulb = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      // Bulb
      ctx.beginPath();
      ctx.arc(x, y - size / 6, size / 3, 0, Math.PI * 2);
      ctx.stroke();
      // Base
      ctx.strokeRect(x - size / 6, y + size / 6, size / 3, size / 4);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      doodles.forEach((doodle) => {
        ctx.save();
        ctx.translate(doodle.x, doodle.y);
        ctx.rotate(doodle.rotation);
        ctx.translate(-doodle.x, -doodle.y);

        switch (doodle.type) {
          case 0:
            drawCodeBrackets(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 1:
            drawCurlyBraces(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 2:
            drawGitBranch(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 3:
            drawTerminal(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 4:
            drawFunction(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 5:
            drawArrowFunction(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 6:
            drawSemicolon(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 7:
            drawComment(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 8:
            drawVariable(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 9:
            drawBug(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 10:
            drawCoffeeCup(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
          case 11:
            drawBulb(doodle.x, doodle.y, doodle.size, doodle.color, doodle.opacity);
            break;
        }

        ctx.restore();

        // Update position
        doodle.x += doodle.speedX;
        doodle.y += doodle.speedY;
        doodle.rotation += doodle.rotationSpeed;

        // Wrap around edges
        if (doodle.x < -50) doodle.x = canvas.width + 50;
        if (doodle.x > canvas.width + 50) doodle.x = -50;
        if (doodle.y < -50) doodle.y = canvas.height + 50;
        if (doodle.y > canvas.height + 50) doodle.y = -50;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  const defaultOpacity = theme === 'dark' ? 0.4 : 0.15;
  const textOpacity = theme === 'dark' ? 0.15 : 0.08;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${fixed ? 'fixed' : 'absolute'} top-0 left-0 w-full h-full pointer-events-none z-0`}
        style={{
          opacity: opacity !== undefined ? opacity : defaultOpacity
        }}
      />

      {/* Floating developer-themed text elements - More subtle */}
      {fixed && (
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none z-0"
          style={{
            opacity: textOpacity
          }}
        >
        <motion.div
          className="absolute text-6xl font-mono font-bold text-gray-700 opacity-5"
          style={{ top: '10%', left: '5%' }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          &lt;/&gt;
        </motion.div>

        <motion.div
          className="absolute text-8xl font-mono font-bold text-gray-800 opacity-5"
          style={{ top: '60%', right: '10%' }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {'{}'}
        </motion.div>

        <motion.div
          className="absolute text-5xl font-mono font-bold text-gray-700 opacity-5"
          style={{ bottom: '20%', left: '15%' }}
          animate={{
            x: [0, 15, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          git
        </motion.div>

        <motion.div
          className="absolute text-6xl font-mono font-bold text-gray-800 opacity-5"
          style={{ top: '30%', right: '25%' }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          =&gt;
        </motion.div>

        <motion.div
          className="absolute text-7xl font-mono font-bold text-gray-700 opacity-5"
          style={{ bottom: '40%', right: '5%' }}
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          $
        </motion.div>
      </div>
      )}
    </>
  );
}
