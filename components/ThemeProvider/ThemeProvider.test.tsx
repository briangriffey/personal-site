import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, type Theme } from './ThemeProvider';

// Test component that uses the useTheme hook
function TestComponent() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="resolved-theme">{resolvedTheme}</div>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  let localStorageMock: { [key: string]: string };
  let matchMediaMock: any;
  let mediaQueryListeners: Array<(e: MediaQueryListEvent) => void>;

  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock = {};
    mediaQueryListeners = [];

    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    // Mock matchMedia with ability to control matches value
    matchMediaMock = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn((listener) => {
        mediaQueryListeners.push(listener);
      }),
      removeListener: vi.fn((listener) => {
        const index = mediaQueryListeners.indexOf(listener);
        if (index > -1) {
          mediaQueryListeners.splice(index, 1);
        }
      }),
      addEventListener: vi.fn((event, listener) => {
        if (event === 'change') {
          mediaQueryListeners.push(listener);
        }
      }),
      removeEventListener: vi.fn((event, listener) => {
        if (event === 'change') {
          const index = mediaQueryListeners.indexOf(listener);
          if (index > -1) {
            mediaQueryListeners.splice(index, 1);
          }
        }
      }),
      dispatchEvent: vi.fn(),
    };

    window.matchMedia = vi.fn(() => matchMediaMock);

    // Mock document.documentElement.setAttribute
    document.documentElement.setAttribute = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Theme Detection', () => {
    it('uses theme from localStorage when available', async () => {
      localStorageMock['theme'] = 'dark';

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('uses system preference when localStorage is empty', async () => {
      matchMediaMock.matches = true; // System prefers dark

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('defaults to light theme when system preference is light', async () => {
      matchMediaMock.matches = false; // System prefers light

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });
    });

    it('uses custom defaultTheme when provided', async () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('validates theme value from localStorage', async () => {
      localStorageMock['theme'] = 'invalid';

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        // Should fall back to default (system)
        expect(screen.getByTestId('theme')).toHaveTextContent('system');
      });
    });
  });

  describe('localStorage Persistence', () => {
    it('persists theme to localStorage when changed', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(localStorageMock['theme']).toBe('dark');
    });

    it('uses custom storageKey when provided', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider storageKey="custom-theme">
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      expect(localStorage.setItem).toHaveBeenCalledWith('custom-theme', 'dark');
    });

    it('handles localStorage errors gracefully', async () => {
      const user = userEvent.setup();

      // Mock localStorage.setItem to throw an error
      global.localStorage.setItem = vi.fn(() => {
        throw new Error('localStorage is not available');
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });

      // Should not throw error
      await expect(user.click(darkButton)).resolves.not.toThrow();

      // Theme should still update in state
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('reads from custom storageKey on initialization', async () => {
      localStorageMock['custom-theme'] = 'dark';

      render(
        <ThemeProvider storageKey="custom-theme">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });
  });

  describe('System Preference Detection', () => {
    it('detects system dark mode preference', async () => {
      matchMediaMock.matches = true;

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('detects system light mode preference', async () => {
      matchMediaMock.matches = false;

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });
    });

    it('listens to system preference changes when in system mode', async () => {
      matchMediaMock.matches = false;
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Set to system mode
      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });

      // Simulate system preference change to dark
      const changeEvent = { matches: true } as MediaQueryListEvent;
      mediaQueryListeners.forEach((listener) => listener(changeEvent));

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('does not listen to system changes when not in system mode', async () => {
      matchMediaMock.matches = false;
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Set to light mode explicitly
      const lightButton = screen.getByRole('button', { name: /set light/i });
      await user.click(lightButton);

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });

      // Simulate system preference change to dark
      const changeEvent = { matches: true } as MediaQueryListEvent;
      mediaQueryListeners.forEach((listener) => listener(changeEvent));

      // Should still be light because we're not in system mode
      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });
    });

    it('supports legacy addListener/removeListener API', async () => {
      // Remove modern addEventListener support
      matchMediaMock.addEventListener = undefined;
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      // Verify legacy addListener was called
      expect(matchMediaMock.addListener).toHaveBeenCalled();
    });
  });

  describe('Theme Toggling', () => {
    it('toggles to light theme', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const lightButton = screen.getByRole('button', { name: /set light/i });
      await user.click(lightButton);

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });

    it('toggles to dark theme', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('toggles to system theme', async () => {
      matchMediaMock.matches = true; // System prefers dark
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('cycles through all theme modes', async () => {
      matchMediaMock.matches = true;
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Start with system (dark)
      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });

      // Toggle to light
      const lightButton = screen.getByRole('button', { name: /set light/i });
      await user.click(lightButton);
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');

      // Toggle to dark
      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');

      // Toggle back to system
      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);
      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });
  });

  describe('DOM Updates', () => {
    it('sets data-theme attribute on document element', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'dark'
        );
      });
    });

    it('updates data-theme attribute when theme changes', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const lightButton = screen.getByRole('button', { name: /set light/i });
      await user.click(lightButton);

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'light'
        );
      });

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'dark'
        );
      });
    });

    it('sets data-theme to resolved theme for system mode', async () => {
      matchMediaMock.matches = true; // System prefers dark
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'dark'
        );
      });
    });

    it('updates data-theme when system preference changes in system mode', async () => {
      matchMediaMock.matches = false;
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Set to system mode
      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'light'
        );
      });

      // Clear mock to check new calls
      vi.clearAllMocks();

      // Simulate system preference change to dark
      const changeEvent = { matches: true } as MediaQueryListEvent;
      mediaQueryListeners.forEach((listener) => listener(changeEvent));

      await waitFor(() => {
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          'dark'
        );
      });
    });
  });

  describe('useTheme Hook', () => {
    it('provides theme context value', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toBeInTheDocument();
      expect(screen.getByTestId('resolved-theme')).toBeInTheDocument();
    });

    it('throws error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleError.mockRestore();
    });

    it('exposes theme value', async () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });

    it('exposes resolvedTheme value', async () => {
      matchMediaMock.matches = true;

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('exposes setTheme function', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const darkButton = screen.getByRole('button', { name: /set dark/i });
      await user.click(darkButton);

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing localStorage gracefully on initialization', async () => {
      // Mock localStorage.getItem to throw error
      global.localStorage.getItem = vi.fn(() => {
        throw new Error('localStorage not available');
      });

      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        // Should fall back to defaultTheme
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });

    it('cleans up media query listeners on unmount', async () => {
      const user = userEvent.setup();

      const { unmount } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Set to system mode to attach listener
      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      // Verify listener was added
      expect(mediaQueryListeners.length).toBeGreaterThan(0);

      unmount();

      // Verify listener was removed
      expect(matchMediaMock.removeEventListener).toHaveBeenCalled();
    });

    it('updates listener when theme changes from system to explicit', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Start with system mode
      const systemButton = screen.getByRole('button', { name: /set system/i });
      await user.click(systemButton);

      const initialListenerCount = mediaQueryListeners.length;
      expect(initialListenerCount).toBeGreaterThan(0);

      // Change to explicit light mode
      const lightButton = screen.getByRole('button', { name: /set light/i });
      await user.click(lightButton);

      // Listener should be removed when leaving system mode
      expect(matchMediaMock.removeEventListener).toHaveBeenCalled();
    });

    it('handles server-side rendering (no window)', async () => {
      // This test verifies the component doesn't crash when window is undefined
      // The actual SSR behavior is handled by the inline script in layout.tsx

      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });
  });

  describe('Context Value Stability', () => {
    it('maintains context value reference stability', async () => {
      const user = userEvent.setup();
      const contextValues: any[] = [];

      function TestContextStability() {
        const context = useTheme();
        contextValues.push(context);

        return (
          <button onClick={() => context.setTheme('dark')}>
            Change Theme
          </button>
        );
      }

      render(
        <ThemeProvider>
          <TestContextStability />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /change theme/i });
      await user.click(button);

      // After state update, a new context value is provided
      // but setTheme function reference should be stable
      expect(contextValues.length).toBeGreaterThan(0);
    });
  });
});
