import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  output: 'export',
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
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
