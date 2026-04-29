'use client';

import { AnimatePresence, motion } from 'framer-motion';
import LiveClock from './LiveClock';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  activeSection: string;
}

const navLinks = [
  { id: 'home', label: 'Index', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'projects', label: 'Portfolio', num: '03' },
  { id: 'blog', label: 'Blog', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Imesh-Bandar', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/imesh-bandara', icon: 'LI' },
  { label: 'Email', href: 'mailto:imesh.fsd.info@gmail.com', icon: '@' },
  { label: 'WhatsApp', href: 'https://wa.me/94704394523', icon: 'WA' },
];

export default function MenuOverlay({ isOpen, onClose, theme, activeSection }: MenuOverlayProps) {
  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 998,
            }}
          />

          {/* Overlay Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 440,
              zIndex: 999,
              background: isDark ? '#090914' : '#fafbff',
              borderLeft: isDark
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              overflow: 'auto',
            }}
          >
            {/* Top row: logo + close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              }}>
                Playground
              </div>
              <button
                id="menu-close-btn"
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: isDark
                    ? '1px solid rgba(255,255,255,0.12)'
                    : '1px solid rgba(0,0,0,0.12)',
                  background: 'transparent',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: isDark
                      ? '1px solid rgba(255,255,255,0.05)'
                      : '1px solid rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                    color: activeSection === link.id
                      ? isDark ? '#ffffff' : '#0a0a1a'
                      : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
                    transition: 'all 0.2s ease',
                    group: 'link',
                  } as React.CSSProperties}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = isDark ? '#ffffff' : '#0a0a1a';
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '8px';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = activeSection === link.id
                      ? isDark ? '#ffffff' : '#0a0a1a'
                      : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0';
                  }}
                >
                  <span style={{
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>
                    {link.label}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    opacity: 0.4,
                    letterSpacing: '0.05em',
                  }}>
                    {link.num}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom: socials + clock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{ marginTop: 48 }}
            >
              {/* Socials */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                      color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
                      (e.currentTarget as HTMLAnchorElement).style.color = isDark ? '#fff' : '#0a0a1a';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Country badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                fontSize: 12,
                color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <span style={{ fontSize: 18 }}>🇱🇰</span>
                <span>LK · Sri Lanka</span>
              </div>

              {/* Live clock */}
              <LiveClock
                className=""
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
