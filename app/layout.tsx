import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { SettingsProvider } from '@/lib/context/SettingsContext';
import { Toaster } from 'react-hot-toast';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} overflow-x-hidden`}>
        <SettingsProvider>
          <ThemeProvider>
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
