'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface WorkExperience {
  _id: string;
  company: string;
  position: string;
  location?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
}

interface HorizontalExperienceProps {
  experiences: WorkExperience[];
  theme: string;
}

export default function HorizontalExperience({
  experiences,
  theme,
}: HorizontalExperienceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 470;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
            Work Experience
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
          style={{ scrollSnapType: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp._id}-${index}`}
              className={`flex-shrink-0 w-[340px] sm:w-[380px] md:w-[420px] lg:w-[450px] p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-[#141414] border-gray-800'
                  : 'bg-white border-gray-200'
              }`}
              style={{ scrollSnapAlign: 'start' }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4 }}
            >
              {/* Company Icon */}
              <div className="mb-5 sm:mb-6">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${
                    theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'
                  }`}
                >
                  <FiBriefcase
                    size={28}
                    className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}
                  />
                </div>
              </div>

              {/* Position */}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-2 text-hover-zoom ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {exp.position}
              </h3>

              {/* Company */}
              <p
                className={`text-base sm:text-lg mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {exp.company}
              </p>

              {/* Location & Duration */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {exp.location && (
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    <FiMapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                )}
                {exp.duration && (
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    📅 {exp.duration}
                  </p>
                )}
              </div>

              {/* Description */}
              {exp.description && (
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {exp.description}
                </p>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 6).map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full border ${
                        theme === 'dark'
                          ? 'border-gray-800 text-gray-500'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
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
