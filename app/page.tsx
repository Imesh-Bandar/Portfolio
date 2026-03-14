'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import DoodleBackground from '@/components/DoodleBackground';
import HorizontalProjects from '@/components/HorizontalProjects';
import HorizontalSkills from '@/components/HorizontalSkills';
import HorizontalTechnologies from '@/components/HorizontalTechnologies';
import HorizontalExperience from '@/components/HorizontalExperience';
import HorizontalEducation from '@/components/HorizontalEducation';
import HorizontalCertifications from '@/components/HorizontalCertifications';
import HorizontalGallery from '@/components/HorizontalGallery';
import HorizontalBlogs from '@/components/HorizontalBlogs';
import ScrollIndicator from '@/components/ScrollIndicator';
import Image from 'next/image';
import { getTechLogoUrl } from '@/lib/utils/techLogos';
import DetailModal from '@/components/DetailModal';
import CustomCursor from '@/components/CustomCursor';
import SectionTransition from '@/components/SectionTransition';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState({
    projects: [],
    skills: [],
    technologies: [],
    certifications: [],
    education: [],
    workExperiences: [],
    gallery: [],
    blogs: [],
    about: {
      title: 'About Me',
      description1: 'I am a Trainee Software Engineer.',
      description2: 'Passionate about building high-performance applications.',
      imageUrl: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'project' | 'skill' | 'education' | 'experience' | 'certification' | 'blog' | 'gallery' | 'technology'>('project');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = (item: any, type: typeof modalType) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  useEffect(() => {
    fetchData();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'gallery', 'blog'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const fetchData = async () => {
    try {
      const [projects, skills, technologies, certifications, education, workExperiences, gallery, blogs, about] = await Promise.all([
        fetch('/api/projects', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/skills', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/technologies', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/certifications', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/education', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/work-experience', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/gallery', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/blogs', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/about', { cache: 'no-store' }).then((r) => r.json()),
      ]);

      setData({ projects, skills, technologies, certifications, education, workExperiences, gallery, blogs, about });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0C0C08]' : 'bg-[#C1BFBE]/10'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></div>
          <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Doodle Background */}
      <DoodleBackground />

      {/* Minimalist Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0a0a0a]/80 border-[#1a1a1a]'
          : 'bg-[#fafafa]/80 border-[#e0e0e0]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <a href="#home" className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Imesh Bandara
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === item.toLowerCase()
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item}
                </a>
              ))}
              <motion.button
                onClick={toggleTheme}
                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                  theme === 'dark'
                    ? 'border-[#2a2a2a] hover:border-[#3a3a3a] text-gray-400'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-4">
              <motion.button
                onClick={toggleTheme}
                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                  theme === 'dark'
                    ? 'border-[#2a2a2a] hover:border-[#3a3a3a] text-gray-400'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
              </motion.button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                  theme === 'dark'
                    ? 'border-[#2a2a2a] hover:border-[#3a3a3a] text-gray-400'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                {isMobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              theme === 'dark' ? 'border-[#1a1a1a] bg-[#0a0a0a]/95' : 'border-[#e0e0e0] bg-[#fafafa]/95'
            }`}
          >
            <div className="px-6 py-4 space-y-3">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm tracking-wide transition-colors py-2 ${
                    activeSection === item.toLowerCase()
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className={`transition-colors ${
        theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-black'
      }`}>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated gradient background with dynamic mouse tracking */}
          <motion.div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: theme === 'dark'
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 64, 64, 0.15), rgba(48, 48, 48, 0.12), rgba(32, 32, 32, 0.1), rgba(16, 16, 16, 0.08))`
                : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(224, 224, 224, 0.2), rgba(208, 208, 208, 0.15), rgba(192, 192, 192, 0.12), rgba(176, 176, 176, 0.08))`
            }}
            animate={{
              background: theme === 'dark' ? [
                'radial-gradient(circle at 20% 30%, rgba(64, 64, 64, 0.15), rgba(48, 48, 48, 0.12), rgba(32, 32, 32, 0.1), rgba(16, 16, 16, 0.08))',
                'radial-gradient(circle at 80% 70%, rgba(48, 48, 48, 0.15), rgba(32, 32, 32, 0.12), rgba(16, 16, 16, 0.1), rgba(64, 64, 64, 0.08))',
                'radial-gradient(circle at 50% 50%, rgba(32, 32, 32, 0.15), rgba(16, 16, 16, 0.12), rgba(64, 64, 64, 0.1), rgba(48, 48, 48, 0.08))',
                'radial-gradient(circle at 20% 30%, rgba(64, 64, 64, 0.15), rgba(48, 48, 48, 0.12), rgba(32, 32, 32, 0.1), rgba(16, 16, 16, 0.08))',
              ] : [
                'radial-gradient(circle at 20% 30%, rgba(224, 224, 224, 0.2), rgba(208, 208, 208, 0.15), rgba(192, 192, 192, 0.12), rgba(176, 176, 176, 0.08))',
                'radial-gradient(circle at 80% 70%, rgba(208, 208, 208, 0.2), rgba(192, 192, 192, 0.15), rgba(176, 176, 176, 0.12), rgba(224, 224, 224, 0.08))',
                'radial-gradient(circle at 50% 50%, rgba(192, 192, 192, 0.2), rgba(176, 176, 176, 0.15), rgba(224, 224, 224, 0.12), rgba(208, 208, 208, 0.08))',
                'radial-gradient(circle at 20% 30%, rgba(224, 224, 224, 0.2), rgba(208, 208, 208, 0.15), rgba(192, 192, 192, 0.12), rgba(176, 176, 176, 0.08))',
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>

          {/* Developer Doodle Background */}
          <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-40' : 'opacity-10'}`}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="codeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: theme === 'dark' ? '#4a4a4a' : '#a0a0a0', stopOpacity: 1 }} />
                  <stop offset="33%" style={{ stopColor: theme === 'dark' ? '#3a3a3a' : '#b0b0b0', stopOpacity: 1 }} />
                  <stop offset="66%" style={{ stopColor: theme === 'dark' ? '#2a2a2a' : '#c0c0c0', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: theme === 'dark' ? '#1a1a1a' : '#d0d0d0', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="codeGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: theme === 'dark' ? '#5a5a5a' : '#909090', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: theme === 'dark' ? '#3a3a3a' : '#b0b0b0', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: theme === 'dark' ? '#2a2a2a' : '#c0c0c0', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Code brackets with animation */}
              <text x="10%" y="20%" fontSize="120" fill="url(#codeGradient1)" fontFamily="monospace">&lt;/&gt;</text>
              <text x="80%" y="80%" fontSize="100" fill="url(#codeGradient2)" fontFamily="monospace">{'{ }'}</text>
              {/* Code symbols */}
              <circle cx="15%" cy="60%" r="30" stroke="url(#codeGradient1)" strokeWidth="3" fill="none" />
              <circle cx="85%" cy="30%" r="25" stroke="url(#codeGradient2)" strokeWidth="3" fill="none" />
              <path d="M 50 100 L 100 150 L 50 200 L 0 150 Z" transform="translate(200, 400)" stroke="url(#codeGradient1)" strokeWidth="3" fill="none" />
              <rect x="70%" y="50%" width="60" height="60" stroke="url(#codeGradient2)" strokeWidth="3" fill="none" />
              <polygon points="200,50 220,90 180,90" transform="translate(600, 300)" stroke="url(#codeGradient1)" strokeWidth="3" fill="none" />
            </svg>
          </div>

          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                background: theme === 'dark' ? [
                  'radial-gradient(circle, rgba(64, 64, 64, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(48, 48, 48, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(32, 32, 32, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(64, 64, 64, 0.25) 0%, transparent 70%)',
                ] : [
                  'radial-gradient(circle, rgba(192, 192, 192, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(208, 208, 208, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(224, 224, 224, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(192, 192, 192, 0.3) 0%, transparent 70%)',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                background: theme === 'dark' ? [
                  'radial-gradient(circle, rgba(48, 48, 48, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(32, 32, 32, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(16, 16, 16, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(48, 48, 48, 0.25) 0%, transparent 70%)',
                ] : [
                  'radial-gradient(circle, rgba(208, 208, 208, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(192, 192, 192, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(176, 176, 176, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(208, 208, 208, 0.3) 0%, transparent 70%)',
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            ></motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.25, 0.15],
                background: theme === 'dark' ? [
                  'radial-gradient(circle, rgba(32, 32, 32, 0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(48, 48, 48, 0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(64, 64, 64, 0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(32, 32, 32, 0.2) 0%, transparent 70%)',
                ] : [
                  'radial-gradient(circle, rgba(224, 224, 224, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(208, 208, 208, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(192, 192, 192, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(224, 224, 224, 0.25) 0%, transparent 70%)',
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
          </div>

          {/* Minimalist Hero Content */}
          <div className="relative max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl">
              {/* Intro Label */}
              <motion.p
                className={`text-xs md:text-sm uppercase tracking-[0.3em] mb-8 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Software Engineer / Full Stack Developer
              </motion.p>

              {/* Large Hero Typography - Typewriter Animation */}
              <motion.h1
                className={`text-[7vw] md:text-[8vw] lg:text-[7.5vw] font-bold leading-[0.9] mb-12 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
                style={{ letterSpacing: '-0.04em' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {"Hey, I'm".split(' ').map((word, wIdx, arr) => {
                    const charOffset = arr.slice(0, wIdx).join(' ').length + (wIdx > 0 ? 1 : 0);
                    return (
                      <span key={`w1-${wIdx}`} style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                        {Array.from(word).map((char, cIdx) => (
                          <motion.span
                            key={`l1-${charOffset + cIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: 0.6 + (charOffset + cIdx) * 0.08 }}
                            style={{ display: 'inline-block' }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        {wIdx < arr.length - 1 && (
                          <motion.span
                            key={`s1-${wIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: 0.6 + (charOffset + word.length) * 0.08 }}
                            style={{ display: 'inline' }}
                          >&nbsp;</motion.span>
                        )}
                      </span>
                    );
                  })}
                </span>
                <span className="block">
                  {"Imesh Bandara".split(' ').map((word, wIdx, arr) => {
                    const charOffset = arr.slice(0, wIdx).join(' ').length + (wIdx > 0 ? 1 : 0);
                    return (
                      <span key={`w2-${wIdx}`} style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                        {Array.from(word).map((char, cIdx) => (
                          <motion.span
                            key={`l2-${charOffset + cIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: 1.3 + (charOffset + cIdx) * 0.08 }}
                            style={{ display: 'inline-block' }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        {wIdx < arr.length - 1 && (
                          <motion.span
                            key={`s2-${wIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: 1.3 + (charOffset + word.length) * 0.08 }}
                            style={{ display: 'inline' }}
                          >&nbsp;</motion.span>
                        )}
                      </span>
                    );
                  })}
                  {/* Blinking cursor */}
                  <motion.span
                    className={`inline-block w-[3px] ml-1 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    }`}
                    style={{ height: '0.85em', verticalAlign: 'baseline' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-lg md:text-xl max-w-2xl mb-16 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Crafting elegant solutions with modern technologies. Specialized in MERN, MEAN, Laravel & Microservices Architecture.
              </motion.p>

              {/* CTA Links */}
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <a
                  href="#projects"
                  className={`group inline-flex items-center gap-3 text-base md:text-lg transition-colors ${
                    theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'
                  }`}
                >
                  → See my projects
                </a>
                <a
                  href="#about"
                  className={`group inline-flex items-center gap-3 text-base md:text-lg transition-colors ${
                    theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  → More about me
                </a>
              </motion.div>

              {/* Social Links - Minimal */}
              <motion.div
                className="flex gap-6 mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <a
                  href="https://github.com/Imesh-Bandar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  GitHub ↗
                </a>
                <a
                  href="https://linkedin.com/in/YOUR_PROFILE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  LinkedIn ↗
                </a>
                <a
                  href="mailto:imesh.fsd.info@gmail.com"
                  className={`text-sm transition-colors ${
                    theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Email ↗
                </a>
                <a
                  href="https://wa.me/94704394523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  WhatsApp ↗
                </a>
              </motion.div>
            </div>

            {/* Footer Credit - Bottom of Hero */}
            <motion.div
              className={`absolute bottom-12 left-6 right-6 flex justify-between items-center text-xs ${
                theme === 'dark' ? 'text-gray-700' : 'text-gray-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span>Designed and coded by Imesh © 2025</span>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator theme={theme} />
          </div>
        </section>

        {/* About Section */}
        <SectionTransition id="about" className="py-32 relative" animationType="circle-expand" sectionName="About Me">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                style={{ letterSpacing: '-0.04em' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {data.about?.title || 'About Me'}
              </motion.h2>

              <div className={`backdrop-blur border rounded-2xl p-8 ${
                theme === 'dark'
                  ? 'bg-[#C1BFBE]/20 dark:bg-[#2E2622] border-[#4C4D4E]'
                  : 'bg-[#C1BFBE]/10/50 border-[#5F5F60]/30 shadow-lg'
              }`}>
                <div className={`flex flex-col md:flex-row gap-10 items-center md:items-start`}>
                  {/* Text Content */}
                  <div className={`flex-1 ${!data.about?.imageUrl ? 'md:col-span-2' : ''}`}>
                    <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.about?.description1}
                    </p>
                    <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.about?.description2}
                    </p>
                  </div>

                  {/* Profile Image with Loading and Transition Effects */}
                  {data.about?.imageUrl && (
                    <motion.div 
                      className="w-full md:w-1/3 relative flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ${
                        theme === 'dark' ? 'bg-[#1a1a1a]/50' : 'bg-gray-200'
                      }`}>
                        <Image
                          src={data.about.imageUrl}
                          alt="Profile"
                          fill
                          className="object-cover transition-opacity duration-700 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority
                          unoptimized={true}
                        />
                        <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-colors duration-300 ${
                          theme === 'dark' ? 'border-[#4C4D4E]' : 'border-[#5F5F60]/30'
                        }`} />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t ${theme === 'dark' ? 'border-[#4C4D4E]' : 'border-[#5F5F60]/30'}`}>
                  <div>
                    <h3 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.projects.length}+</h3>
                    <p className="text-sm text-gray-500">Projects</p>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.skills.length}+</h3>
                    <p className="text-sm text-gray-500">Skills</p>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.technologies.length}+</h3>
                    <p className="text-sm text-gray-500">Technologies</p>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.certifications.length}+</h3>
                    <p className="text-sm text-gray-500">Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* Technologies Section */}
        {data.technologies.length > 0 && (
          <SectionTransition animationType="wave-in" sectionName="Technologies">
            <HorizontalTechnologies
              technologies={data.technologies}
              theme={theme}
              getTechLogoUrl={getTechLogoUrl}
            />
          </SectionTransition>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <SectionTransition animationType="flip-in" sectionName="Skills">
            <HorizontalSkills skills={data.skills} theme={theme} />
          </SectionTransition>
        )}

        {/* Horizontal Scrolling Projects Section */}
        {data.projects.length > 0 && data.projects.filter((p: any) => p.isFeatured).length > 0 && (
          <SectionTransition animationType="zoom-rotate" id="work" sectionName="Projects">
            <HorizontalProjects
              projects={data.projects.filter((p: any) => p.isFeatured)}
              theme={theme}
            />
          </SectionTransition>
        )}

        {/* Work Experience Section */}
        {data.workExperiences.length > 0 && (
          <SectionTransition animationType="slide-right" sectionName="Experience">
            <HorizontalExperience experiences={data.workExperiences} theme={theme} />
          </SectionTransition>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <SectionTransition animationType="slide-left" sectionName="Education">
            <HorizontalEducation education={data.education} theme={theme} />
          </SectionTransition>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <SectionTransition animationType="blur-in" sectionName="Certifications">
            <HorizontalCertifications certifications={data.certifications} theme={theme} />
          </SectionTransition>
        )}

        {/* Photo Gallery Section */}
        {data.gallery.length > 0 && (
          <SectionTransition animationType="rotate-in" sectionName="Gallery">
            <HorizontalGallery
              gallery={data.gallery.filter((item: any) => item.isFeatured)}
              theme={theme}
              onItemClick={(item) => openModal(item, 'gallery')}
            />
          </SectionTransition>
        )}

        {/* Blog Section */}
        {data.blogs.length > 0 && (
          <SectionTransition animationType="blur-in" sectionName="Blog">
            <HorizontalBlogs
              blogs={data.blogs}
              theme={theme}
              onBlogClick={(blog) => openModal(blog, 'blog')}
            />
          </SectionTransition>
        )}

        {/* Contact Section */}
        <SectionTransition id="contact" className={`py-24 relative ${theme === 'dark' ? 'bg-[#C1BFBE]/5' : 'bg-gray-50/50'}`} animationType="scale-up" sectionName="Get In Touch">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Let&apos;s Work Together
            </h2>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind? Let&apos;s create something amazing together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:imesh.fsd.info@gmail.com"
                className={`px-8 py-4 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <FiMail size={20} />
                Send Email
              </a>
              <a
                href="https://github.com/Imesh-Bandar"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-lg font-medium transition-colors border flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-[#4C4D4E] hover:bg-[#4C4D4E] text-[#C1BFBE] border-[#5F5F60]'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
                }`}
              >
                <FiGithub size={20} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/YOUR_PROFILE"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-lg font-medium transition-colors border flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-[#4C4D4E] hover:bg-[#4C4D4E] text-[#C1BFBE] border-[#5F5F60]'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
                }`}
              >
                <FiLinkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://wa.me/94704394523"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-lg font-medium transition-colors border flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border-[#25D366]/40'
                    : 'bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border-[#25D366]/30'
                }`}
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </SectionTransition>

        {/* Footer */}
        <footer className={`py-12 border-t ${theme === 'dark' ? 'border-[#4C4D4E]' : 'border-[#5F5F60]/30'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} Imesh Bandara. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://github.com/Imesh-Bandar" target="_blank" rel="noopener noreferrer" className={`transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-[#C1BFBE]' : 'text-gray-600 hover:text-gray-900'}`}>
                  <FiGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C1BFBE] transition-colors">
                  <FiLinkedin size={20} />
                </a>
                <a href="mailto:imesh.fsd.info@gmail.com" className="text-gray-500 hover:text-[#C1BFBE] transition-colors">
                  <FiMail size={20} />
                </a>
                <a href="https://wa.me/94704394523" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#25D366] transition-colors">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        type={modalType}
      />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/94704394523"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </motion.a>
    </>
  );
}
