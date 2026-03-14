"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminNavbar from "@/components/admin/Navbar";
import { useTheme } from "@/lib/context/ThemeContext";
import DoodleBackground from "@/components/DoodleBackground";
import CustomCursor from "@/components/CustomCursor";
import AdminPageTransition from "@/components/admin/PageTransition";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <CustomCursor />
      
      <div className={`transition-colors min-h-screen relative ${
        theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-black'
      }`}>
        {!isLoginPage && <DoodleBackground />}
        
        {isLoginPage ? (
          <div className="relative z-10 min-h-screen flex items-center justify-center">{children}</div>
        ) : (
          <ProtectedRoute>
            <div className="relative z-10 admin-theme min-h-screen">
              <AdminNavbar />
              <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className={`backdrop-blur-sm rounded-lg shadow-lg border p-6 transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#1a1a1a]/80 border-[#4a4a4a]'
                    : 'bg-white/80 border-[#e0e0e0]'
                }`}>
                  <AdminPageTransition>
                    {children}
                  </AdminPageTransition>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        )}
      </div>
    </AuthProvider>
  );
}
