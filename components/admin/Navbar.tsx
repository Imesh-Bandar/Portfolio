"use client";

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
  FiSettings
} from "react-icons/fi";
import { useTheme } from "@/lib/context/ThemeContext";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: FiHome },
    { href: "/admin/about", label: "About", icon: FiUser },
    { href: "/admin/projects", label: "Projects", icon: FiFolder },
    { href: "/admin/blogs", label: "Blogs", icon: FiFileText },
    { href: "/admin/gallery", label: "Gallery", icon: FiImage },
    { href: "/admin/skills", label: "Skills", icon: FiCode },
    { href: "/admin/technologies", label: "Technologies", icon: FiTool },
    { href: "/admin/work-experience", label: "Experience", icon: FiBriefcase },
    { href: "/admin/education", label: "Education", icon: FiBook },
    { href: "/admin/certifications", label: "Certifications", icon: FiAward },
    { href: "/admin/comments", label: "Comments", icon: FiMessageSquare },
    { href: "/admin/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <nav className={`border-b shadow-md transition-colors ${
      theme === 'dark' 
        ? 'bg-[#1a1a1a]/80 backdrop-blur-md border-[#2a2a2a]' 
        : 'bg-white/80 backdrop-blur-md border-[#e0e0e0]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-auto md:h-16 pt-3 md:pt-0">
          <div className="flex space-x-6 overflow-x-auto hide-scrollbar w-full md:w-auto pb-3 md:pb-0 mb-3 md:mb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-shrink-0 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? (theme === 'dark' ? "border-white text-white" : "border-black text-black")
                      : (theme === 'dark' 
                          ? "border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-200" 
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800")
                  }`}
                >
                  <Icon className="mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end pb-3 md:pb-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-500/20">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{user?.name}</span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-[#2a2a2a] text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={logout}
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors ${
                theme === 'dark'
                  ? 'border-[#4C4D4E] text-gray-300 bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
