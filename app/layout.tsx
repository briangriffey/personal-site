import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SkipLink from '@/components/SkipLink/SkipLink';
import Navigation from '@/components/Navigation/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import './globals.css';

// Configure Noto Sans font with optimal loading
const notoSans = localFont({
  src: [
    {
      path: '../public/fonts/noto-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/noto-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/noto-sans-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/noto-sans-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/noto-sans-latin-800-normal.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-noto-sans',
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
        {/* <script
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
        /> */}
      </head>
      <body className={notoSans.className}>
        <ThemeProvider>
          <SkipLink />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
