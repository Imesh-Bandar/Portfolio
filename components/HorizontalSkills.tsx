'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
  percentage?: number;
  iconUrl?: string;
}

interface HorizontalSkillsProps {
  skills: Skill[];
  theme: string;
}

export default function HorizontalSkills({ skills, theme }: HorizontalSkillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let isResetting = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer && !isResetting) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;

          if (currentScroll >= maxScroll - 2) {
            isResetting = true;
            scrollContainer.scrollLeft = 0;
            setTimeout(() => {
              isResetting = false;
            }, 50);
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 20);
    };

    startAutoScroll();

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isPaused]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
      case 'advanced':
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
      case 'intermediate':
        return theme === 'dark' ? 'text-gray-500' : 'text-gray-500';
      default:
        return theme === 'dark' ? 'text-gray-600' : 'text-gray-400';
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
            Skills & Expertise
          </motion.h2>
          {/* Arrow Buttons */}
          <div className="flex gap-3 mb-4 relative z-10">
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
          style={{ scrollSnapType: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {skills.map((skill, index) => {
            const isFlipped = flippedCards.has(skill._id);

            return (
              <div
                key={`${skill._id}-${index}`}
                className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] h-[280px] sm:h-[300px]"
                style={{ perspective: '1000px', scrollSnapAlign: 'start' }}
              >
                <motion.div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => toggleFlip(skill._id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-8 rounded-2xl border ${
                      theme === 'dark'
                        ? 'bg-[#141414] border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Skill Category */}
                    <div className="mb-4">
                      <span
                        className={`text-xs uppercase tracking-[0.2em] ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {skill.name}
                    </h3>

                    {/* Level */}
                    <p className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </p>

                    {/* Click to flip indicator */}
                    <div className={`absolute bottom-6 right-6 text-xs ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Click to flip →
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-8 rounded-2xl border ${
                      theme === 'dark'
                        ? 'bg-[#141414] border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <h4 className={`text-lg font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {skill.name}
                    </h4>

                    <div className="mb-4">
                      <p className={`text-sm font-medium mb-2 ${getLevelColor(skill.level)}`}>
                        Level: {skill.level}
                      </p>
                      {skill.percentage !== undefined && (
                        <span className={`text-xs font-bold ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Proficiency: {skill.percentage}%
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {skill.percentage !== undefined && (
                      <div className={`w-full h-2 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className={`h-full rounded-full ${
                            theme === 'dark' ? 'bg-gray-400' : 'bg-gray-700'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    )}

                    {/* Click to flip back indicator */}
                    <div className={`absolute bottom-6 right-6 text-xs ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      ← Click to flip back
                    </div>
                  </div>
                </motion.div>
              </div>
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
