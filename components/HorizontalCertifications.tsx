'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface Certification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description?: string;
  credentialUrl?: string;
  imageUrl?: string;
}

interface HorizontalCertificationsProps {
  certifications: Certification[];
  theme: string;
}

export default function HorizontalCertifications({
  certifications,
  theme,
}: HorizontalCertificationsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 370;
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
            Certifications
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
          {certifications.map((cert, index) => {
            const isFlipped = flippedCards.has(cert._id);

            return (
              <div
                key={`${cert._id}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] h-[420px] sm:h-[450px]"
                style={{ perspective: '1000px', scrollSnapAlign: 'start' }}
              >
                <motion.div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => toggleFlip(cert._id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 rounded-2xl overflow-hidden border ${
                      theme === 'dark' ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Certificate Image */}
                    <div className="relative h-[200px] sm:h-[230px] md:h-[250px] overflow-hidden">
                      {cert.imageUrl ? (
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'
                          }`}
                        >
                          <FiAward
                            size={80}
                            className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}
                          />
                        </div>
                      )}
                    </div>

                    {/* Certificate Info */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3
                        className={`text-lg sm:text-xl font-bold mb-2 line-clamp-2 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {cert.title}
                      </h3>

                      <p
                        className={`text-sm mb-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {cert.issuer}
                      </p>

                      {/* Click to flip indicator */}
                      <div className={`text-xs mt-4 ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Click to flip →
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 p-4 sm:p-5 md:p-6 rounded-2xl border overflow-auto ${
                      theme === 'dark' ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <h4 className={`text-lg font-bold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {cert.title}
                    </h4>

                    <p
                      className={`text-sm mb-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Issued by: {cert.issuer}
                    </p>

                    <p
                      className={`text-xs mb-4 ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {new Date(cert.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>

                    {cert.description && (
                      <p
                        className={`text-sm mb-4 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {cert.description}
                      </p>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all hover:scale-105 ${
                          theme === 'dark'
                            ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                            : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-black'
                        }`}
                      >
                        <FiExternalLink size={16} />
                        <span>View Credential</span>
                      </a>
                    )}

                    {/* Click to flip back indicator */}
                    <div className={`absolute bottom-4 right-4 text-xs ${
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
