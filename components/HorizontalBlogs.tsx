'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  readTime: string;
  views?: number;
  tags?: string[];
  author?: string;
  isPublished: boolean;
  isFeatured?: boolean;
}

interface HorizontalBlogsProps {
  blogs: Blog[];
  theme: string;
  onBlogClick: (blog: Blog) => void;
}

export default function HorizontalBlogs({ blogs, theme, onBlogClick }: HorizontalBlogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-end justify-between">
          <motion.h2 className={`text-6xl md:text-7xl lg:text-8xl font-bold flex items-center gap-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.04em' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <FiFileText className="inline-block" size={60} />Blog
          </motion.h2>
          <div className="flex gap-3 mb-4">
            <button onClick={() => scroll('left')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronLeft size={24} /></button>
            <button onClick={() => scroll('right')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronRight size={24} /></button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-6" style={{ scrollSnapType: 'x mandatory' }}>
          {publishedBlogs.map((blog, index) => (
            <motion.div key={`${blog._id}-${index}`} className={`group flex-shrink-0 w-[400px] h-[550px] rounded-2xl overflow-hidden cursor-pointer ${theme === 'dark' ? 'bg-[#141414]' : 'bg-white'}`} style={{ scrollSnapAlign: 'start' }} whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.4 }} onClick={() => onBlogClick(blog)}>
              <div className="relative h-[280px] overflow-hidden">
                {blog.coverImage ? (
                  <Image src={blog.coverImage} alt={blog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}><FiFileText size={80} className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} /></div>
                )}
              </div>
              <div className="p-6">
                <div className={`flex items-center gap-4 mb-3 text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {blog.category && <span>{blog.category}</span>}
                  <div className="flex items-center gap-1"><FiClock size={12} /><span>{blog.readTime} min read</span></div>
                  {blog.views !== undefined && <div className="flex items-center gap-1"><FiEye size={12} /><span>{blog.views}</span></div>}
                </div>
                <h3 className={`text-2xl font-bold mb-3 line-clamp-2 text-hover-zoom ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.02em' }}>{blog.title}</h3>
                <p className={`text-sm mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{blog.excerpt}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className={`text-xs px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className={`absolute left-0 top-0 bottom-0 w-32 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent' : 'bg-gradient-to-r from-[#fafafa] to-transparent'}`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-32 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent' : 'bg-gradient-to-l from-[#fafafa] to-transparent'}`}></div>
      </div>
    </div>
  );
}
