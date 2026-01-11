'use client';

import React from 'react';
import { useTheme, type Theme } from '../ThemeProvider/ThemeProvider';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle Component Props
 */
export interface ThemeToggleProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * ThemeToggle Component
 *
 * An accessible toggle button that cycles between light, dark, and system theme modes.
 * Features appropriate icons, aria labels, keyboard support, and smooth animations.
 *
 * Cycle order: light → dark → system → light
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  /**
   * Cycles to the next theme in sequence: light → dark → system → light
   */
  const cycleTheme = () => {
    const nextTheme: Record<Theme, Theme> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    setTheme(nextTheme[theme]);
  };

  /**
   * Get human-readable label for current theme
   */
  const getThemeLabel = (): string => {
    if (theme === 'system') {
      return `System (${resolvedTheme})`;
    }
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  /**
   * Get next theme label for accessibility
   */
  const getNextThemeLabel = (): string => {
    const nextTheme: Record<Theme, string> = {
      light: 'Dark',
      dark: 'System',
      system: 'Light',
    };
    return nextTheme[theme];
  };

  /**
   * Handle keyboard events (Enter and Space)
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cycleTheme();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className}`}
      onClick={cycleTheme}
      onKeyDown={handleKeyDown}
      aria-label={`Current theme: ${getThemeLabel()}. Click to switch to ${getNextThemeLabel()} mode`}
      title={`Switch to ${getNextThemeLabel()} mode`}
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        {/* Sun Icon - Light Mode */}
        {theme === 'light' && (
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="1" x2="10" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="19" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="10" x2="1" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16.364" y1="3.636" x2="14.95" y2="5.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5.05" y1="14.95" x2="3.636" y2="16.364" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16.364" y1="16.364" x2="14.95" y2="14.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5.05" y1="5.05" x2="3.636" y2="3.636" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}

        {/* Moon Icon - Dark Mode */}
        {theme === 'dark' && (
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 11.5C16.3 13.9 13.8 15.5 11 15.5C7.1 15.5 4 12.4 4 8.5C4 5.7 5.6 3.2 8 2C5.2 2.4 3 4.8 3 7.8C3 11.2 5.8 14 9.2 14C12.2 14 14.6 11.8 15 9H17.5V11.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Monitor Icon - System Mode */}
        {theme === 'system' && (
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="7" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {/* Screen reader only text for current state */}
      <span className="sr-only">
        Current theme: {getThemeLabel()}. Click to switch to {getNextThemeLabel()} mode.
      </span>
    </button>
  );
}
