'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme modes supported by the application
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Resolved theme (what is actually displayed)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme Context value type
 */
export interface ThemeContextValue {
  /** Current theme mode ('light', 'dark', or 'system') */
  theme: Theme;
  /** Resolved theme ('light' or 'dark') - what is actually displayed */
  resolvedTheme: ResolvedTheme;
  /** Set the theme mode */
  setTheme: (theme: Theme) => void;
}

/**
 * ThemeProvider Component Props
 */
export interface ThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Default theme if no preference is stored */
  defaultTheme?: Theme;
  /** localStorage key for storing theme preference */
  storageKey?: string;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * ThemeProvider Component
 *
 * Manages theme state with support for light, dark, and system modes.
 * Handles localStorage persistence and listens to system preference changes.
 * Sets data-theme attribute on document.documentElement for CSS styling.
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Get system preference
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // Resolve the actual theme to display
  const resolveTheme = (themeMode: Theme): ResolvedTheme => {
    if (themeMode === 'system') {
      return getSystemTheme();
    }
    return themeMode;
  };

  // Apply theme to DOM
  const applyTheme = (themeMode: Theme) => {
    const resolved = resolveTheme(themeMode);
    setResolvedTheme(resolved);

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', resolved);
    }
  };

  // Initialize theme from localStorage or default
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
        setThemeState(stored as Theme);
        applyTheme(stored as Theme);
      } else {
        applyTheme(defaultTheme);
      }
    } catch (error) {
      // localStorage might not be available
      applyTheme(defaultTheme);
    }
  }, [storageKey, defaultTheme]);

  // Listen to system theme changes when in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      document.documentElement.setAttribute('data-theme', newResolvedTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);

    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      // localStorage might not be available
    }
  };

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 *
 * Custom hook to access theme context.
 * Must be used within a ThemeProvider.
 *
 * @returns Theme context value
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
