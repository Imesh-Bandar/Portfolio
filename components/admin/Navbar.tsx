"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import {
  FiLogOut, FiHome, FiAward, FiFolder, FiCode, FiTool,
  FiBook, FiBriefcase, FiImage, FiFileText, FiMessageSquare,
  FiUser, FiSun, FiMoon, FiSettings, FiMenu, FiX, FiChevronRight,
} from "react-icons/fi";
import { useTheme } from "@/lib/context/ThemeContext";

const navItems = [
  { href: "/admin",                label: "Dashboard",    icon: FiHome,         color: "#6366f1" },
  { href: "/admin/about",          label: "About",        icon: FiUser,         color: "#8b5cf6" },
  { href: "/admin/projects",       label: "Projects",     icon: FiFolder,       color: "#a855f7" },
  { href: "/admin/blogs",          label: "Blogs",        icon: FiFileText,     color: "#06b6d4" },
  { href: "/admin/gallery",        label: "Gallery",      icon: FiImage,        color: "#3b82f6" },
  { href: "/admin/skills",         label: "Skills",       icon: FiCode,         color: "#10b981" },
  { href: "/admin/technologies",   label: "Technologies", icon: FiTool,         color: "#f59e0b" },
  { href: "/admin/work-experience",label: "Experience",   icon: FiBriefcase,    color: "#f43f5e" },
  { href: "/admin/education",      label: "Education",    icon: FiBook,         color: "#6366f1" },
  { href: "/admin/certifications", label: "Certifications",icon: FiAward,      color: "#8b5cf6" },
  { href: "/admin/comments",       label: "Comments",     icon: FiMessageSquare,color: "#06b6d4" },
  { href: "/admin/settings",       label: "Settings",     icon: FiSettings,     color: "#a855f7" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle mobile menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-lg transition-all"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        }}
      >
        {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: isCollapsed ? 76 : 280,
          background: 'rgba(9, 9, 26, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(99,102,241,0.15)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.4)',
          zIndex: 40,
          transition: 'width 0.3s ease',
          transform: isMobileOpen ? 'translateX(0)' : undefined,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        className={!isMobileOpen ? '-translate-x-full lg:translate-x-0' : ''}
      >
        {/* Top grid pattern accent */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        {/* Top glow blob */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Brand */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(99,102,241,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40, height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                  fontWeight: 800, fontSize: 18, color: '#fff',
                }}
              >
                A
              </div>
              <div>
                <p style={{ color: '#e8e8ff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Admin Portal
                </p>
                <p style={{ color: '#7070a0', fontSize: 11 }}>Portfolio Manager</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex"
            style={{
              padding: 8, borderRadius: 8, cursor: 'pointer',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#7070a0',
              transition: 'all 0.2s',
            }}
          >
            <FiChevronRight
              size={16}
              style={{
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s',
              }}
            />
          </button>
        </div>

        {/* User profile */}
        {!isCollapsed && (
          <div
            style={{
              margin: '16px 16px 0',
              padding: '14px 16px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.2)',
              position: 'relative', zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 18, color: '#fff',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                  flexShrink: 0,
                }}
              >
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: '#e8e8ff', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Admin'}
                </p>
                <p style={{ color: '#7070a0', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email || 'admin@portfolio.com'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav style={{ padding: '16px 12px', flex: 1, position: 'relative', zIndex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isCollapsed ? 0 : 12,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  padding: isCollapsed ? '12px 0' : '10px 14px',
                  borderRadius: 12,
                  marginBottom: 4,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  background: isActive
                    ? `linear-gradient(135deg, ${item.color}28, ${item.color}12)`
                    : 'transparent',
                  borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                  color: isActive ? item.color : '#7070a0',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.08)';
                    (e.currentTarget as HTMLElement).style.color = '#e8e8ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#7070a0';
                  }
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color: isActive ? item.color : 'inherit',
                    flexShrink: 0,
                    filter: isActive ? `drop-shadow(0 0 6px ${item.color})` : 'none',
                  }}
                />
                {!isCollapsed && (
                  <span style={{ fontSize: 14, fontWeight: isActive ? 600 : 500, whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )}
                {!isCollapsed && isActive && (
                  <div
                    style={{
                      marginLeft: 'auto',
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: '12px',
            borderTop: '1px solid rgba(99,102,241,0.12)',
            background: 'rgba(7,7,15,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            position: 'relative', zIndex: 1,
          }}
        >
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              color: '#a5b4fc',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s',
              width: '100%',
            }}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            aria-label="Logout from admin panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(244,63,94,0.1))',
              border: '1px solid rgba(244,63,94,0.25)',
              color: '#fb7185',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              width: '100%',
            }}
          >
            <FiLogOut size={16} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
