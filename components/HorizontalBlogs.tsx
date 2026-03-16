'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  readTime: string | number;
  views?: number;
  tags?: string[];
  author?: string;
  isPublished: boolean;
  isFeatured?: boolean;
}

interface HorizontalBlogsProps {
  blogs: Blog[];
  theme: string;
  onBlogClick?: (blog: Blog) => void; // Make optional since we'll use Link
}

export default function HorizontalBlogs({ blogs, theme, onBlogClick }: HorizontalBlogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
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
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-end justify-between">
          <div>
            <motion.h2 className={`text-6xl md:text-7xl lg:text-8xl font-bold flex items-center gap-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.04em' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <FiFileText className="inline-block" size={60} />Blog
            </motion.h2>
            <Link href="/blogs">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`mt-4 px-6 py-2 rounded-full border transition-all ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:border-[#C1BFBE] text-gray-400 hover:text-white'
                    : 'border-gray-300 hover:border-[#C1BFBE] text-gray-500 hover:text-black'
                }`}
              >
                View All Blogs →
              </motion.button>
            </Link>
          </div>
          <div className="flex gap-3 mb-4">
            <button type="button" onClick={() => scroll('left')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronLeft size={24} /></button>
            <button type="button" onClick={() => scroll('right')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronRight size={24} /></button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-6" style={{ scrollSnapType: 'none' }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {publishedBlogs.map((blog, index) => (
            <Link key={`${blog._id}-${index}`} href={`/blogs/${blog.slug}`}>
              <motion.div className={`group flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[400px] h-[480px] sm:h-[510px] md:h-[540px] lg:h-[550px] rounded-2xl overflow-hidden cursor-pointer ${theme === 'dark' ? 'bg-[#141414]' : 'bg-white'}`} style={{ scrollSnapAlign: 'start' }} whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.4 }}>
                <div className="relative h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden">
                  {blog.coverImage ? (
                    <Image src={blog.coverImage} alt={blog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}><FiFileText size={60} className={`${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} sm:w-20 sm:h-20`} /></div>
                  )}
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className={`flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {blog.category && <span>{blog.category}</span>}
                    <div className="flex items-center gap-1"><FiClock size={12} /><span>{typeof blog.readTime === 'number' ? blog.readTime : blog.readTime} min read</span></div>
                    {blog.views !== undefined && <div className="flex items-center gap-1"><FiEye size={12} /><span>{blog.views}</span></div>}
                  </div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2 text-hover-zoom ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.02em' }}>{blog.title}</h3>
                  <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{blog.excerpt}</p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className={`text-xs px-2 sm:px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className={`absolute left-0 top-0 bottom-0 w-32 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent' : 'bg-gradient-to-r from-[#fafafa] to-transparent'}`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-32 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent' : 'bg-gradient-to-l from-[#fafafa] to-transparent'}`}></div>
      </div>
    </div>
  );
}
