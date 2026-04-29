'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SideNavProps {
  theme: string;
  activeSection: string;
  sections: { id: string; label: string; icon: string }[];
}

export default function SideNav({ theme, activeSection, sections }: SideNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} title={s.label} className="group flex items-center gap-2 justify-end">
            {/* Label tooltip */}
            <span
              className="text-xs font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
              style={{
                background: theme === 'dark' ? 'rgba(14,14,31,0.95)' : 'rgba(255,255,255,0.95)',
                color: isActive ? '#6366f1' : theme === 'dark' ? '#9090b0' : '#4a4a6a',
                border: '1px solid rgba(99,102,241,0.2)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              {s.label}
            </span>
            {/* Dot */}
            <motion.div
              animate={{ scale: isActive ? 1.3 : 1 }}
              transition={{ duration: 0.25 }}
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                borderRadius: '50%',
                background: isActive
                  ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                  : theme === 'dark' ? 'rgba(144,144,176,0.4)' : 'rgba(99,102,241,0.25)',
                boxShadow: isActive ? '0 0 12px rgba(99,102,241,0.6)' : 'none',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            />
          </a>
        );
      })}
    </motion.div>
  );
}
