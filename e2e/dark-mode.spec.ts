import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to ensure clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Theme Toggle Component', () => {
    test('should have theme toggle button visible', async ({ page }) => {
      await page.goto('/');

      // Theme toggle should be visible and accessible
      const themeToggle = page.getByRole('button', { name: /current theme:/i });
      await expect(themeToggle).toBeVisible();
    });

    test('should have proper aria-label for accessibility', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });
      const ariaLabel = await themeToggle.getAttribute('aria-label');

      // Aria label should describe current state and next action
      expect(ariaLabel).toMatch(/current theme:/i);
      expect(ariaLabel).toMatch(/click to switch to/i);
    });

    test('should have proper title attribute', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });
      const title = await themeToggle.getAttribute('title');

      expect(title).toMatch(/switch to/i);
    });
  });

  test.describe('Theme Switching', () => {
    test('should toggle theme when button is clicked', async ({ page }) => {
      await page.goto('/');

      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('data-theme');

      // Click theme toggle
      const themeToggle = page.getByRole('button', { name: /current theme:/i });
      await themeToggle.click();

      // Theme should have changed
      const newTheme = await page.locator('html').getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    });

    test('should cycle through all theme modes', async ({ page }) => {
      await page.goto('/');

      // Set to light mode first
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      });
      await page.reload();

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Should start at light
      let ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/current theme: light/i);

      // Click to dark
      await themeToggle.click();
      ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/current theme: dark/i);

      // Click to system
      await themeToggle.click();
      ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/current theme: system/i);

      // Click back to light
      await themeToggle.click();
      ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/current theme: light/i);
    });

    test('should update data-theme attribute on html element', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Set to light
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      });
      await page.reload();

      let dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('light');

      // Toggle to dark
      await themeToggle.click();
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });

    test('should be keyboard accessible', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Focus the toggle button
      await themeToggle.focus();
      await expect(themeToggle).toBeFocused();

      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('data-theme');

      // Press Enter to toggle
      await page.keyboard.press('Enter');

      // Theme should have changed
      const newTheme = await page.locator('html').getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    });

    test('should be keyboard accessible with Space key', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Focus the toggle button
      await themeToggle.focus();

      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('data-theme');

      // Press Space to toggle
      await page.keyboard.press('Space');

      // Theme should have changed
      const newTheme = await page.locator('html').getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    });
  });

  test.describe('Theme Persistence', () => {
    test('should persist theme preference in localStorage', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Toggle to dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
      });
      await page.reload();

      await themeToggle.click();

      // Check localStorage
      const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(storedTheme).toBe('dark');
    });

    test('should persist theme across page navigation', async ({ page }) => {
      await page.goto('/');

      // Set to dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      // Verify dark mode is set
      let dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');

      // Navigate to another page (if it exists, otherwise stay on home)
      await page.goto('/blog');

      // Theme should still be dark
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');

      // Navigate back to home
      await page.goto('/');

      // Theme should still be dark
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });

    test('should persist theme across browser reload', async ({ page }) => {
      await page.goto('/');

      // Set to dark mode
      const themeToggle = page.getByRole('button', { name: /current theme:/i });
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
      });
      await page.reload();

      await themeToggle.click();

      // Verify dark mode
      let dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');

      // Reload the page
      await page.reload();

      // Theme should still be dark
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });

    test('should restore theme from localStorage on initial load', async ({ page }) => {
      // Set theme in localStorage before loading page
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });

      // Reload to pick up the stored theme
      await page.reload();

      // Theme should be dark
      const dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });
  });

  test.describe('System Preference', () => {
    test('should respect system dark mode preference when theme is system', async ({ page, context }) => {
      // Emulate dark mode preference
      await context.emulateMedia({ colorScheme: 'dark' });

      await page.goto('/');

      // Set to system mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'system');
      });
      await page.reload();

      // Should show dark theme
      const dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });

    test('should respect system light mode preference when theme is system', async ({ page, context }) => {
      // Emulate light mode preference
      await context.emulateMedia({ colorScheme: 'light' });

      await page.goto('/');

      // Set to system mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'system');
      });
      await page.reload();

      // Should show light theme
      const dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('light');
    });

    test('should update theme when system preference changes in system mode', async ({ page, context }) => {
      // Start with light mode
      await context.emulateMedia({ colorScheme: 'light' });

      await page.goto('/');

      // Set to system mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'system');
      });
      await page.reload();

      // Should be light
      let dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('light');

      // Change system preference to dark
      await context.emulateMedia({ colorScheme: 'dark' });

      // Give it a moment to update
      await page.waitForTimeout(100);

      // Should now be dark
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });

    test('should not change theme when system preference changes in manual mode', async ({ page, context }) => {
      // Start with light mode
      await context.emulateMedia({ colorScheme: 'light' });

      await page.goto('/');

      // Set to manual dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.reload();

      // Should be dark
      let dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');

      // Change system preference to light
      await context.emulateMedia({ colorScheme: 'light' });

      // Give it a moment
      await page.waitForTimeout(100);

      // Should still be dark (not following system)
      dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });
  });

  test.describe('No Flash of Wrong Theme (FOUC Prevention)', () => {
    test('should not flash wrong theme on initial page load with stored preference', async ({ page }) => {
      // Set dark theme in localStorage
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });

      // Monitor for theme attribute changes
      const themeChanges: string[] = [];

      await page.exposeFunction('recordThemeChange', (theme: string) => {
        themeChanges.push(theme);
      });

      // Navigate to a fresh page and record theme attribute
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Get the theme immediately on load
      const initialTheme = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme');
      });

      // Should be dark immediately, no light flash
      expect(initialTheme).toBe('dark');
    });

    test('should set theme before page render with inline script', async ({ page }) => {
      // Set up theme in localStorage
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });

      // Reload and check that theme is set before React hydration
      await page.goto('/', { waitUntil: 'commit' });

      // Even before DOM content loaded, theme should be set
      const themeBeforeHydration = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme');
      });

      expect(themeBeforeHydration).toBe('dark');
    });

    test('should handle missing localStorage gracefully', async ({ page }) => {
      // Disable localStorage
      await page.goto('/');
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: () => { throw new Error('localStorage disabled'); },
            setItem: () => { throw new Error('localStorage disabled'); },
            removeItem: () => { throw new Error('localStorage disabled'); },
            clear: () => { throw new Error('localStorage disabled'); },
          },
        });
      });

      // Page should still load without errors
      await page.goto('/');

      // Should default to light or system theme
      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toMatch(/^(light|dark)$/);
    });
  });

  test.describe('Visual Changes', () => {
    test('should apply different background colors for light and dark modes', async ({ page }) => {
      await page.goto('/');

      // Set to light mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
      });
      await page.reload();

      // Get background color in light mode
      const lightBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });

      // Set to dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.reload();

      // Get background color in dark mode
      const darkBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });

      // Background colors should be different
      expect(lightBg).not.toBe(darkBg);
    });

    test('should display appropriate icon for each theme mode', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Set to light mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
      });
      await page.reload();

      // Should show sun icon (light mode has sun icon)
      await expect(themeToggle.locator('svg')).toBeVisible();

      // Click to dark mode
      await themeToggle.click();

      // Should show moon icon
      await expect(themeToggle.locator('svg')).toBeVisible();

      // Click to system mode
      await themeToggle.click();

      // Should show monitor icon
      await expect(themeToggle.locator('svg')).toBeVisible();
    });

    test('should maintain theme across different pages', async ({ page }) => {
      await page.goto('/');

      // Set to dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.reload();

      // Check all pages maintain dark theme
      const pages = ['/', '/blog', '/contact'];

      for (const path of pages) {
        await page.goto(path);
        const theme = await page.locator('html').getAttribute('data-theme');
        expect(theme).toBe('dark');
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have screen reader text for current state', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Should have sr-only text
      const srText = await themeToggle.locator('.sr-only').textContent();
      expect(srText).toMatch(/current theme:/i);
      expect(srText).toMatch(/click to switch to/i);
    });

    test('should be reachable via keyboard navigation', async ({ page }) => {
      await page.goto('/');

      // Tab through navigation elements to reach theme toggle
      let focused = false;
      let tabCount = 0;
      const maxTabs = 20; // Safety limit

      while (!focused && tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        tabCount++;

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            role: el?.getAttribute('role'),
            ariaLabel: el?.getAttribute('aria-label'),
          };
        });

        if (focusedElement.ariaLabel?.match(/current theme:/i)) {
          focused = true;
        }
      }

      expect(focused).toBe(true);
    });

    test('should have visible focus indicator', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Focus the button
      await themeToggle.focus();

      // Check for focus styles (outline or box-shadow)
      const focusStyles = await themeToggle.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      // Should have some visible focus indicator
      const hasFocusIndicator =
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle invalid theme value in localStorage', async ({ page }) => {
      await page.goto('/');

      // Set invalid theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'invalid-theme');
      });

      // Reload page
      await page.reload();

      // Should default to light or system theme
      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toMatch(/^(light|dark)$/);
    });

    test('should handle rapid theme switching', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Rapidly click the toggle multiple times
      for (let i = 0; i < 5; i++) {
        await themeToggle.click();
      }

      // Should still have a valid theme
      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toMatch(/^(light|dark)$/);
    });

    test('should work in mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      const themeToggle = page.getByRole('button', { name: /current theme:/i });

      // Toggle should be visible and clickable in mobile view
      await expect(themeToggle).toBeVisible();

      // Should be able to toggle
      await themeToggle.click();

      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toMatch(/^(light|dark)$/);
    });
  });
});
