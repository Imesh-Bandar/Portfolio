'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  theme: string;
  align?: 'left' | 'center';
  badge?: string;
}

export default function SectionHeader({
  title, subtitle, accent, theme, align = 'left', badge,
}: SectionHeaderProps) {
  const parts = accent ? title.split(accent) : [title];

  return (
    <motion.div
      className={`mb-14 ${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {badge && (
        <motion.div
          className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${align === 'center' ? 'mx-auto' : ''}`}
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))',
            border: '1px solid rgba(99,102,241,0.22)',
            color: '#6366f1',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#6366f1',
            boxShadow: '0 0 8px rgba(99,102,241,0.8)',
            display: 'inline-block',
          }} />
          {badge}
        </motion.div>
      )}

      <h2
        className="font-bold tracking-tight"
        style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: theme === 'dark' ? '#f0f0ff' : '#0a0a1a',
        }}
      >
        {parts[0]}
        {accent && (
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {accent}
          </span>
        )}
        {parts[1]}
      </h2>

      {/* Underline bar */}
      <motion.div
        className={`mt-4 h-1 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
        style={{
          width: 60,
          background: 'linear-gradient(90deg, #6366f1, #a855f7)',
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 60, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {subtitle && (
        <motion.p
          className="mt-5 text-base leading-relaxed max-w-xl"
          style={{
            color: theme === 'dark' ? '#7070a0' : '#5a5a7a',
            ...(align === 'center' ? { margin: '20px auto 0' } : {}),
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
