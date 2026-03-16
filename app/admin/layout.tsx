"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/Navbar";
import { useTheme } from "@/lib/context/ThemeContext";
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

      {isLoginPage ? (
        <div className="relative z-10 min-h-screen flex items-center justify-center">{children}</div>
      ) : (
        <ProtectedRoute>
          <div className="min-h-screen relative overflow-hidden">
            {/* Portfolio-themed Animated Background */}
            <div className="fixed inset-0 z-0">
              {/* Base gradient matching portfolio */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]'
                  : 'bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#fafafa]'
              }`}></div>

              {/* Floating gradient orbs - portfolio colors */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#C1BFBE] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#5F5F60] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8B7355] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A89B8E] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '6s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4C4D4E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '8s' }}></div>

              {/* Grid pattern overlay */}
              <div className={`absolute inset-0 ${
                theme === 'dark'
                  ? 'bg-[linear-gradient(rgba(193,191,190,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(193,191,190,0.02)_1px,transparent_1px)]'
                  : 'bg-[linear-gradient(rgba(46,38,34,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(46,38,34,0.02)_1px,transparent_1px)]'
              } bg-[size:50px_50px]`}></div>
            </div>

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="lg:ml-72 transition-all duration-300 relative z-10">
              <div className="min-h-screen p-4 lg:p-8 pt-20 lg:pt-8">
                <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border p-6 lg:p-8 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#1a1a1a]/70 border-[#4C4D4E]/20 shadow-[#C1BFBE]/5'
                    : 'bg-white/70 border-[#C1BFBE]/30 shadow-[#C1BFBE]/20'
                }`}>
                  <AdminPageTransition>
                    {children}
                  </AdminPageTransition>
                </div>
              </div>
            </main>
          </div>
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
