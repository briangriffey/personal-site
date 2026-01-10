import type { Metadata } from 'next';
import Link from 'next/link';
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
        <nav style={{
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '2rem',
          padding: '1rem 2rem',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                color: '#1a1a1a',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'color 0.2s'
              }}
            >
              Home
            </Link>
            <Link
              href="/about"
              style={{
                textDecoration: 'none',
                color: '#1a1a1a',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'color 0.2s'
              }}
            >
              About
            </Link>
          </div>
        </nav>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}