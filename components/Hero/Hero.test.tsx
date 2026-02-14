import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  describe('Content Rendering', () => {
    it('renders the name heading', () => {
      render(<Hero />);
      const heading = screen.getByRole('heading', { name: /brian griffey/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('renders the professional role/title', () => {
      render(<Hero />);
      const role = screen.getByText(/living with intention, creating with purpose, learning continuously/i);
      expect(role).toBeInTheDocument();
    });

    it('renders the tagline/value proposition', () => {
      render(<Hero />);
      const tagline = screen.getByText(/finding zen through creation/i);
      expect(tagline).toBeInTheDocument();
    });

    it('renders the full tagline text', () => {
      render(<Hero />);
      const tagline = screen.getByText(/building thoughtfully, learning openly, staying present/i);
      expect(tagline).toBeInTheDocument();
    });
  });

  describe('CTA Buttons', () => {
    it('renders the View Projects button', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /view my projects/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/view projects/i);
    });

    it('renders the Contact button', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /contact me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/contact/i);
    });

    it('renders the Read Blog button', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /read my blog/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/read blog/i);
    });

    it('renders all three CTA buttons', () => {
      render(<Hero />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });

    it('View Projects button has correct href', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /view my projects/i });
      expect(button).toHaveAttribute('href', '/projects');
    });

    it('Contact button has correct href', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /contact me/i });
      expect(button).toHaveAttribute('href', '/contact');
    });

    it('Read Blog button has correct href', () => {
      render(<Hero />);
      const button = screen.getByRole('link', { name: /read my blog/i });
      expect(button).toHaveAttribute('href', '/blog');
    });
  });

  describe('Structure', () => {
    it('renders as a section element', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has decorative background elements with aria-hidden', () => {
      const { container } = render(<Hero />);
      const backgroundElement = container.querySelector('[aria-hidden="true"]');
      expect(backgroundElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on section element', () => {
      render(<Hero />);
      const section = screen.getByRole('region', { name: /hero section/i });
      expect(section).toBeInTheDocument();
      expect(section.tagName).toBe('SECTION');
    });

    it('has proper heading hierarchy with h1', () => {
      render(<Hero />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent(/brian griffey/i);
    });

    it('CTA buttons have descriptive aria-labels', () => {
      render(<Hero />);
      expect(screen.getByRole('link', { name: /view my projects/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact me/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /read my blog/i })).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className when provided', () => {
      const { container } = render(<Hero className="custom-hero" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-hero');
    });

    it('maintains base styles when custom className is provided', () => {
      const { container } = render(<Hero className="custom-hero" />);
      const section = container.querySelector('section');
      // Should have both the base hero class and the custom class
      expect(section?.className).toContain('hero');
      expect(section?.className).toContain('custom-hero');
    });

    it('renders without custom className', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
