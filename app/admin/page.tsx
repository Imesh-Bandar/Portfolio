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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`bg-[#2E2622] overflow-hidden shadow rounded-lg hover:shadow-lg transition-all hover:-translate-y-1 border border-[#4C4D4E] ${card.accent}`}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-[#0C0C08] border border-[#4C4D4E] rounded-md p-3">
                    <Icon className="h-6 w-6 text-[#C1BFBE]" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl className="space-y-2">
                      <dt className="text-sm font-medium text-[#5F5F60] truncate">
                        {card.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-[#C1BFBE]">
                          {card.count}
                        </div>
                        <span className="ml-2 text-xs text-[#5F5F60]">
                          items
                        </span>
                      </dd>
                      <dd className="text-xs text-[#5F5F60]">
                        Featured: {card.featured}
                      </dd>
                      <dd className="text-xs text-[#C1BFBE] truncate">
                        Latest: {card.latest}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-[#0C0C08] px-6 py-3 border-t border-[#4C4D4E]">
                <div className="text-sm">
                  <span className="font-medium text-[#C1BFBE] hover:text-white flex items-center">
                    <FiPlus className="mr-1" /> Manage {card.title}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
