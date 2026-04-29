import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { SettingsProvider } from '@/lib/context/SettingsContext';
import { Toaster } from 'react-hot-toast';
import PageTransition from '@/components/PageTransition';
import GlobalGrid from '@/components/GlobalGrid';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Imesh Bandara - Portfolio',
  description: 'Software Engineer | Full Stack Developer | Problem Solver',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} overflow-x-hidden`}>
        <SettingsProvider>
          <ThemeProvider>
            <GlobalGrid />
            <PageTransition>
              {children}
            </PageTransition>
            <Toaster position="top-right" />
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

