import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CauseCard, { Cause } from './CauseCard';

// Mock next/image to simplify testing
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { onError?: () => void }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockCause: Cause = {
  id: 'test-cause',
  title: 'Test Cause Organization',
  description: 'This is a test description for the cause.',
  imageUrl: '/images/causes/test.jpg',
  donateUrl: 'https://example.org/donate',
};

describe('CauseCard', () => {
  describe('Rendering', () => {
    it('renders cause title correctly', () => {
      render(<CauseCard cause={mockCause} />);
      expect(screen.getByRole('heading', { name: 'Test Cause Organization' })).toBeInTheDocument();
    });

    it('renders cause description correctly', () => {
      render(<CauseCard cause={mockCause} />);
      expect(screen.getByText('This is a test description for the cause.')).toBeInTheDocument();
    });

    it('renders donate link with correct URL', () => {
      render(<CauseCard cause={mockCause} />);
      const donateLink = screen.getByRole('link', { name: /donate/i });
      expect(donateLink).toHaveAttribute('href', 'https://example.org/donate');
    });

    it('renders image with correct alt text', () => {
      render(<CauseCard cause={mockCause} />);
      const image = screen.getByRole('img', { name: 'Test Cause Organization' });
      expect(image).toBeInTheDocument();
    });
  });

  describe('External Link Security', () => {
    it('donate link has target="_blank" attribute', () => {
      render(<CauseCard cause={mockCause} />);
      const donateLink = screen.getByRole('link', { name: /donate/i });
      expect(donateLink).toHaveAttribute('target', '_blank');
    });

    it('donate link has rel="noopener noreferrer" attribute', () => {
      render(<CauseCard cause={mockCause} />);
      const donateLink = screen.getByRole('link', { name: /donate/i });
      expect(donateLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('renders article with correct aria-label', () => {
      render(<CauseCard cause={mockCause} />);
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        'Cause: Test Cause Organization'
      );
    });

    it('donate link includes accessible label with new tab indicator', () => {
      render(<CauseCard cause={mockCause} />);
      const donateLink = screen.getByRole('link', { name: /donate to test cause organization \(opens in new tab\)/i });
      expect(donateLink).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('accepts and applies custom className', () => {
      render(<CauseCard cause={mockCause} className="custom-class" />);
      const article = screen.getByRole('article');
      expect(article).toHaveClass('custom-class');
    });
  });

  describe('Image Error Handling', () => {
    it('displays fallback placeholder when image fails to load', () => {
      render(<CauseCard cause={mockCause} />);

      // Get the image and simulate an error
      const image = screen.getByRole('img', { name: 'Test Cause Organization' });
      fireEvent.error(image);

      // After error, placeholder should be shown with the first letter of the title
      expect(screen.getByText('T')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('displays first letter of cause title as placeholder icon', () => {
      const causeWithDifferentTitle: Cause = {
        ...mockCause,
        title: 'Another Cause',
      };
      render(<CauseCard cause={causeWithDifferentTitle} />);

      // Simulate image error
      const image = screen.getByRole('img', { name: 'Another Cause' });
      fireEvent.error(image);

      // Should show 'A' as the placeholder icon
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });
});
