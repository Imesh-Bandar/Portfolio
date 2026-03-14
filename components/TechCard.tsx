'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getTechLogoUrl } from '@/lib/utils/techLogos';

interface TechCardProps {
  name: string;
  category?: string;
  iconUrl?: string;
  description?: string;
  color?: string;
  index?: number;
}

export default function TechCard({
  name,
  category,
  iconUrl,
  description,
  color,
  index = 0,
}: TechCardProps) {
  const logoUrl = getTechLogoUrl(name, iconUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
      style={color ? { borderTopColor: color, borderTopWidth: '3px' } : {}}
    >
      <div className="flex flex-col items-center text-center gap-4">
        {logoUrl && (
          <div className="relative w-16 h-16 tech-logo">
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              className="object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            {name}
          </h3>
          {category && (
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {category}
            </span>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
