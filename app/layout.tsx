import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SkipLink from '@/components/SkipLink/SkipLink';
import './globals.css';

// Configure Inter font with optimal loading
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: 'Personal Website',
  description: 'A modern personal website built with Next.js 15',
};

// Viewport configuration for responsive design
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
