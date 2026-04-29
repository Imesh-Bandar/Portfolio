"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiAward,
  FiFolder,
  FiCode,
  FiTool,
  FiBook,
  FiPlus,
  FiClock,
  FiTrendingUp,
  FiActivity,
  FiEye,
  FiUsers,
  FiMessageSquare,
  FiImage,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import CircularProgress from "@/components/admin/CircularProgress";
import StatsCard from "@/components/admin/StatsCard";

interface CollectionStats {
  count: number;
  featured: number;
  latest: string;
}

interface Stats {
  certifications: CollectionStats;
  projects: CollectionStats;
  skills: CollectionStats;
  technologies: CollectionStats;
  education: CollectionStats;
}

export default function AdminDashboard() {
  const emptyStats = { count: 0, featured: 0, latest: "No entries yet" };
  const [stats, setStats] = useState<Stats>({
    certifications: emptyStats,
    projects: emptyStats,
    skills: emptyStats,
    technologies: emptyStats,
    education: emptyStats,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [certs, projects, skills, techs, edu] = await Promise.all([
        fetch("/api/certifications").then((r) => r.json()),
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/skills").then((r) => r.json()),
        fetch("/api/technologies").then((r) => r.json()),
        fetch("/api/education").then((r) => r.json()),
      ]);

      const buildCollectionStats = (items: any[]) => {
        const safeItems = Array.isArray(items) ? items : [];
        const featured = safeItems.filter((item) => item?.isFeatured).length;

        const latestItem = [...safeItems].sort((a, b) => {
          const aDate = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
          const bDate = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
          return bDate - aDate;
        })[0];

        const latest = latestItem
          ? latestItem.title ||
            latestItem.name ||
            latestItem.degree ||
            latestItem.company ||
            latestItem.issuer ||
            "Latest item"
          : "No entries yet";

        return {
          count: safeItems.length,
          featured,
          latest,
        };
      };

      setStats({
        certifications: buildCollectionStats(certs),
        projects: buildCollectionStats(projects),
        skills: buildCollectionStats(skills),
        technologies: buildCollectionStats(techs),
        education: buildCollectionStats(edu),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cards = [
    { title: "Certifications", count: stats.certifications.count, featured: stats.certifications.featured, latest: stats.certifications.latest, icon: FiAward,  href: "/admin/certifications",  color: "#6366f1", glow: "rgba(99,102,241,0.25)" },
    { title: "Projects",       count: stats.projects.count,       featured: stats.projects.featured,       latest: stats.projects.latest,       icon: FiFolder, href: "/admin/projects",        color: "#8b5cf6", glow: "rgba(139,92,246,0.25)" },
    { title: "Skills",         count: stats.skills.count,         featured: stats.skills.featured,         latest: stats.skills.latest,         icon: FiCode,   href: "/admin/skills",          color: "#10b981", glow: "rgba(16,185,129,0.25)" },
    { title: "Technologies",   count: stats.technologies.count,   featured: stats.technologies.featured,   latest: stats.technologies.latest,   icon: FiTool,   href: "/admin/technologies",    color: "#06b6d4", glow: "rgba(6,182,212,0.25)" },
    { title: "Education",      count: stats.education.count,      featured: stats.education.featured,      latest: stats.education.latest,      icon: FiBook,   href: "/admin/education",       color: "#a855f7", glow: "rgba(168,85,247,0.25)" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12" style={{ borderBottom: '2px solid #6366f1' }}></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight" style={{ color: '#e8e8ff' }}>
              {greeting}, Admin 👋
            </h1>
            <div style={{ position: 'absolute', bottom: -8, left: 0, width: 80, height: 3, background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: 9999 }} />
            <p className="mt-5 text-lg" style={{ color: '#7070a0' }}>Manage your portfolio content with ease</p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#7070a0' }}>
              <FiClock style={{ color: '#6366f1' }} />
              <span className="font-mono">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#7070a0' }}>
              <FiActivity style={{ color: '#8b5cf6' }} />
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { href: '/admin/projects',  label: 'New Project', icon: FiPlus,       color: '#6366f1' },
          { href: '/admin/blogs',     label: 'Write Blog',  icon: FiBook,       color: '#8b5cf6' },
          { href: '/admin/gallery',   label: 'Gallery',     icon: FiEye,        color: '#06b6d4' },
          { href: '/admin/settings',  label: 'Settings',    icon: FiTrendingUp, color: '#10b981' },
        ].map(({ href, label, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}25`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${color}20`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}20`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${color}10`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg transition-colors" style={{ background: `${color}20` }}>
                <Icon style={{ color, width: 18, height: 18 }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: '#e8e8ff' }}>{label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group block"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  position: 'relative',
                  background: 'rgba(14,14,31,0.9)',
                  border: `1px solid ${card.color}25`,
                  borderLeft: `4px solid ${card.color}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 20px 40px ${card.glow}`;
                  el.style.borderColor = card.color + '60';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = card.color + '25';
                  el.style.borderLeftColor = card.color;
                }}
              >
                {/* Top shimmer bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, opacity: 0.7 }} />
                {/* Corner glow */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`, filter: 'blur(20px)' }} />

                <div style={{ padding: '28px 28px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ background: `${card.color}18`, border: `1px solid ${card.color}35`, borderRadius: 14, padding: '14px', display: 'inline-flex' }}>
                        <Icon style={{ width: 26, height: 26, color: card.color, filter: `drop-shadow(0 0 8px ${card.color})` }} />
                      </div>
                      <div style={{ position: 'absolute', top: -8, right: -8, background: card.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 7px', borderRadius: 9999, boxShadow: `0 2px 8px ${card.glow}` }}>
                        {card.count}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#e8e8ff', marginBottom: 6 }}>{card.title}</h3>
                      <div style={{ fontSize: 12, color: '#7070a0' }}>Featured: <span style={{ color: card.color, fontWeight: 600 }}>{card.featured}</span></div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, color: '#7070a0' }}>
                      <span>Featured rate</span>
                      <span style={{ color: card.color, fontWeight: 600 }}>{card.count > 0 ? Math.round((card.featured / card.count) * 100) : 0}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 9999, height: 5, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: `linear-gradient(90deg, ${card.color}, ${card.color}aa)`, borderRadius: 9999, width: card.count > 0 ? `${(card.featured / card.count) * 100}%` : '0%', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ margin: '16px 0 0', padding: '14px 28px', borderTop: `1px solid ${card.color}15`, background: `${card.color}06` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: '#7070a0' }}>Latest: <span style={{ color: '#a0a0c0' }}>{card.latest}</span></span>
                    <span style={{ fontSize: 13, color: card.color, fontWeight: 600 }}>Manage →</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C1BFBE]/0 to-[#5F5F60]/0 group-hover:from-[#C1BFBE]/10 group-hover:to-[#5F5F60]/10 transition-all duration-500"></div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C1BFBE] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5F5F60] to-transparent"></div>
              </div>

      {/* ── Enhanced Stats Row ── */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <StatsCard title="Total Items"  value={cards.reduce((s,c)=>s+c.count,0)}   icon={FiFolder}   color="#6366f1" glow="rgba(99,102,241,0.2)"  trend={{ value:12, isPositive:true }} delay={0}   />
        <StatsCard title="Featured"     value={cards.reduce((s,c)=>s+c.featured,0)} icon={FiStar}     color="#a855f7" glow="rgba(168,85,247,0.2)" trend={{ value:8,  isPositive:true }} delay={0.1} />
        <StatsCard title="Categories"   value={cards.length}                         icon={FiActivity} color="#06b6d4" glow="rgba(6,182,212,0.2)"                                       delay={0.2} />
        <StatsCard title="Media Files"  value="24"                                   icon={FiImage}    color="#10b981" glow="rgba(16,185,129,0.2)" trend={{ value:15, isPositive:true }} delay={0.3} />
      </div>

      {/* ── Circular Progress ── */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        {[
          { label: 'Featured Rate',   sub: 'Overall completion',  color: '#6366f1', value: cards.reduce((s,c)=>s+c.count,0) > 0 ? Math.round((cards.reduce((s,c)=>s+c.featured,0)/cards.reduce((s,c)=>s+c.count,0))*100) : 0 },
          { label: 'Projects Status', sub: 'Featured projects',   color: '#8b5cf6', value: stats.projects.count > 0 ? Math.round((stats.projects.featured/stats.projects.count)*100) : 0 },
          { label: 'Skills Progress', sub: 'Highlighted skills',  color: '#10b981', value: stats.skills.count > 0 ? Math.round((stats.skills.featured/stats.skills.count)*100) : 0 },
        ].map(({ label, sub, color, value }) => (
          <div key={label} style={{ background: 'rgba(14,14,31,0.85)', border: `1px solid ${color}25`, borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}50`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}20`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}25`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            <CircularProgress value={value} color={color} backgroundColor="rgba(255,255,255,0.06)" size={130} strokeWidth={9} />
            <p style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: '#e8e8ff' }}>{label}</p>
            <p style={{ fontSize: 11, color: '#7070a0', marginTop: 2 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Portfolio Overview + Activity Timeline ── */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

        {/* Portfolio Overview */}
        <div style={{ background: 'rgba(14,14,31,0.85)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 18, padding: 24, backdropFilter: 'blur(16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiActivity style={{ width: 18, height: 18, color: '#fff' }} />
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#e8e8ff' }}>Portfolio Overview</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cards.map((card) => (
              <Link key={card.title} href={card.href} style={{ textDecoration: 'none', display: 'block', padding: '12px 14px', borderRadius: 12, background: `${card.color}08`, border: `1px solid ${card.color}18`, transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${card.color}14`; (e.currentTarget as HTMLElement).style.borderColor = `${card.color}35`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${card.color}08`; (e.currentTarget as HTMLElement).style.borderColor = `${card.color}18`; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${card.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <card.icon style={{ width: 14, height: 14, color: card.color }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#d0d0f0' }}>{card.title}</span>
                  </div>
                  <span style={{ fontSize: 12, color: card.color, fontWeight: 700 }}>{card.count} total</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 9999, height: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: `linear-gradient(90deg, ${card.color}, ${card.color}80)`, borderRadius: 9999, width: card.count > 0 ? `${(card.featured/card.count)*100}%` : '0%', transition: 'width 1s ease' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div style={{ background: 'rgba(14,14,31,0.85)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 18, padding: 24, backdropFilter: 'blur(16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiClock style={{ width: 18, height: 18, color: '#fff' }} />
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#e8e8ff' }}>Recent Activity</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { icon: FiPlus,         color: '#6366f1', title: 'Content Updated',    desc: 'Dashboard statistics refreshed', time: 'Just now' },
              { icon: FiSettings,     color: '#8b5cf6', title: 'System Status',      desc: 'All systems operational',        time: '5 min ago' },
              { icon: FiUsers,        color: '#10b981', title: 'Admin Session',       desc: 'Logged in successfully',         time: `Today ${currentTime.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}` },
              { icon: FiMessageSquare,color: '#06b6d4', title: 'Database Connected', desc: 'MongoDB connection active',       time: 'Today' },
              { icon: FiTrendingUp,   color: '#f59e0b', title: 'Portfolio Updated',  desc: 'Latest entries synced',          time: 'Today' },
            ].map(({ icon: Icon, color, title, desc, time }, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 14, height: 14, color }} />
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(99,102,241,0.12)', marginTop: 6 }} />}
                </div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#d0d0f0', marginBottom: 2 }}>{title}</p>
                  <p style={{ fontSize: 11, color: '#7070a0' }}>{desc}</p>
                  <p style={{ fontSize: 10, color: color, fontWeight: 500, marginTop: 4 }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: 'linear-gradient(135deg,rgba(99,102,241,0.10),rgba(168,85,247,0.08))', border: '1px solid rgba(99,102,241,0.20)', borderRadius: 9999 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)', display: 'inline-block', animation: 'badge-pulse 2s infinite' }} />
          <p style={{ fontSize: 13, color: '#9090b0' }}>
            <span style={{ fontWeight: 700, background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Keep building!</span> Your portfolio is growing beautifully ✨
          </p>
        </div>
      </div>
    </div>
  );
}
