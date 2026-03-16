'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface HorizontalProjectsProps {
  projects: Project[];
  theme: string;
}

export default function HorizontalProjects({ projects, theme }: HorizontalProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 520;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

          // Check if we've reached the end (with small buffer)
          if (currentScroll >= maxScroll - 2) {
            isResetting = true;
            // Instantly reset to beginning
            scrollContainer.scrollLeft = 0;
            setTimeout(() => {
              isResetting = false;
            }, 50);
          } else {
            // Continue scrolling smoothly
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 20); // Smooth scroll speed
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={`text-sm uppercase tracking-[0.3em] mb-4 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Selected Work
          </p>
          <div className="flex items-end justify-between">
            <h2 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`} style={{ letterSpacing: '-0.04em' }}>
              Featured Projects
            </h2>
            {/* Arrow Buttons */}
            <div className="flex gap-3 mb-8 relative z-10">
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
        </motion.div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar px-6"
          style={{ scrollSnapType: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {projects.map((project, index) => {
            const isFlipped = flippedCards.has(project._id);

            return (
              <div
                key={`${project._id}-${index}`}
                className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[450px] lg:w-[500px] h-[500px] sm:h-[550px] md:h-[600px]"
                style={{ perspective: '1000px', scrollSnapAlign: 'start' }}
              >
                <motion.div
                  className="relative w-full h-full cursor-pointer"
                  onClick={(e) => toggleFlip(project._id, e)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 rounded-2xl overflow-hidden ${
                      theme === 'dark' ? 'bg-[#141414]' : 'bg-white'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden group">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'
                        }`}>
                          <span className={`text-9xl font-bold ${
                            theme === 'dark' ? 'text-white/5' : 'text-black/5'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-5 sm:p-6 md:p-8">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} style={{ letterSpacing: '-0.02em' }}>
                        {project.title}
                      </h3>

                      <p className={`text-xs sm:text-sm mb-4 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>

                      {/* Click to flip indicator */}
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Click to flip →
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 p-5 sm:p-6 md:p-8 rounded-2xl overflow-hidden ${
                      theme === 'dark' ? 'bg-[#141414]' : 'bg-white'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <h4 className={`text-lg sm:text-xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      Project Details
                    </h4>

                    <p className={`text-xs sm:text-sm mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h5 className={`text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Technologies:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`text-xs px-3 py-1.5 rounded-full border ${
                              theme === 'dark'
                                ? 'border-gray-800 text-gray-400'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-6">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`px-4 py-2 rounded-full border text-sm transition-all hover:scale-105 ${
                            theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                              : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-black'
                          }`}
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`px-4 py-2 rounded-full border text-sm transition-all hover:scale-105 ${
                            theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                              : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-black'
                          }`}
                        >
                          Live Demo
                        </a>
                      )}
                      <Link
                        href={`/projects/${project._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-4 py-2 rounded-full border text-sm transition-all hover:scale-105 ${
                          theme === 'dark'
                            ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                            : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-black'
                        }`}
                      >
                        View Details
                      </Link>
                    </div>

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
        <div className={`absolute left-0 top-0 bottom-0 w-32 pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
            : 'bg-gradient-to-r from-[#fafafa] to-transparent'
        }`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-32 pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
            : 'bg-gradient-to-l from-[#fafafa] to-transparent'
        }`}></div>
      </div>
    </div>
  );
}
