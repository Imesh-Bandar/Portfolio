'use client';

import { useTheme } from '@/lib/context/ThemeContext';

export default function GlobalGrid() {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`fixed inset-0 pointer-events-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-[#f8f9ff]'}`} 
      style={{ zIndex: -10 }}
    >
      <div className={`absolute inset-0 bg-grid-global ${theme === 'dark' ? 'bg-grid-dark' : 'bg-grid-light'}`} style={{ opacity: 0.4 }} />
    </div>
  );
}
