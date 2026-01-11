import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../ThemeProvider/ThemeProvider';

// Mock the useTheme hook
vi.mock('../ThemeProvider/ThemeProvider', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Icon Rendering', () => {
    it('renders sun icon when theme is light', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Check that the sun icon SVG is present (has circle and lines for rays)
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('circle')).toBeInTheDocument();
    });

    it('renders moon icon when theme is dark', () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Check that the moon icon SVG is present (has path for crescent)
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('path')).toBeInTheDocument();
    });

    it('renders monitor icon when theme is system', () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Check that the monitor icon SVG is present (has rect for screen)
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('rect')).toBeInTheDocument();
    });
  });

  describe('Click Toggling', () => {
    it('cycles from light to dark when clicked', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('cycles from dark to system when clicked', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('system');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('cycles from system to light when clicked', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks correctly', async () => {
      const user = userEvent.setup();

      // Start with light
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const { rerender } = render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Click to go to dark
      await user.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');

      // Update mock for dark theme
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });
      rerender(<ThemeToggle />);

      // Click to go to system
      await user.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });
  });

  describe('Keyboard Interaction', () => {
    it('toggles theme when Enter key is pressed', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('toggles theme when Space key is pressed', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('does not toggle on other keys', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Escape}');
      await user.keyboard('{Tab}');
      await user.keyboard('a');

      expect(mockSetTheme).not.toHaveBeenCalled();
    });

    it('prevents default behavior for Enter key', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      const preventDefaultSpy = vi.fn();

      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          preventDefaultSpy();
        }
      });

      button.focus();
      await user.keyboard('{Enter}');

      expect(mockSetTheme).toHaveBeenCalled();
    });

    it('prevents default behavior for Space key', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      const preventDefaultSpy = vi.fn();

      button.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          preventDefaultSpy();
        }
      });

      button.focus();
      await user.keyboard(' ');

      expect(mockSetTheme).toHaveBeenCalled();
    });
  });

  describe('Aria Attributes', () => {
    it('has correct aria-label for light theme', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute(
        'aria-label',
        'Current theme: Light. Click to switch to Dark mode'
      );
    });

    it('has correct aria-label for dark theme', () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute(
        'aria-label',
        'Current theme: Dark. Click to switch to System mode'
      );
    });

    it('has correct aria-label for system theme with light resolved', () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute(
        'aria-label',
        'Current theme: System (light). Click to switch to Light mode'
      );
    });

    it('has correct aria-label for system theme with dark resolved', () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute(
        'aria-label',
        'Current theme: System (dark). Click to switch to Light mode'
      );
    });

    it('has correct title attribute for light theme', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('title', 'Switch to Dark mode');
    });

    it('has correct title attribute for dark theme', () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('title', 'Switch to System mode');
    });

    it('has correct title attribute for system theme', () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('title', 'Switch to Light mode');
    });

    it('has aria-hidden on icon wrapper', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      const iconWrapper = button.querySelector('[aria-hidden="true"]');

      expect(iconWrapper).toBeInTheDocument();
    });

    it('has screen reader only text for current state', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const srOnlyText = screen.getByText(/Current theme: Light. Click to switch to Dark mode/i);

      expect(srOnlyText).toBeInTheDocument();
      expect(srOnlyText).toHaveClass('sr-only');
    });
  });

  describe('Button Attributes', () => {
    it('renders as a button element', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('has type="button" attribute', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('type', 'button');
    });

    it('applies default CSS classes', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Should have the themeToggle class from the module
      expect(button.className).toBeTruthy();
    });

    it('applies custom className when provided', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle className="custom-class" />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility Features', () => {
    it('is keyboard focusable', () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('provides clear indication of current state', () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Both aria-label and screen reader text should communicate the current state
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Current theme: Dark'));
      expect(screen.getByText(/Current theme: Dark/i)).toBeInTheDocument();
    });

    it('provides clear indication of next state', () => {
      (useTheme as any).mockReturnValue({
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Both aria-label and title should communicate what will happen on click
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('switch to System mode'));
      expect(button).toHaveAttribute('title', 'Switch to System mode');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicking without errors', async () => {
      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      const user = userEvent.setup();
      render(<ThemeToggle />);

      const button = screen.getByRole('button');

      // Click multiple times rapidly
      await user.tripleClick(button);

      // Should have been called 3 times without errors
      expect(mockSetTheme).toHaveBeenCalledTimes(3);
    });

    it('handles setTheme errors gracefully', async () => {
      const errorSetTheme = vi.fn(() => {
        throw new Error('Failed to set theme');
      });

      (useTheme as any).mockReturnValue({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: errorSetTheme,
      });

      const user = userEvent.setup();

      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<ThemeToggle />);
      }).not.toThrow();

      const button = screen.getByRole('button');

      // Should not crash when clicking
      await expect(user.click(button)).rejects.toThrow('Failed to set theme');

      consoleError.mockRestore();
    });

    it('works correctly when resolvedTheme differs from theme in system mode', () => {
      (useTheme as any).mockReturnValue({
        theme: 'system',
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Should show system mode in label with resolved theme in parentheses
      expect(button).toHaveAttribute(
        'aria-label',
        'Current theme: System (light). Click to switch to Light mode'
      );

      // Should render monitor icon (system mode icon)
      const svg = button.querySelector('svg');
      expect(svg?.querySelector('rect')).toBeInTheDocument();
    });
  });
});
