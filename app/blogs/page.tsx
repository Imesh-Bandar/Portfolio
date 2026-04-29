'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { FiClock, FiEye, FiCalendar, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import CustomCursor from '@/components/CustomCursor';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  readTime: number;
  publishedAt?: string;
  createdAt: string;
}

export default function BlogsPage() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchQuery, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      const publishedBlogs = data.filter((blog: Blog) => blog.isPublished);
      setBlogs(publishedBlogs);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(publishedBlogs.map((blog: Blog) => blog.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C1BFBE]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <CustomCursor />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors ${
        theme === 'dark'
          ? 'bg-[#0a0a0a]/80 border-b border-[#2E2622]'
          : 'bg-white/80 border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  theme === 'dark' ? 'text-white hover:text-[#C1BFBE]' : 'text-black hover:text-[#5F5F60]'
                }`}
              >
                ← Home
              </motion.button>
            </Link>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              All Blogs
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.04em' }}>
            Blog
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Thoughts, tutorials, and insights on software development, technology, and more.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all ${
                theme === 'dark'
                  ? 'bg-[#141414] border-[#2E2622] text-white placeholder-gray-600 focus:border-[#C1BFBE]'
                  : 'bg-white border-gray-200 text-black placeholder-gray-400 focus:border-[#C1BFBE]'
              } focus:outline-none`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-[#C1BFBE] text-black font-semibold'
                    : theme === 'dark'
                    ? 'bg-[#141414] text-gray-400 hover:bg-[#1a1a1a] hover:text-white border border-[#2E2622]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
          >
            <p className="text-xl">No blogs found matching your criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <div className={`group h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-[#141414] hover:bg-[#1a1a1a]' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    {/* Cover Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.coverImage ? (
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'
                        }`}>
                          <span className={`text-6xl font-bold ${theme === 'dark' ? 'text-gray-800' : 'text-gray-300'}`}>
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {blog.isFeatured && (
                        <div className="absolute top-4 right-4 bg-[#C1BFBE] text-black px-3 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className={`flex items-center gap-4 mb-3 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        <span className="bg-[#C1BFBE]/20 text-[#C1BFBE] px-2 py-1 rounded-full font-semibold">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FiClock size={12} />
                          <span>{blog.readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye size={12} />
                          <span>{blog.views}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#C1BFBE] transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} style={{ letterSpacing: '-0.02em' }}>
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`text-sm mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <FiCalendar className="inline mr-1" size={12} />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                          theme === 'dark' ? 'text-[#C1BFBE]' : 'text-[#5F5F60]'
                        }`}>
                          Read More
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded-full ${
                                theme === 'dark'
                                  ? 'bg-[#1a1a1a] text-gray-500'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              <FiTag className="inline mr-1" size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
