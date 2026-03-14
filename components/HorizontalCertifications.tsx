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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 370;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
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
          {certifications.map((cert, index) => (
            <motion.div
              key={`${cert._id}-${index}`}
              className={`flex-shrink-0 w-[350px] rounded-2xl overflow-hidden cursor-pointer border ${
                theme === 'dark' ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'
              }`}
              style={{ scrollSnapAlign: 'start' }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4 }}
              onClick={() => cert.credentialUrl && window.open(cert.credentialUrl, '_blank')}
            >
              {/* Certificate Image */}
              <div className="relative h-[250px] overflow-hidden">
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
              <div className="p-6 flex flex-col h-[calc(100%-250px)]">
                <h3
                  className={`text-xl font-bold mb-2 line-clamp-2 text-hover-zoom ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {cert.title}
                </h3>

                <p
                  className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {cert.issuer}
                </p>

                <p
                  className={`text-xs mb-3 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {new Date(cert.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </p>

                {cert.description && (
                  <p
                    className={`text-sm mb-4 line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    {cert.description}
                  </p>
                )}

                {cert.credentialUrl && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400 transition-colors mt-auto">
                    <FiExternalLink size={16} />
                    <span>View Credential</span>
                  </div>
                )}
              </div>
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
