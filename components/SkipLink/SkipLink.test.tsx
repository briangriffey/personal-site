import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipLink from './SkipLink';

describe('SkipLink Component', () => {
  describe('Rendering', () => {
    it('renders as a link element', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });

    it('renders with correct CSS class', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      expect(link).toHaveClass('skipLink');
    });
  });

  describe('Href Attribute', () => {
    it('has correct href pointing to #main-content', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      expect(link).toHaveAttribute('href', '#main-content');
    });
  });

  describe('Accessible Text Content', () => {
    it('displays "Skip to main content" text', () => {
      render(<SkipLink />);
      expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    });

    it('has accessible name from text content', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      expect(link).toBeInTheDocument();
      expect(link.textContent).toBe('Skip to main content');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible as a link', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      // Links are focusable by default, verify it exists and is a link
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });

    it('provides descriptive link text for screen readers', () => {
      render(<SkipLink />);
      const link = screen.getByRole('link', { name: /skip to main content/i });
      // Verify the link has meaningful text content, not just "skip" or "click here"
      expect(link.textContent).toContain('main content');
    });
  });
});
