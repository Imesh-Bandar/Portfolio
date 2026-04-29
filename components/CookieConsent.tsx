'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CookieConsentProps {
  theme: string;
}

export default function CookieConsent({ theme }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', '1');
    setVisible(false);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '16px 24px',
            borderRadius: 16,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            background: isDark
              ? 'rgba(12, 12, 28, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.08)',
            boxShadow: isDark
              ? '0 24px 60px rgba(0,0,0,0.6)'
              : '0 24px 60px rgba(0,0,0,0.12)',
            maxWidth: 520,
            width: 'calc(100vw - 48px)',
          }}
        >
          {/* Cookie icon */}
          <div style={{ fontSize: 24, flexShrink: 0 }}>🍪</div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13,
              fontWeight: 600,
              color: isDark ? '#e8e8f4' : '#0a0a1a',
              marginBottom: 2,
            }}>
              This site uses cookies & animations
            </p>
            <p style={{
              fontSize: 11,
              color: isDark ? '#7070a0' : '#8888a8',
              lineHeight: 1.5,
            }}>
              We use sound effects, animations, and local storage for the best experience. No personal data is collected.
            </p>
          </div>

          {/* Accept button */}
          <button
            id="cookie-accept-btn"
            onClick={accept}
            style={{
              flexShrink: 0,
              padding: '10px 20px',
              borderRadius: 10,
              background: isDark
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(10,10,26,0.9)',
              color: isDark ? '#0a0a1a' : '#ffffff',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
