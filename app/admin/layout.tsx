"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/Navbar";
import { useTheme } from "@/lib/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";
import AdminPageTransition from "@/components/admin/PageTransition";
import BubbleBackground from "@/components/BubbleBackground";
import CSSWave from "@/components/CSSWave";

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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#12122a',
            color: '#e8e8ff',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#12122a' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: '#12122a' } },
        }}
      />
      <CustomCursor />

      {isLoginPage ? (
        <div
          className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: '#07070f' }}
        >
          {/* Global Grid */}
          <div className="bg-grid-global bg-grid-dark opacity-30" />

          {/* Bubbles */}
          <BubbleBackground theme="dark" count={10} opacity={0.12} />

          {/* CSS Wave */}
          <CSSWave theme="dark" position="bottom" height={120} speed="slow" opacity={0.5} />

          {/* Glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 40%, rgba(99,102,241,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 50% 50% at 70% 60%, rgba(139,92,246,0.14) 0%, transparent 60%)
              `,
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full">{children}</div>
        </div>
      ) : (
        <ProtectedRoute>
          <div className="min-h-screen relative overflow-hidden" style={{ background: '#07070f' }}>

            {/* Admin animated background */}
            <div className="fixed inset-0 z-0" aria-hidden="true">
              {/* Mesh gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  background: `
                    radial-gradient(ellipse 55% 45% at 15% 25%, rgba(99,102,241,0.18) 0%, transparent 55%),
                    radial-gradient(ellipse 45% 55% at 85% 75%, rgba(139,92,246,0.14) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 35% at 55% 15%, rgba(59,130,246,0.10) 0%, transparent 50%),
                    radial-gradient(ellipse 35% 55% at 8% 80%, rgba(168,85,247,0.10) 0%, transparent 45%)
                  `,
                  animation: 'mesh-move-1 15s ease-in-out infinite',
                }}
              />
              {/* Global Grid */}
              <div className="bg-grid-global bg-grid-dark opacity-40" />

              {/* Bubbles */}
              <BubbleBackground theme="dark" count={14} opacity={0.12} />

              {/* CSS Wave */}
              <CSSWave theme="dark" position="bottom" height={150} speed="slow" opacity={0.6} />
            </div>

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="lg:ml-72 transition-all duration-300 relative z-10">
              <div className="min-h-screen p-4 lg:p-8 pt-20 lg:pt-8">
                <div
                  className="rounded-2xl shadow-2xl p-6 lg:p-8 transition-all duration-300"
                  style={{
                    background: 'rgba(14, 14, 31, 0.75)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99, 102, 241, 0.12)',
                    boxShadow: '0 0 60px rgba(99,102,241,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                >
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
