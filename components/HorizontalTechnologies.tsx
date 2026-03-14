'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Technology {
  _id: string;
  name: string;
  category: string;
  iconUrl?: string;
}

interface HorizontalTechnologiesProps {
  technologies: Technology[];
  theme: string;
  getTechLogoUrl: (name: string, iconUrl?: string) => string;
}

export default function HorizontalTechnologies({
  technologies,
  theme,
  getTechLogoUrl,
}: HorizontalTechnologiesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative overflow-hidden py-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-end justify-between">
          <motion.h2
            className={`text-6xl md:text-7xl lg:text-8xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ letterSpacing: '-0.04em' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Tech Stack
          </motion.h2>
          {/* Arrow Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => scroll('left')}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                  : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'
              }`}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                  : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'
              }`}
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar px-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {technologies.map((tech, index) => {
            const logoUrl = getTechLogoUrl(tech.name, tech.iconUrl);

            return (
              <motion.div
                key={`${tech._id}-${index}`}
                className={`flex-shrink-0 w-[280px] p-8 rounded-2xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-[#141414] border-gray-800 hover:border-gray-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                style={{ scrollSnapAlign: 'start' }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Tech Logo */}
                <div className="flex items-center justify-center h-24 mb-6">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={tech.name}
                      width={80}
                      height={80}
                      className="object-contain tech-logo"
                    />
                  ) : (
                    <div
                      className={`text-5xl font-bold ${
                        theme === 'dark' ? 'text-white/10' : 'text-black/10'
                      }`}
                    >
                      {tech.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Tech Name */}
                <h3
                  className={`text-xl font-bold text-center mb-2 text-hover-zoom ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {tech.name}
                </h3>

                {/* Tech Category */}
                <p
                  className={`text-xs uppercase tracking-[0.2em] text-center ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {tech.category}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Gradient Overlays */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-32 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
              : 'bg-gradient-to-r from-[#fafafa] to-transparent'
          }`}
        ></div>
        <div
          className={`absolute right-0 top-0 bottom-0 w-32 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
              : 'bg-gradient-to-l from-[#fafafa] to-transparent'
          }`}
        ></div>
      </div>
    </div>
  );
}
