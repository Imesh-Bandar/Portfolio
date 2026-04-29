'use client';

import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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
import WaveDivider from '@/components/WaveDivider';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleBackground from '@/components/ParticleBackground';
import CSSWave from '@/components/CSSWave';
import SideNav from '@/components/SideNav';
import SectionHeader from '@/components/SectionHeader';
import BubbleBackground from '@/components/BubbleBackground';

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
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'project' | 'skill' | 'education' | 'experience' | 'certification' | 'blog' | 'gallery' | 'technology'>('project');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'gallery', 'blog', 'contact'];
    const scrollPosition = window.scrollY + 100;

    // Scroll progress
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

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

  if (showLoadingScreen) {
    return (
      <LoadingScreen
        onComplete={() => setShowLoadingScreen(false)}
        theme={theme}
      />
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-[#fafafe]'}`}>
        <div className="flex flex-col items-center gap-4">
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#6366f1',
            borderRightColor: '#a855f7',
            animation: 'loading-spin 0.8s linear infinite',
          }} />
          <p className="gradient-text-indigo font-medium text-sm">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Doodle Background */}
      <DoodleBackground />

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 nav-glow"
        style={{
          background: theme === 'dark' ? 'rgba(8,8,18,0.88)' : 'rgba(250,251,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: theme === 'dark' ? '1px solid rgba(99,102,241,0.10)' : '1px solid rgba(99,102,241,0.12)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between" style={{ height: 68 }}>
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 14, color: '#fff',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                transition: 'box-shadow 0.3s ease',
              }}>IB</div>
              <span style={{
                fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em',
                color: theme === 'dark' ? '#e8e8ff' : '#0a0a1a',
              }}>Imesh Bandara</span>
            </a>

            {/* Desktop nav pills */}
            <div className="hidden md:flex items-center" style={{ gap: 4, background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.04)', borderRadius: 12, padding: '4px', border: theme === 'dark' ? '1px solid rgba(99,102,241,0.10)' : '1px solid rgba(99,102,241,0.12)' }}>
              {[['home','Home'],['about','About'],['projects','Work'],['contact','Contact']].map(([id, label]) => {
                const isAct = activeSection === id;
                return (
                  <a key={id} href={`#${id}`} style={{
                    padding: '6px 16px', borderRadius: 9, fontSize: 13, fontWeight: 500,
                    transition: 'all 0.2s ease',
                    background: isAct ? 'linear-gradient(135deg, #6366f1, #7c3aed)' : 'transparent',
                    color: isAct ? '#fff' : theme === 'dark' ? '#9090b0' : '#4a4a6a',
                    boxShadow: isAct ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
                  }}>{label}</a>
                );
              })}
            </div>

            {/* Right side: theme + mobile */}
            <div className="flex items-center gap-3">
              <motion.button onClick={toggleTheme} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: theme === 'dark' ? '1px solid rgba(99,102,241,0.15)' : '1px solid rgba(99,102,241,0.18)', background: theme === 'dark' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)', color: '#6366f1', cursor: 'pointer' }}
              >
                {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
              </motion.button>
              <button type="button" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', background: 'transparent', color: theme === 'dark' ? '#9090b0' : '#4a4a6a', cursor: 'pointer' }}
              >
                {isMobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ borderTop: theme === 'dark' ? '1px solid rgba(99,102,241,0.10)' : '1px solid rgba(99,102,241,0.12)', overflow: 'hidden' }}
            >
              <div className="px-6 py-5 flex flex-col gap-2">
                {[['home','Home'],['about','About'],['projects','Work'],['contact','Contact']].map(([id, label]) => (
                  <a key={id} href={`#${id}`} onClick={() => setIsMobileMenuOpen(false)}
                    style={{ padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500, color: activeSection === id ? '#6366f1' : theme === 'dark' ? '#9090b0' : '#4a4a6a', background: activeSection === id ? 'rgba(99,102,241,0.08)' : 'transparent', transition: 'all 0.2s' }}
                  >{label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    <main className="min-h-screen relative overflow-x-hidden transition-colors duration-500">

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <BubbleBackground theme={theme} count={15} opacity={theme === 'dark' ? 0.08 : 0.05} />
        <CSSWave theme={theme} position="bottom" height={120} speed="slow" opacity={0.6} />
      </div>

      <CustomCursor theme={theme} />
      <SideNav
        theme={theme}
        activeSection={activeSection}
        sections={[
          { id: 'home', label: 'Home', icon: '⌂' },
          { id: 'about', label: 'About', icon: '◎' },
          { id: 'skills', label: 'Skills', icon: '⚡' },
          { id: 'projects', label: 'Projects', icon: '◈' },
          { id: 'experience', label: 'Experience', icon: '◉' },
          { id: 'contact', label: 'Contact', icon: '✉' },
        ]}
      />


      <section id="home" className="relative min-h-screen overflow-hidden flex items-center pt-20">
          {/* Animated Background elements for Hero only */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
            {/* Card 1 — top right */}
            <div style={{ position: 'absolute', top: '18%', right: '8%', animation: 'float-badge 5s ease-in-out infinite', animationDelay: '0s' }}>
              <div style={{ padding: '12px 18px', borderRadius: 16, background: theme === 'dark' ? 'rgba(14,14,31,0.75)' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🚀</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3+</div>
                  <div style={{ fontSize: 10, color: theme === 'dark' ? '#7070a0' : '#8888a8', fontWeight: 500 }}>Years Exp.</div>
                </div>
              </div>
            </div>
            {/* Card 2 — mid right */}
            <div style={{ position: 'absolute', top: '38%', right: '4%', animation: 'float-badge 6s ease-in-out infinite', animationDelay: '-2s' }}>
              <div style={{ padding: '12px 18px', borderRadius: 16, background: theme === 'dark' ? 'rgba(14,14,31,0.75)' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(16,185,129,0.25)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>✅</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>20+</div>
                  <div style={{ fontSize: 10, color: theme === 'dark' ? '#7070a0' : '#8888a8', fontWeight: 500 }}>Projects Done</div>
                </div>
              </div>
            </div>
            {/* Card 3 — bottom left */}
            <div style={{ position: 'absolute', bottom: '22%', left: '4%', animation: 'float-badge 7s ease-in-out infinite', animationDelay: '-1s' }} className="hidden lg:block">
              <div style={{ padding: '12px 18px', borderRadius: 16, background: theme === 'dark' ? 'rgba(14,14,31,0.75)' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#a855f7,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>MERN</div>
                  <div style={{ fontSize: 10, color: theme === 'dark' ? '#7070a0' : '#8888a8', fontWeight: 500 }}>Full Stack</div>
                </div>
              </div>
            </div>
            {/* Card 4 — top mid-right */}
            <div style={{ position: 'absolute', top: '58%', right: '12%', animation: 'float-badge 5.5s ease-in-out infinite', animationDelay: '-3s' }} className="hidden lg:block">
              <div style={{ padding: '12px 18px', borderRadius: 16, background: theme === 'dark' ? 'rgba(14,14,31,0.75)' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(6,182,212,0.25)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🌐</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>10+</div>
                  <div style={{ fontSize: 10, color: theme === 'dark' ? '#7070a0' : '#8888a8', fontWeight: 500 }}>Tech Skills</div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated CSS Wave at bottom of hero */}
          <CSSWave theme={theme} position="bottom" height={100} speed="slow" opacity={0.9} />

          {/* Minimalist Hero Content */}
          <div className="relative max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl">
              {/* Floating availability badge */}
              <motion.div
                className="float-badge mb-8 inline-flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  padding: '8px 18px',
                  background: theme === 'dark' ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.09)',
                  border: '1px solid rgba(16,185,129,0.30)',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#10b981',
                  letterSpacing: '0.06em',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)', display: 'inline-block', animation: 'badge-pulse 2s infinite' }} />
                Available for work
              </motion.div>

              {/* Intro Label with pulsing glow */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] aurora-text font-bold px-4 py-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  ✦ Full Stack Architect / MERN Expert
                </span>
              </motion.div>

              {/* Large Hero Typography - Typewriter Animation */}
              <motion.h1
                className={`text-[7.5vw] md:text-[8.5vw] lg:text-[8vw] font-black leading-[0.85] mb-12 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
                style={{ letterSpacing: '-0.05em' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block opacity-90">
                  {"Imesh".split(' ').map((word, wIdx, arr) => {
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
                      </span>
                    );
                  })}
                </span>
                <span className="block gradient-text-indigo">
                  {"Bandara".split(' ').map((word, wIdx, arr) => {
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
                      </span>
                    );
                  })}
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-[4px] ml-2"
                    style={{
                      height: '0.8em',
                      verticalAlign: 'baseline',
                      background: 'linear-gradient(180deg, #6366f1, #a855f7)',
                      borderRadius: 2,
                      boxShadow: '0 0 15px rgba(99,102,241,0.6)',
                    }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-lg md:text-xl max-w-2xl mb-16 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-[#4a4a6a]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Crafting elegant solutions with modern technologies. Specialized in MERN, MEAN, Laravel & Microservices Architecture.
              </motion.p>

              {/* CTA Links */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.a
                  href="#projects"
                  className="btn-primary inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>View Projects</span>
                  <span style={{ fontSize: 18 }}>→</span>
                </motion.a>
                <motion.a
                  href="#about"
                  className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl border font-medium text-[15px] transition-all ${
                    theme === 'dark'
                      ? 'border-[#1f1f35] text-gray-400 hover:border-[#6366f1]/40 hover:text-white'
                      : 'border-[#e0e0f0] text-gray-500 hover:border-[#6366f1]/40 hover:text-[#4338ca]'
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  About Me
                </motion.a>
              </motion.div>

              {/* Social Links - Minimal */}
              <motion.div
                className="flex gap-5 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {[
                  { label: 'GitHub', href: 'https://github.com/Imesh-Bandar', icon: '⌥' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_PROFILE', icon: '◈' },
                  { label: 'Email', href: 'mailto:imesh.fsd.info@gmail.com', icon: '✉' },
                  { label: 'WhatsApp', href: 'https://wa.me/94704394523', icon: '◎' },
                ].map(({ label, href, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`text-sm flex items-center gap-1.5 transition-all ${
                      theme === 'dark'
                        ? 'text-gray-600 hover:text-white'
                        : 'text-gray-400 hover:text-[#4338ca]'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <span style={{ color: '#6366f1' }}>{icon}</span>
                    {label} ↗
                  </motion.a>
                ))}
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
        {/* ── HIGH-SPEED FOCUSED TECH MARQUEE ── */}
        <div style={{ padding: '20px 0', overflow: 'hidden', position: 'relative', background: theme === 'dark' ? 'rgba(99,102,241,0.03)' : 'rgba(99,102,241,0.02)', borderTop: '1px solid rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
          <div className="marquee-wrapper">
            <div className="marquee-track" style={{ animationDuration: '25s' }}>
              {[
                { t: 'React', c: '#61DAFB' }, { t: 'Next.js', c: '#ffffff' }, { t: 'TypeScript', c: '#3178C6' },
                { t: 'Node.js', c: '#68A063' }, { t: 'MongoDB', c: '#4DB33D' }, { t: 'PostgreSQL', c: '#336791' },
                { t: 'Laravel', c: '#FF2D20' }, { t: 'Tailwind', c: '#38BDF8' }, { t: 'Docker', c: '#2496ED' },
                { t: 'AWS', c: '#FF9900' }, { t: 'GraphQL', c: '#E10098' }, { t: 'Python', c: '#3776AB' },
                // Duplicate for seamless loop
                { t: 'React', c: '#61DAFB' }, { t: 'Next.js', c: '#ffffff' }, { t: 'TypeScript', c: '#3178C6' },
                { t: 'Node.js', c: '#68A063' }, { t: 'MongoDB', c: '#4DB33D' }, { t: 'PostgreSQL', c: '#336791' },
                { t: 'Laravel', c: '#FF2D20' }, { t: 'Tailwind', c: '#38BDF8' }, { t: 'Docker', c: '#2496ED' },
                { t: 'AWS', c: '#FF9900' }, { t: 'GraphQL', c: '#E10098' }, { t: 'Python', c: '#3776AB' },
                // Triple for extra speed feel
                { t: 'React', c: '#61DAFB' }, { t: 'Next.js', c: '#ffffff' }, { t: 'TypeScript', c: '#3178C6' },
                { t: 'Node.js', c: '#68A063' }, { t: 'MongoDB', c: '#4DB33D' }, { t: 'PostgreSQL', c: '#336791' },
                { t: 'Laravel', c: '#FF2D20' }, { t: 'Tailwind', c: '#38BDF8' }, { t: 'Docker', c: '#2496ED' },
                { t: 'AWS', c: '#FF9900' }, { t: 'GraphQL', c: '#E10098' }, { t: 'Python', c: '#3776AB' },
              ].map(({ t, c }, i) => (
                <div key={i} className="ticket-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', marginRight: 20, background: theme === 'dark' ? 'rgba(14,14,31,0.8)' : 'rgba(255,255,255,0.9)', border: `1px solid ${c}30`, borderRadius: 14, backdropFilter: 'blur(12px)', transition: 'all 0.3s' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }} />
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: theme === 'dark' ? '#e8e8ff' : '#0a0a1a' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ABOUT SECTION ── */}
        <SectionTransition id="about" className="py-28 relative overflow-hidden" animationType="circle-expand" sectionName="About Me">
          <BubbleBackground theme={theme} count={8} opacity={theme === 'dark' ? 0.09 : 0.06} />
          <ParticleBackground theme={theme} variant="grid" opacity={0.25} />
          {/* Morphing blob decoration */}
          <div aria-hidden="true" className="morphing-blob" style={{ position: 'absolute', top: '5%', left: '-10%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div aria-hidden="true" className="morphing-blob" style={{ position: 'absolute', bottom: '5%', right: '-8%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none', animationDelay: '-4s' }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeader
              title="About "
              accent="Me"
              badge="Who I am"
              subtitle="Passionate software engineer crafting high-performance digital experiences."
              theme={theme}
            />

            {/* Two-column bento layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Text card — spans 3 cols */}
              <motion.div
                className="lg:col-span-3 glass-card p-8 card-accent-top spotlight-card neon-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg leading-relaxed mb-5" style={{ color: theme === 'dark' ? '#9090b0' : '#4a4a6a' }}>
                  {data.about?.description1}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: theme === 'dark' ? '#9090b0' : '#4a4a6a' }}>
                  {data.about?.description2}
                </p>

                {/* Inline stat row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6" style={{ borderTop: theme === 'dark' ? '1px solid rgba(99,102,241,0.12)' : '1px solid rgba(99,102,241,0.14)' }}>
                  {[
                    { count: data.projects.length, label: 'Projects', icon: '▣' },
                    { count: data.skills.length, label: 'Skills', icon: '⚡' },
                    { count: data.technologies.length, label: 'Tech', icon: '◈' },
                    { count: data.certifications.length, label: 'Certs', icon: '✦' },
                  ].map(({ count, label, icon }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                      <div className="text-2xl font-bold gradient-text-indigo">{count}+</div>
                      <div style={{ fontSize: 12, color: theme === 'dark' ? '#7070a0' : '#8888a8', fontWeight: 500 }}>{label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Image card — spans 2 cols */}
              <motion.div
                className="lg:col-span-2 glass-card overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ minHeight: 320, position: 'relative' }}
              >
                {data.about?.imageUrl ? (
                  <>
                    <Image src={data.about.imageUrl} alt="Profile" fill className="object-cover" unoptimized priority />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,18,0.6) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                      <p style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>Imesh Bandara</p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Software Engineer · Sri Lanka</p>
                    </div>
                  </>
                ) : (
                  <div style={{ height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff', fontWeight: 800 }}>IB</div>
                    <p style={{ color: theme === 'dark' ? '#9090b0' : '#6666aa', fontSize: 14 }}>Imesh Bandara</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </SectionTransition>

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <SectionTransition id="projects" className="py-24 relative overflow-hidden" animationType="blur-in" sectionName="Projects">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Featured " accent="Projects" badge="My Work" subtitle="A collection of my most impactful development work." theme={theme} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {data.projects.slice(0, 6).map((project: any, i: number) => (
                  <motion.div
                    key={project._id}
                    className="glass-card overflow-hidden group spotlight-card neon-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => openModal(project, 'project')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {project.imageUrl ? (
                        <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-3xl opacity-50">▣</div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">View Details</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                      <p className="text-sm line-clamp-2 mb-4" style={{ color: theme === 'dark' ? '#9090b0' : '#4a4a6a' }}>{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-bold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <SectionTransition id="skills" className="py-24 relative overflow-hidden" animationType="blur-in" sectionName="Expertise">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Core " accent="Expertise" badge="Skills" subtitle="A breakdown of my specialized technical capabilities." theme={theme} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {data.skills.map((skill: any, i: number) => (
                  <motion.div
                    key={skill._id}
                    className="glass-card p-6 relative overflow-hidden group"
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold group-hover:text-indigo-500 transition-colors">{skill.name}</h3>
                      <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">{skill.percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200/20 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage || 0}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Work & Education Section combined */}
        {(data.workExperiences.length > 0 || data.education.length > 0) && (
          <SectionTransition id="experience" className="py-24 relative overflow-hidden" animationType="slide-up" sectionName="Resume">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Professional " accent="Journey" badge="Resume" subtitle="My work experience and academic foundation." theme={theme} align="center" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                {/* Work Experience Column */}
                {data.workExperiences.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="text-indigo-500">◉</span> Experience</h3>
                    <div className="space-y-8 border-l-2 border-indigo-500/20 pl-6 ml-3">
                      {data.workExperiences.map((exp: any, i: number) => (
                        <motion.div
                          key={exp._id}
                          className="flex flex-col gap-2 relative"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute -left-[32px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                          
                          <div className="text-sm font-bold uppercase tracking-widest text-indigo-500">{exp.duration}</div>
                          <div className="glass-card p-6 spotlight-card">
                            <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                            <div className="text-indigo-500 font-semibold mb-4">{exp.company}</div>
                            <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#9090b0' : '#4a4a6a' }}>{exp.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Column */}
                {data.education.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="text-purple-500">◎</span> Education</h3>
                    <div className="space-y-8 border-l-2 border-purple-500/20 pl-6 ml-3">
                      {data.education.map((edu: any, i: number) => (
                        <motion.div
                          key={edu._id}
                          className="flex flex-col gap-2 relative"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute -left-[32px] top-1.5 w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                          
                          <div className="text-sm font-bold uppercase tracking-widest text-purple-500">{edu.duration}</div>
                          <div className="glass-card p-6 spotlight-card">
                            <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                            <div className="text-purple-500 font-semibold mb-2">{edu.institution}</div>
                            <p className="text-sm italic opacity-70" style={{ color: theme === 'dark' ? '#9090b0' : '#4a4a6a' }}>{edu.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <SectionTransition id="certs" className="py-24 relative overflow-hidden" animationType="blur-in" sectionName="Certifications">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Professional " accent="Credentials" badge="Certifications" theme={theme} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {data.certifications.map((cert: any, i: number) => (
                  <motion.div
                    key={cert._id}
                    className="glass-card p-6 flex flex-col gap-4 spotlight-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">✦</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 leading-tight">{cert.title}</h3>
                      <p className="text-xs text-indigo-500 font-semibold mb-2">{cert.issuer}</p>
                      <p className="text-[10px] uppercase tracking-wider opacity-50">{cert.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Photo Gallery Section */}
        {data.gallery.length > 0 && (
          <SectionTransition id="gallery" className="py-24 relative overflow-hidden" animationType="rotate-in" sectionName="Gallery">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Visual " accent="Chronicles" badge="Gallery" subtitle="A glimpse into my projects and journey through visuals." theme={theme} />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                {data.gallery.filter((item: any) => item.isFeatured).map((item: any, i: number) => (
                  <motion.div
                    key={item._id}
                    className="relative aspect-square overflow-hidden rounded-2xl glass-card group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => openModal(item, 'gallery')}
                  >
                    <Image src={item.imageUrl} alt={item.title || 'Gallery item'} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* Blog Section */}
        {data.blogs.length > 0 && (
          <SectionTransition id="blog" className="py-24 relative overflow-hidden" animationType="blur-in" sectionName="Blog">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeader title="Latest " accent="Insights" badge="Blog" subtitle="My thoughts on technology, development, and design." theme={theme} align="center" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {data.blogs.map((blog: any, i: number) => (
                  <motion.div
                    key={blog._id}
                    className="glass-card overflow-hidden group spotlight-card neon-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => window.location.href = `/blogs/${blog.slug}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {blog.imageUrl ? (
                        <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-3xl opacity-30">✎</div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-indigo-500 font-bold mb-2 uppercase tracking-widest">{blog.category || 'Technology'}</p>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-indigo-500 transition-colors line-clamp-2">{blog.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] opacity-60">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTransition>
        )}

        {/* Wave Divider */}
        <WaveDivider theme={theme} variant="bottom" />

        {/* ── CONTACT SECTION ── */}
        <SectionTransition id="contact" className="py-28 relative overflow-hidden" animationType="scale-up" sectionName="Get In Touch">
          <ParticleBackground theme={theme} variant="waves" opacity={0.35} />
          {/* Background glow */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: theme === 'dark' ? 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(99,102,241,0.12) 0%, transparent 60%)' : 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(99,102,241,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <SectionHeader title="Let's " accent="Work Together" theme={theme} align="center" badge="Get in touch"
              subtitle="Have a project in mind? Let's create something amazing together."
            />

            {/* Contact cards bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Email', sub: 'imesh.fsd.info@gmail.com', icon: '✉', href: 'mailto:imesh.fsd.info@gmail.com', color: '#6366f1' },
                { label: 'GitHub', sub: 'Imesh-Bandar', icon: '⌥', href: 'https://github.com/Imesh-Bandar', color: '#8b5cf6' },
                { label: 'LinkedIn', sub: 'Connect with me', icon: '◈', href: 'https://linkedin.com/in/YOUR_PROFILE', color: '#06b6d4' },
                { label: 'WhatsApp', sub: '+94 70 439 4523', icon: '◎', href: 'https://wa.me/94704394523', color: '#10b981' },
              ].map(({ label, sub, icon, href, color }, i) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{ display: 'block', textDecoration: 'none', padding: 24, borderRadius: 18,
                    background: theme === 'dark' ? 'rgba(14,14,31,0.8)' : 'rgba(255,255,255,0.9)',
                    border: `1px solid ${color}25`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 4px 20px ${color}12`,
                    transition: 'all 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${color}30`; (e.currentTarget as HTMLElement).style.borderColor = `${color}50`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${color}12`; (e.currentTarget as HTMLElement).style.borderColor = `${color}25`; }}
                >
                  {/* Top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: theme === 'dark' ? '#e8e8ff' : '#0a0a1a', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: theme === 'dark' ? '#7070a0' : '#8888a8' }}>{sub}</div>
                  <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color }}>
                    Connect →
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a href="mailto:imesh.fsd.info@gmail.com" className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <FiMail size={17} /> Send Email
              </motion.a>
              <motion.a href="https://github.com/Imesh-Bandar" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-medium text-sm transition-all"
                style={{ border: theme === 'dark' ? '1px solid rgba(99,102,241,0.18)' : '1px solid rgba(99,102,241,0.22)', color: theme === 'dark' ? '#9090b0' : '#4a4a6a', background: 'transparent' }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              >
                <FiGithub size={17} /> GitHub
              </motion.a>
              <motion.a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-medium text-sm transition-all"
                style={{ border: theme === 'dark' ? '1px solid rgba(6,182,212,0.2)' : '1px solid rgba(6,182,212,0.25)', color: '#06b6d4', background: 'transparent' }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              >
                <FiLinkedin size={17} /> LinkedIn
              </motion.a>
            </div>
          </div>
        </SectionTransition>

        {/* ── FOOTER ── */}
        <footer style={{
          position: 'relative',
          borderTop: theme === 'dark' ? '1px solid rgba(99,102,241,0.10)' : '1px solid rgba(99,102,241,0.14)',
          padding: '32px 24px',
          background: theme === 'dark' ? 'rgba(8,8,18,0.95)' : 'rgba(250,251,255,0.95)',
        }}>
          {/* gradient top line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)' }} />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: '#fff' }}>IB</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: theme === 'dark' ? '#e8e8ff' : '#0a0a1a' }}>
                    <span className="gradient-text-indigo">Imesh</span> Bandara
                  </p>
                  <p style={{ fontSize: 11, color: theme === 'dark' ? '#7070a0' : '#8888a8' }}>
                    © {new Date().getFullYear()} · All rights reserved
                  </p>
                </div>
              </div>

              {/* Quick links */}
              <div className="flex items-center gap-6 text-sm">
                {[['#home','Home'],['#about','About'],['#work','Work'],['#contact','Contact']].map(([href,label]) => (
                  <a key={href} href={href} style={{ color: theme === 'dark' ? '#7070a0' : '#8888a8', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6366f1'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = theme === 'dark' ? '#7070a0' : '#8888a8'; }}
                  >{label}</a>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://github.com/Imesh-Bandar', icon: <FiGithub size={17} /> },
                  { href: 'https://linkedin.com/in/YOUR_PROFILE', icon: <FiLinkedin size={17} /> },
                  { href: 'mailto:imesh.fsd.info@gmail.com', icon: <FiMail size={17} /> },
                  { href: 'https://wa.me/94704394523', icon: <FaWhatsapp size={17} /> },
                ].map(({ href, icon }) => (
                  <motion.a key={href} href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.15, y: -2 }}
                    style={{ width: 34, height: 34, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', color: '#6366f1', transition: 'all 0.2s' }}
                  >
                    {icon}
                  </motion.a>
                ))}
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
