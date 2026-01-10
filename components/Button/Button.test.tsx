import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  describe('Rendering Variants', () => {
    it('renders with primary variant by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('primary');
    });

    it('renders with secondary variant when specified', () => {
      render(<Button variant="secondary">Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('secondary');
    });
  });

  describe('Button Rendering (no href)', () => {
    it('renders as a button element when href is not provided', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button.tagName).toBe('BUTTON');
    });

    it('renders with default type="button"', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with custom type when specified', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Internal Link Rendering', () => {
    it('renders as Next.js Link when href starts with /', () => {
      render(<Button href="/about">About</Button>);
      const link = screen.getByRole('link', { name: /about/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/about');
    });

    it('does not have target or rel attributes for internal links', () => {
      render(<Button href="/contact">Contact</Button>);
      const link = screen.getByRole('link', { name: /contact/i });
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('applies primary variant styles to internal link', () => {
      render(<Button href="/home" variant="primary">Home</Button>);
      const link = screen.getByRole('link', { name: /home/i });
      expect(link).toHaveClass('primary');
    });

    it('applies secondary variant styles to internal link', () => {
      render(<Button href="/home" variant="secondary">Home</Button>);
      const link = screen.getByRole('link', { name: /home/i });
      expect(link).toHaveClass('secondary');
    });
  });

  describe('External Link Rendering', () => {
    it('renders as anchor tag when href does not start with /', () => {
      render(<Button href="https://example.com">External</Button>);
      const link = screen.getByRole('link', { name: /external/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('has target="_blank" for external links', () => {
      render(<Button href="https://example.com">External</Button>);
      const link = screen.getByRole('link', { name: /external/i });
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('has rel="noopener noreferrer" for external links', () => {
      render(<Button href="https://example.com">External</Button>);
      const link = screen.getByRole('link', { name: /external/i });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('applies variant styles to external link', () => {
      render(<Button href="https://example.com" variant="secondary">External</Button>);
      const link = screen.getByRole('link', { name: /external/i });
      expect(link).toHaveClass('secondary');
    });
  });

  describe('Accessibility', () => {
    it('applies aria-label to button', () => {
      render(<Button ariaLabel="Close dialog">X</Button>);
      const button = screen.getByRole('button', { name: /close dialog/i });
      expect(button).toBeInTheDocument();
    });

    it('applies aria-label to internal link', () => {
      render(<Button href="/home" ariaLabel="Navigate to home">Home</Button>);
      const link = screen.getByRole('link', { name: /navigate to home/i });
      expect(link).toBeInTheDocument();
    });

    it('applies aria-label to external link', () => {
      render(<Button href="https://example.com" ariaLabel="Visit external site">Visit</Button>);
      const link = screen.getByRole('link', { name: /visit external site/i });
      expect(link).toBeInTheDocument();
    });

    it('uses children as accessible name when aria-label is not provided', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to button', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button', { name: /button/i });
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('button'); // base class should still be present
    });

    it('applies custom className to internal link', () => {
      render(<Button href="/page" className="custom-class">Link</Button>);
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toHaveClass('custom-class');
      expect(link).toHaveClass('button'); // base class should still be present
    });

    it('applies custom className to external link', () => {
      render(<Button href="https://example.com" className="custom-class">Link</Button>);
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toHaveClass('custom-class');
      expect(link).toHaveClass('button'); // base class should still be present
    });

    it('combines base, variant, and custom classes', () => {
      render(<Button variant="secondary" className="custom-class">Button</Button>);
      const button = screen.getByRole('button', { name: /button/i });
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('secondary');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Children Rendering', () => {
    it('renders text children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders complex children elements', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });
});
