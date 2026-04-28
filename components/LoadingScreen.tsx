'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  theme: string;
}

export default function LoadingScreen({ onComplete, theme }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [particles, setParticles] = useState<{
    id: number; x: number; y: number; size: number; duration: number; delay: number; colorR: number; colorG: number;
  }[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isDark = theme === 'dark';

  const sampleCodeLines = [
    'import { creativity } from "@imesh/mind";',
    'const portfolio = new Portfolio({ owner: "Imesh Bandara" });',
    'await portfolio.loadProjects({ featured: true });',
    'skills.forEach(skill => skill.level++);',
    'const ui = buildPremiumExperience({ animations: true });',
    'deploy({ platform: "vercel", status: "🚀" });',
    'console.log("Welcome to my world!");',
    'experience.map(job => ({ ...job, passion: Infinity }));',
    'const stack = ["React", "Next.js", "Node.js", "Laravel"];',
    'git commit -m "feat: add amazing portfolio" ✨',
  ];

  // Generate particles client-side only to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        colorR: Math.round(99 + Math.random() * 100),
        colorG: Math.round(102 + Math.random() * 50),
      }))
    );
  }, []);

  // Animate code lines appearing
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < sampleCodeLines.length) {
        setCodeLines(prev => [...prev, sampleCodeLines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // Progress animation
  useEffect(() => {
    const duration = 3000;
    const steps = 100;
    const stepDuration = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      // Ease-out curve
      const eased = Math.round(100 * (1 - Math.pow(1 - current / 100, 3)));
      setProgress(eased);

      if (current >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(onComplete, 1000);
        }, 400);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Sound generation using Web Audio API
  const playLoadingSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Create ambient drone
      const createOscillator = (freq: number, type: OscillatorType, vol: number, startTime: number, endTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = type;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(vol, startTime + 0.5);
        gain.gain.linearRampToValueAtTime(0, endTime - 0.3);
        osc.start(startTime);
        osc.stop(endTime);
      };

      const now = ctx.currentTime;
      createOscillator(60, 'sine', 0.04, now, now + 3);
      createOscillator(120, 'sine', 0.03, now + 0.2, now + 3);
      createOscillator(180, 'sine', 0.02, now + 0.4, now + 3);

      // Tick sounds
      for (let i = 0; i < 8; i++) {
        const t = now + i * 0.35;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800 + i * 100;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      }

      // Completion chime
      const chimeTime = now + 3.1;
      [523, 659, 784, 1047].forEach((freq, i) => {
        createOscillator(freq, 'sine', 0.06, chimeTime + i * 0.12, chimeTime + i * 0.12 + 0.4);
      });

      setSoundEnabled(true);
    } catch (e) {
      // Silently fail if audio not supported
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setSoundEnabled(false);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      stopSound();
    } else {
      playLoadingSound();
    }
  };


  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="loading-screen"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark
              ? 'linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 30%, #080810 60%, #0a0a0f 100%)'
              : 'linear-gradient(135deg, #f8f8ff 0%, #eff0ff 30%, #f5f5ff 60%, #fafafe 100%)',
            overflow: 'hidden',
          }}
          exit={{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: isDark
                ? `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`
                : `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            }}
          />

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: isDark
                  ? `rgba(${p.colorR}, ${p.colorG}, 241, 0.6)`
                  : `rgba(99, 102, 241, 0.3)`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Glowing orbs */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: isDark
                ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '15%',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: isDark
                ? 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Code rain panel */}
          <motion.div
            style={{
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: 340,
              padding: '16px 20px',
              borderRadius: 12,
              background: isDark ? 'rgba(15,15,25,0.8)' : 'rgba(240,240,255,0.8)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
              backdropFilter: 'blur(12px)',
              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              fontSize: 12,
              display: 'none',
            }}
            className="code-rain-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: isDark ? 'rgba(129,140,248,0.8)' : 'rgba(79,70,229,0.8)',
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span style={{ color: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.4)' }}>{i + 1}. </span>
                {line}
              </motion.div>
            ))}
            <motion.span
              style={{
                display: 'inline-block',
                width: 8,
                height: 14,
                background: isDark ? 'rgba(129,140,248,0.8)' : 'rgba(79,70,229,0.8)',
                marginLeft: 2,
                verticalAlign: 'middle',
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
            {/* Animated logo */}
            <motion.div
              style={{ marginBottom: 32, display: 'inline-block' }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto' }}>
                {/* Outer ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid transparent',
                    background: `linear-gradient(${isDark ? '#0a0a0f' : '#f8f8ff'}, ${isDark ? '#0a0a0f' : '#f8f8ff'}) padding-box, 
                                 linear-gradient(135deg, #6366f1, #a855f7, #6366f1) border-box`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 8,
                    borderRadius: '50%',
                    border: '2px solid transparent',
                    background: `linear-gradient(${isDark ? '#0a0a0f' : '#f8f8ff'}, ${isDark ? '#0a0a0f' : '#f8f8ff'}) padding-box, 
                                 linear-gradient(225deg, #6366f1, #a855f7, #6366f1) border-box`,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                {/* Center initials */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-2px',
                  }}
                >
                  IB
                </div>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                marginBottom: 8,
                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #c4b5fd 100%)'
                  : 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Imesh Bandara
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{
                fontSize: 14,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(165,180,252,0.7)' : 'rgba(79,70,229,0.7)',
                marginBottom: 48,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar container */}
            <motion.div
              style={{ width: 'min(400px, 80vw)', margin: '0 auto 16px' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              {/* Progress track */}
              <div
                style={{
                  height: 4,
                  borderRadius: 9999,
                  background: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 9999,
                    background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                    backgroundSize: '200% 100%',
                    position: 'relative',
                    width: `${progress}%`,
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Shimmer */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 30,
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Progress text */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  fontSize: 12,
                  color: isDark ? 'rgba(165,180,252,0.5)' : 'rgba(79,70,229,0.5)',
                }}
              >
                <span>Initializing portfolio...</span>
                <span>{progress}%</span>
              </div>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Sound toggle */}
            <motion.button
              onClick={toggleSound}
              style={{
                marginTop: 32,
                padding: '8px 20px',
                borderRadius: 9999,
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)'}`,
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 12,
                color: isDark ? 'rgba(165,180,252,0.7)' : 'rgba(79,70,229,0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: '32px auto 0',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {soundEnabled ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  Sound On
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                  Sound Off
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
