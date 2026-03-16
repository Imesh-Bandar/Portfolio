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
    {
      title: "Certifications",
      count: stats.certifications.count,
      featured: stats.certifications.featured,
      latest: stats.certifications.latest,
      icon: FiAward,
      href: "/admin/certifications",
      accent: "border-l-4 border-[#C1BFBE]",
    },
    {
      title: "Projects",
      count: stats.projects.count,
      featured: stats.projects.featured,
      latest: stats.projects.latest,
      icon: FiFolder,
      href: "/admin/projects",
      accent: "border-l-4 border-[#5F5F60]",
    },
    {
      title: "Skills",
      count: stats.skills.count,
      featured: stats.skills.featured,
      latest: stats.skills.latest,
      icon: FiCode,
      href: "/admin/skills",
      accent: "border-l-4 border-[#C1BFBE]",
    },
    {
      title: "Technologies",
      count: stats.technologies.count,
      featured: stats.technologies.featured,
      latest: stats.technologies.latest,
      icon: FiTool,
      href: "/admin/technologies",
      accent: "border-l-4 border-[#5F5F60]",
    },
    {
      title: "Education",
      count: stats.education.count,
      featured: stats.education.featured,
      latest: stats.education.latest,
      icon: FiBook,
      href: "/admin/education",
      accent: "border-l-4 border-[#C1BFBE]",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C1BFBE]"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header Section with Welcome Message */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
              {greeting}, Admin 👋
            </h1>
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#C1BFBE] to-[#5F5F60] rounded-full"></div>
            <p className="text-[var(--text-secondary)] mt-4 text-lg">
              Manage your portfolio content with ease
            </p>
          </div>

          {/* Live Clock & Quick Stats */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
              <FiClock className="text-[#C1BFBE]" />
              <span className="font-mono">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
              <FiActivity className="text-[#5F5F60]" />
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/admin/projects"
          className="group bg-gradient-to-br from-[#C1BFBE]/10 to-[#A89B8E]/10 hover:from-[#C1BFBE]/20 hover:to-[#A89B8E]/20 border border-[#C1BFBE]/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C1BFBE]/10"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#C1BFBE]/20 p-2 rounded-lg group-hover:bg-[#C1BFBE]/30 transition-colors">
              <FiPlus className="text-[#C1BFBE] w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">New Project</span>
          </div>
        </Link>

        <Link
          href="/admin/blogs"
          className="group bg-gradient-to-br from-[#5F5F60]/10 to-[#4C4D4E]/10 hover:from-[#5F5F60]/20 hover:to-[#4C4D4E]/20 border border-[#5F5F60]/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5F5F60]/10"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#5F5F60]/20 p-2 rounded-lg group-hover:bg-[#5F5F60]/30 transition-colors">
              <FiBook className="text-[#5F5F60] w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Write Blog</span>
          </div>
        </Link>

        <Link
          href="/admin/gallery"
          className="group bg-gradient-to-br from-[#8B7355]/10 to-[#2E2622]/10 hover:from-[#8B7355]/20 hover:to-[#2E2622]/20 border border-[#8B7355]/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B7355]/10"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#8B7355]/20 p-2 rounded-lg group-hover:bg-[#8B7355]/30 transition-colors">
              <FiEye className="text-[#8B7355] w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Gallery</span>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="group bg-gradient-to-br from-[#A89B8E]/10 to-[#C1BFBE]/10 hover:from-[#A89B8E]/20 hover:to-[#C1BFBE]/20 border border-[#A89B8E]/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A89B8E]/10"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#A89B8E]/20 p-2 rounded-lg group-hover:bg-[#A89B8E]/30 transition-colors">
              <FiTrendingUp className="text-[#A89B8E] w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Settings</span>
          </div>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative bg-gradient-to-br from-[#2E2622] to-[#1a1715] overflow-hidden shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#4C4D4E] ${card.accent} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C1BFBE]/0 to-[#5F5F60]/0 group-hover:from-[#C1BFBE]/10 group-hover:to-[#5F5F60]/10 transition-all duration-500"></div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C1BFBE] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5F5F60] to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="relative p-7">
                <div className="flex items-start justify-between">
                  {/* Icon */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#0C0C08] to-[#1a1715] border border-[#4C4D4E] rounded-xl p-4 shadow-lg group-hover:shadow-[#C1BFBE]/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-7 w-7 text-[#C1BFBE] group-hover:text-[#A89B8E] transition-colors duration-300" />
                    </div>
                    {/* Count Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#C1BFBE] to-[#5F5F60] text-[#0a0a0a] text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {card.count}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex-1 ml-6">
                    <h3 className="text-lg font-bold text-[#C1BFBE] mb-3 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>

                    {/* Metrics */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#5F5F60]">Total Items</span>
                        <span className="text-sm font-semibold text-[#C1BFBE] bg-[#0C0C08] px-3 py-1 rounded-full">
                          {card.count}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#5F5F60]">Featured</span>
                        <span className="text-sm font-semibold text-[#C1BFBE] bg-[#2E2622]/30 px-3 py-1 rounded-full">
                          {card.featured}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#5F5F60]">Featured %</span>
                          <span className="text-xs font-semibold text-[#C1BFBE]">
                            {card.count > 0 ? Math.round((card.featured / card.count) * 100) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-[#0C0C08] rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C1BFBE] to-[#5F5F60] rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: card.count > 0 ? `${(card.featured / card.count) * 100}%` : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Item */}
                <div className="mt-5 pt-4 border-t border-[#4C4D4E]">
                  <p className="text-xs text-[#5F5F60] mb-1">Latest Entry</p>
                  <p className="text-sm text-[#C1BFBE] truncate font-medium">
                    {card.latest}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="relative bg-gradient-to-br from-[#0C0C08] to-[#1a1715] px-7 py-4 border-t border-[#4C4D4E] group-hover:bg-gradient-to-br group-hover:from-[#2E2622]/30 group-hover:to-[#4C4D4E]/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#C1BFBE] group-hover:text-white transition-colors flex items-center text-sm">
                    <FiPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Manage {card.title}
                  </span>
                  <svg className="w-5 h-5 text-[#5F5F60] group-hover:text-[#C1BFBE] group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#C1BFBE]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#5F5F60]/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          );
        })}
      </div>

      {/* Enhanced Stats Grid with New Component */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Items"
          value={cards.reduce((sum, card) => sum + card.count, 0)}
          icon={FiFolder}
          color="#C1BFBE"
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatsCard
          title="Featured"
          value={cards.reduce((sum, card) => sum + card.featured, 0)}
          icon={FiStar}
          color="#5F5F60"
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <StatsCard
          title="Categories"
          value={cards.length}
          icon={FiActivity}
          color="#8B7355"
          delay={0.2}
        />
        <StatsCard
          title="Media Files"
          value="24"
          icon={FiImage}
          color="#A89B8E"
          trend={{ value: 15, isPositive: true }}
          delay={0.3}
        />
      </div>

      {/* Progress Visualization Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Progress Cards */}
        <div className="bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-[#C1BFBE]/40 transition-all duration-300">
          <CircularProgress
            value={cards.reduce((sum, card) => sum + card.count, 0) > 0
              ? Math.round((cards.reduce((sum, card) => sum + card.featured, 0) / cards.reduce((sum, card) => sum + card.count, 0)) * 100)
              : 0}
            color="#C1BFBE"
            backgroundColor="#4C4D4E"
            size={140}
            strokeWidth={10}
          />
          <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">Featured Rate</p>
          <p className="text-xs text-[var(--text-secondary)]">Overall completion</p>
        </div>

        <div className="bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-[#5F5F60]/40 transition-all duration-300">
          <CircularProgress
            value={stats.projects.count > 0
              ? Math.round((stats.projects.featured / stats.projects.count) * 100)
              : 0}
            color="#5F5F60"
            backgroundColor="#4C4D4E"
            size={140}
            strokeWidth={10}
          />
          <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">Projects Status</p>
          <p className="text-xs text-[var(--text-secondary)]">Featured projects</p>
        </div>

        <div className="bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-[#8B7355]/40 transition-all duration-300">
          <CircularProgress
            value={stats.skills.count > 0
              ? Math.round((stats.skills.featured / stats.skills.count) * 100)
              : 0}
            color="#8B7355"
            backgroundColor="#4C4D4E"
            size={140}
            strokeWidth={10}
          />
          <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">Skills Progress</p>
          <p className="text-xs text-[var(--text-secondary)]">Highlighted skills</p>
        </div>
      </div>

      {/* Two Column Layout: Portfolio Overview & Activity Timeline */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Overview */}
        <div className="bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#C1BFBE] to-[#5F5F60] p-2 rounded-lg">
                <FiActivity className="text-white w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Portfolio Overview</h2>
            </div>
          </div>

          <div className="space-y-3">
            {cards.slice(0, 5).map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group block bg-[#0C0C08]/50 border border-[#4C4D4E]/30 rounded-xl p-4 hover:bg-[#2E2622]/30 hover:border-[#C1BFBE]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {card.icon && (
                      <div className="bg-[#C1BFBE]/10 p-2 rounded-lg group-hover:bg-[#C1BFBE]/20 transition-colors">
                        <card.icon className="text-[#C1BFBE] w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-[#C1BFBE] block mb-1">{card.title}</span>
                      <p className="text-xs text-[#5F5F60] truncate">{card.latest}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-[var(--text-secondary)]">
                        <span className="font-bold text-[#C1BFBE]">{card.count}</span>/{card.featured}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#C1BFBE]/20 to-[#5F5F60]/20 px-2 py-1 rounded-full min-w-[45px] text-center">
                      <span className="text-xs font-bold text-[#C1BFBE]">
                        {card.count > 0 ? Math.round((card.featured / card.count) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-gradient-to-br from-[#2E2622]/30 to-[#1a1715]/30 border border-[#4C4D4E]/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#5F5F60] to-[#8B7355] p-2 rounded-lg">
                <FiClock className="text-white w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Recent Activity</h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="bg-[#C1BFBE]/20 p-2 rounded-full group-hover:bg-[#C1BFBE]/30 transition-colors">
                  <FiPlus className="text-[#C1BFBE] w-3 h-3" />
                </div>
                <div className="w-px h-full bg-[#4C4D4E]/30 mt-2"></div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Content Updated</p>
                <p className="text-xs text-[var(--text-secondary)]">Dashboard statistics refreshed</p>
                <p className="text-xs text-[#5F5F60] mt-1">Just now</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="bg-[#5F5F60]/20 p-2 rounded-full group-hover:bg-[#5F5F60]/30 transition-colors">
                  <FiSettings className="text-[#5F5F60] w-3 h-3" />
                </div>
                <div className="w-px h-full bg-[#4C4D4E]/30 mt-2"></div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">System Status</p>
                <p className="text-xs text-[var(--text-secondary)]">All systems operational</p>
                <p className="text-xs text-[#5F5F60] mt-1">5 minutes ago</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="bg-[#8B7355]/20 p-2 rounded-full group-hover:bg-[#8B7355]/30 transition-colors">
                  <FiUsers className="text-[#8B7355] w-3 h-3" />
                </div>
                <div className="w-px h-full bg-[#4C4D4E]/30 mt-2"></div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Admin Session</p>
                <p className="text-xs text-[var(--text-secondary)]">Logged in successfully</p>
                <p className="text-xs text-[#5F5F60] mt-1">Today at {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            {/* Activity Item 4 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="bg-[#A89B8E]/20 p-2 rounded-full group-hover:bg-[#A89B8E]/30 transition-colors">
                  <FiMessageSquare className="text-[#A89B8E] w-3 h-3" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Database Connected</p>
                <p className="text-xs text-[var(--text-secondary)]">MongoDB connection active</p>
                <p className="text-xs text-[#5F5F60] mt-1">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-gradient-to-r from-[#C1BFBE]/10 via-[#5F5F60]/10 to-[#8B7355]/10 border border-[#C1BFBE]/20 rounded-full px-6 py-3">
          <p className="text-sm text-[var(--text-secondary)]">
            <span className="font-semibold text-[#C1BFBE]">Keep building!</span> Your portfolio is growing beautifully ✨
          </p>
        </div>
      </div>
    </div>
  );
}
