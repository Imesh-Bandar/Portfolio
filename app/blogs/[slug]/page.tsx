'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import {
  FiClock,
  FiEye,
  FiCalendar,
  FiTag,
  FiArrowLeft,
  FiShare2,
  FiUser,
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import toast from 'react-hot-toast';
import '@/components/admin/RichTextEditor.css';
import '../blog-content.css';

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

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug as string);
    }
  }, [params.slug]);

  const fetchBlog = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      const data = await response.json();
      setBlog(data);

      // Fetch related blogs
      fetchRelatedBlogs(data.category, data._id);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Blog not found');
      router.push('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category: string, currentBlogId: string) => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      const related = data
        .filter((b: Blog) =>
          b.isPublished &&
          b.category === category &&
          b._id !== currentBlogId
        )
        .slice(0, 3);
      setRelatedBlogs(related);
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C1BFBE]"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <CustomCursor />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors ${
        theme === 'dark'
          ? 'bg-[#0a0a0a]/80 border-b border-[#2E2622]'
          : 'bg-white/80 border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Home and Back buttons */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    theme === 'dark'
                      ? 'text-white hover:bg-[#141414] border border-[#2E2622]'
                      : 'text-black hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="font-semibold">Home</span>
                </motion.button>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
              <Link href="/blogs">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-[#141414]'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <FiArrowLeft size={16} />
                  <span className="font-semibold">All Blogs</span>
                </motion.button>
              </Link>
            </div>

            {/* Right: Share button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                theme === 'dark'
                  ? 'bg-[#141414] text-white border border-[#2E2622] hover:bg-[#1a1a1a]'
                  : 'bg-gray-50 text-black border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <FiShare2 />
              <span className="font-semibold">Share</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category & Meta */}
          <div className={`flex items-center gap-4 mb-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="bg-[#C1BFBE] text-black px-3 py-1 rounded-full font-semibold">
              {blog.category}
            </span>
            <div className="flex items-center gap-1">
              <FiCalendar size={14} />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye size={14} />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-0.03em' }}>
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className={`text-xl md:text-2xl mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {blog.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-[#C1BFBE]/20' : 'bg-[#C1BFBE]/30'
            }`}>
              <FiUser size={24} className="text-[#C1BFBE]" />
            </div>
            <div>
              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {blog.author}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                Author
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cover Image */}
      {blog.coverImage && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-6 pb-12 max-w-5xl mx-auto"
        >
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.section>
      )}

      {/* Blog Content */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-6 pb-12 max-w-4xl mx-auto"
      >
        <div className={`blog-content prose prose-lg max-w-none ${
          theme === 'dark'
            ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#C1BFBE] prose-strong:text-white prose-code:text-[#C1BFBE] prose-blockquote:text-gray-400 prose-blockquote:border-[#C1BFBE]'
            : 'prose-headings:text-black prose-p:text-gray-700 prose-a:text-[#5F5F60] prose-strong:text-black prose-code:text-[#5F5F60] prose-blockquote:text-gray-600 prose-blockquote:border-[#C1BFBE]'
        }`}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </motion.article>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="px-6 pb-12 max-w-4xl mx-auto"
        >
          <div className={`border-t border-b py-6 ${theme === 'dark' ? 'border-[#2E2622]' : 'border-gray-200'}`}>
            <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              TAGS
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#141414] text-gray-400 hover:bg-[#1a1a1a] hover:text-white border border-[#2E2622]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black border border-gray-200'
                  }`}
                >
                  <FiTag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-6 py-20 max-w-7xl mx-auto"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <Link key={relatedBlog._id} href={`/blogs/${relatedBlog.slug}`}>
                <div className={`group h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  theme === 'dark' ? 'bg-[#141414] hover:bg-[#1a1a1a]' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="relative h-48 overflow-hidden">
                    {relatedBlog.coverImage ? (
                      <Image
                        src={relatedBlog.coverImage}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'
                      }`}>
                        <span className={`text-5xl font-bold ${theme === 'dark' ? 'text-gray-800' : 'text-gray-300'}`}>
                          {relatedBlog.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      <FiClock className="inline mr-1" size={12} />
                      {relatedBlog.readTime} min read
                    </div>
                    <h3 className={`text-lg font-bold line-clamp-2 group-hover:text-[#C1BFBE] transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {relatedBlog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
