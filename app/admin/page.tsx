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
} from "react-icons/fi";

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
      {/* Header Section */}
      <div className="mb-10">
        <div className="relative">
          <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
            Dashboard
          </h1>
          <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#C1BFBE] to-[#5F5F60] rounded-full"></div>
        </div>
        <p className="text-[var(--text-secondary)] mt-4 text-lg">
          Manage your portfolio content with ease
        </p>
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

      {/* Quick Stats Summary */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#C1BFBE]/10 to-[#A89B8E]/10 backdrop-blur-sm border border-[#C1BFBE]/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-[#C1BFBE] mb-2">
            {cards.reduce((sum, card) => sum + card.count, 0)}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Total Items</div>
        </div>

        <div className="bg-gradient-to-br from-[#5F5F60]/10 to-[#4C4D4E]/10 backdrop-blur-sm border border-[#5F5F60]/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-[#5F5F60] mb-2">
            {cards.reduce((sum, card) => sum + card.featured, 0)}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Featured Items</div>
        </div>

        <div className="bg-gradient-to-br from-[#8B7355]/10 to-[#2E2622]/10 backdrop-blur-sm border border-[#8B7355]/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-[#8B7355] mb-2">
            {cards.length}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Categories</div>
        </div>
      </div>
    </div>
  );
}
