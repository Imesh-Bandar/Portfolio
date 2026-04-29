'use client';

import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  color: string;
  glow?: string;
  trend?: { value: number; isPositive: boolean };
  delay?: number;
}

export default function StatsCard({
  title, value, icon: Icon, color, glow, trend, delay = 0,
}: StatsCardProps) {
  const glowColor = glow || `${color}33`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        position: 'relative',
        background: 'rgba(14,14,31,0.85)',
        border: `1px solid ${color}25`,
        borderRadius: 16,
        padding: '24px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        borderColor: color + '60',
        boxShadow: `0 0 28px ${glowColor}`,
        y: -4,
      }}
    >
      {/* Top glow accent */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
      {/* Corner radial glow */}
      <div
        style={{
          position: 'absolute',
          top: -20, right: -20,
          width: 100, height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(16px)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div
            style={{
              padding: 10, borderRadius: 12,
              background: `${color}18`,
              border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon style={{ color, width: 22, height: 22 }} />
          </div>
          {trend && (
            <span
              style={{
                fontSize: 12, fontWeight: 600,
                padding: '4px 10px', borderRadius: 9999,
                background: trend.isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)',
                color: trend.isPositive ? '#10b981' : '#f43f5e',
                border: `1px solid ${trend.isPositive ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`,
              }}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {/* Value */}
        <div style={{ fontSize: 36, fontWeight: 800, color, lineHeight: 1, marginBottom: 6 }}>
          {value}
        </div>
        <div style={{ fontSize: 13, color: '#7070a0', fontWeight: 500 }}>{title}</div>
      </div>
    </motion.div>
  );
}
