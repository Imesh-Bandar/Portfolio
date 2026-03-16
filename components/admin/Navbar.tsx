"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import {
  FiLogOut,
  FiHome,
  FiAward,
  FiFolder,
  FiCode,
  FiTool,
  FiBook,
  FiBriefcase,
  FiImage,
  FiFileText,
  FiMessageSquare,
  FiUser,
  FiSun,
  FiMoon,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight
} from "react-icons/fi";
import { useTheme } from "@/lib/context/ThemeContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: FiHome, color: "from-[#C1BFBE] to-[#5F5F60]" },
    { href: "/admin/about", label: "About", icon: FiUser, color: "from-[#5F5F60] to-[#4C4D4E]" },
    { href: "/admin/projects", label: "Projects", icon: FiFolder, color: "from-[#C1BFBE] to-[#8B7355]" },
    { href: "/admin/blogs", label: "Blogs", icon: FiFileText, color: "from-[#8B7355] to-[#5F5F60]" },
    { href: "/admin/gallery", label: "Gallery", icon: FiImage, color: "from-[#C1BFBE] to-[#A89B8E]" },
    { href: "/admin/skills", label: "Skills", icon: FiCode, color: "from-[#5F5F60] to-[#2E2622]" },
    { href: "/admin/technologies", label: "Technologies", icon: FiTool, color: "from-[#A89B8E] to-[#5F5F60]" },
    { href: "/admin/work-experience", label: "Experience", icon: FiBriefcase, color: "from-[#8B7355] to-[#4C4D4E]" },
    { href: "/admin/education", label: "Education", icon: FiBook, color: "from-[#C1BFBE] to-[#5F5F60]" },
    { href: "/admin/certifications", label: "Certifications", icon: FiAward, color: "from-[#A89B8E] to-[#8B7355]" },
    { href: "/admin/comments", label: "Comments", icon: FiMessageSquare, color: "from-[#5F5F60] to-[#C1BFBE]" },
    { href: "/admin/settings", label: "Settings", icon: FiSettings, color: "from-[#4C4D4E] to-[#2E2622]" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle mobile menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-br from-[#C1BFBE] to-[#5F5F60] text-[#2E2622] shadow-lg hover:shadow-xl transition-all"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-br ${
          theme === 'dark'
            ? 'from-[#1a1a1a]/95 via-[#2E2622]/95 to-[#1a1a1a]/95'
            : 'from-white/95 via-[#C1BFBE]/10 to-[#fafafa]/95'
        } backdrop-blur-xl border-r ${
          theme === 'dark' ? 'border-[#4C4D4E]/30' : 'border-[#C1BFBE]/30'
        } transition-all duration-300 z-40 overflow-y-auto shadow-2xl ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo/Brand */}
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-[#4C4D4E]/30' : 'border-[#C1BFBE]/30'}`}>
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C1BFBE] to-[#5F5F60] flex items-center justify-center shadow-lg">
                  <span className="text-[#2E2622] font-bold text-xl">A</span>
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${theme === 'dark' ? 'text-[#C1BFBE]' : 'text-[#2E2622]'}`}>
                    Admin Portal
                  </h2>
                  <p className={`text-xs ${theme === 'dark' ? 'text-[#5F5F60]' : 'text-[#5F5F60]'}`}>
                    Portfolio Manager
                  </p>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`hidden lg:block p-2 rounded-lg ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-[#C1BFBE]'
                  : 'hover:bg-[#C1BFBE]/20 text-[#5F5F60]'
              } transition-all`}
            >
              <FiChevronRight
                className={`transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
              />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className={`p-4 mx-4 mt-4 rounded-xl bg-gradient-to-br ${
          theme === 'dark'
            ? 'from-[#2E2622]/50 to-[#4C4D4E]/30 border border-[#4C4D4E]/30'
            : 'from-[#C1BFBE]/20 to-[#A89B8E]/20 border border-[#C1BFBE]/30'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C1BFBE] to-[#5F5F60] flex items-center justify-center text-[#2E2622] font-bold text-lg shadow-lg">
              {user?.name?.charAt(0) || 'A'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${theme === 'dark' ? 'text-[#C1BFBE]' : 'text-[#2E2622]'}`}>
                  {user?.name || 'Admin'}
                </p>
                <p className={`text-xs truncate ${theme === 'dark' ? 'text-[#5F5F60]' : 'text-[#5F5F60]'}`}>
                  {user?.email || 'admin@portfolio.com'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-[#0a0a0a] shadow-lg scale-105`
                    : theme === 'dark'
                      ? 'text-[#C1BFBE] hover:bg-white/10 hover:text-white'
                      : 'text-[#2E2622] hover:bg-[#C1BFBE]/20 hover:text-[#2E2622]'
                }`}
              >
                <Icon className={`${isCollapsed ? '' : 'mr-3'} text-xl flex-shrink-0 ${
                  isActive ? 'animate-pulse' : ''
                }`} />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#0a0a0a] animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          theme === 'dark' ? 'border-[#4C4D4E]/30 bg-[#1a1a1a]/80' : 'border-[#C1BFBE]/30 bg-white/80'
        } backdrop-blur-xl space-y-2`}>
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-[#C1BFBE]'
                : 'bg-[#C1BFBE]/20 hover:bg-[#C1BFBE]/30 text-[#2E2622]'
            }`}
          >
            {theme === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            {!isCollapsed && (
              <span className="ml-3 font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            aria-label="Logout from admin panel"
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-[#8B7355] to-[#5F5F60] text-white hover:shadow-lg hover:scale-105`}
          >
            <FiLogOut className="text-xl" />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
