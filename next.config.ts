import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    // Disable ESLint during production builds for Docker
    // Run linting separately in CI/CD pipeline
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds (should be done in CI/CD)
    ignoreBuildErrors: true,
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize for modern browsers only
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
