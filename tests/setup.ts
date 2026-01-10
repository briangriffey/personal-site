import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

/**
 * Test Setup File
 *
 * This file configures the testing environment for Vitest with React Testing Library.
 * It imports jest-dom matchers and sets up mocks for Next.js components.
 */

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => {
      return React.createElement('a', { href, ...props }, children);
    },
  };
});

// Mock Next.js Image component
vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement('img', { src, alt, ...props });
    },
  };
});

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    useParams: vi.fn(() => ({})),
  };
});

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
