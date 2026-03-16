'use client';

import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 hover:border-[#C1BFBE]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#C1BFBE]/5 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C1BFBE]/0 group-hover:to-[#C1BFBE]/5 transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                trend.isPositive
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div
            className="text-3xl font-bold transition-colors"
            style={{ color }}
          >
            {value}
          </div>
          <div className="text-sm text-[var(--text-secondary)] font-medium">
            {title}
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-tl-full"
        style={{ background: `radial-gradient(circle at bottom right, ${color}, transparent)` }}
      />
    </motion.div>
  );
}
