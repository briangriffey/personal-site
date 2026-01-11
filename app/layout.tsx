import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SkipLink from '@/components/SkipLink/SkipLink';
import Navigation from '@/components/Navigation/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = 'theme';
                  const stored = localStorage.getItem(storageKey);
                  let theme = 'light';

                  if (stored === 'light' || stored === 'dark') {
                    theme = stored;
                  } else if (stored === 'system' || !stored) {
                    // Check system preference
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }

                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // localStorage might not be available
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SkipLink />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
