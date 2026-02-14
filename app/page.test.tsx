import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  describe('Structure', () => {
    it('renders as a main element', () => {
      const { container } = render(<Home />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('has main element with id="main-content"', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute('id', 'main-content');
    });

    it('main element is accessible by id selector', () => {
      const { container } = render(<Home />);
      const mainById = container.querySelector('#main-content');
      expect(mainById).toBeInTheDocument();
      expect(mainById?.tagName).toBe('MAIN');
    });
  });

  describe('Hero Component Rendering', () => {
    it('renders the Hero component', () => {
      render(<Home />);
      // Hero component has an h1 with "Brian Griffey"
      const heading = screen.getByRole('heading', { name: /brian griffey/i, level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('Hero component renders inside main element', () => {
      const { container } = render(<Home />);
      const main = container.querySelector('main');
      const heroSection = main?.querySelector('section[aria-label*="hero" i]');
      expect(heroSection).toBeInTheDocument();
    });

    it('renders Hero component with all CTA buttons', () => {
      render(<Home />);
      // Hero component renders three CTA buttons/links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Content Rendering', () => {
    it('renders the professional name', () => {
      render(<Home />);
      expect(screen.getByText(/brian griffey/i)).toBeInTheDocument();
    });

    it('renders the professional role', () => {
      render(<Home />);
      expect(screen.getByText(/living with intention, creating with purpose, learning continuously/i)).toBeInTheDocument();
    });

    it('renders the tagline', () => {
      render(<Home />);
      expect(screen.getByText(/finding zen through creation/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy starting with h1', () => {
      render(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('main element has accessible role', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('skip link target exists', () => {
      const { container } = render(<Home />);
      const skipTarget = container.querySelector('#main-content');
      expect(skipTarget).toBeInTheDocument();
    });
  });
});
