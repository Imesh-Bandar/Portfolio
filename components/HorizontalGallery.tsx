'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  type: 'photo' | 'video';
}

interface HorizontalGalleryProps {
  gallery: GalleryItem[];
  theme: string;
  onItemClick: (item: GalleryItem) => void;
}

export default function HorizontalGallery({ gallery, theme, onItemClick }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-end justify-between">
          <motion.h2 className={`text-6xl md:text-7xl lg:text-8xl font-bold flex items-center gap-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.04em' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <FiImage className="inline-block" size={60} />Gallery
          </motion.h2>
          <div className="flex gap-3 mb-4">
            <button onClick={() => scroll('left')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronLeft size={24} /></button>
            <button onClick={() => scroll('right')} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${theme === 'dark' ? 'border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black'}`}><FiChevronRight size={24} /></button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-6" style={{ scrollSnapType: 'x mandatory' }}>
          {gallery.map((item, index) => (
            <motion.div key={`${item._id}-${index}`} className={`group relative flex-shrink-0 w-[400px] h-[500px] rounded-2xl overflow-hidden cursor-pointer ${theme === 'dark' ? 'bg-[#141414]' : 'bg-white'}`} style={{ scrollSnapAlign: 'start' }} whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.4 }} onClick={() => onItemClick(item)}>
              <div className="relative h-full">
                {item.type === 'photo' && item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : item.type === 'video' ? (
                  <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}><FiPlay size={80} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} /></div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}><FiImage size={80} className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} /></div>
                )}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm flex flex-col items-center justify-center p-6`}>
                  <h3 className={`text-2xl font-bold mb-2 text-center text-hover-zoom ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.02em' }}>{item.title}</h3>
                  {item.description && <p className={`text-sm text-center line-clamp-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>}
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${theme === 'dark' ? 'bg-black/60 text-white' : 'bg-white/60 text-black'} backdrop-blur-sm`}>{item.type}</span>
                </div>
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
