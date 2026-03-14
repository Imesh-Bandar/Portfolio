'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AdminCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
}

export default function AdminCard({
  children,
  title,
  description,
  className = '',
  actions
}: AdminCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
    >
      {(title || description || actions) && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              )}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
