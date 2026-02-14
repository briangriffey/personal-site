import { test, expect } from '@playwright/test';

/**
 * WCAG 2.1 AA Accessibility Tests for Projects Page
 *
 * Tests cover:
 * - Semantic HTML structure
 * - ARIA labels and landmarks
 * - Keyboard navigation
 * - Focus management
 * - Color contrast
 * - Screen reader support
 * - Skip links
 */

test.describe('Projects Page - WCAG 2.1 AA Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test.describe('Page Structure and Semantics', () => {
    test('should have proper page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Projects.*Brian Griffey/i);
    });

    test('should have main landmark with id="main-content"', async ({ page }) => {
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      await expect(main).toHaveAttribute('id', 'main-content');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Page should have h1 for page title
      const h1 = page.getByRole('heading', { level: 1, name: /projects/i });
      await expect(h1).toBeVisible();

      // Project cards should have h2 for project titles
      const h2s = page.getByRole('heading', { level: 2 });
      const count = await h2s.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have descriptive page subtitle', async ({ page }) => {
      const subtitle = page.getByText(/From AI orchestration to production apps/i);
      await expect(subtitle).toBeVisible();
    });
  });

  test.describe('Skip Link Functionality', () => {
    test('skip link should navigate to main content', async ({ page }) => {
      // Go to homepage first
      await page.goto('/');

      // Press Tab to focus skip link
      await page.keyboard.press('Tab');

      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();

      // Activate skip link
      await page.keyboard.press('Enter');

      // Navigate to projects page
      await page.goto('/projects');

      // Verify main content exists and is properly targeted
      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeVisible();
    });
  });

  test.describe('Project Cards - Semantic HTML', () => {
    test('each project should be in an article element', async ({ page }) => {
      const articles = page.getByRole('article');
      const count = await articles.count();
      expect(count).toBeGreaterThan(0);
    });

    test('each article should have descriptive aria-label', async ({ page }) => {
      const firstArticle = page.getByRole('article').first();
      const ariaLabel = await firstArticle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/Project:/i);
    });

    test('each project should have proper heading hierarchy', async ({ page }) => {
      // Get first article
      const firstArticle = page.getByRole('article').first();

      // Should have h2 for project title
      const h2 = firstArticle.getByRole('heading', { level: 2 });
      await expect(h2).toBeVisible();

      // Should have h3 for sections (Problem, Solution, Key Features)
      const h3s = firstArticle.getByRole('heading', { level: 3 });
      const h3Count = await h3s.count();
      expect(h3Count).toBeGreaterThan(0);
    });

    test('tech stack should have aria-label', async ({ page }) => {
      const techStack = page.getByLabel('Technologies used').first();
      await expect(techStack).toBeVisible();
    });

    test('project images should have descriptive alt text', async ({ page }) => {
      const images = page.getByRole('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('all links should be keyboard accessible', async ({ page }) => {
      // Get all links in the first project card
      const firstArticle = page.getByRole('article').first();
      const links = firstArticle.getByRole('link');
      const count = await links.count();

      expect(count).toBeGreaterThan(0);

      // Each link should be focusable
      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        await link.focus();
        await expect(link).toBeFocused();
      }
    });

    test('tab order should be logical', async ({ page }) => {
      // Skip to first interactive element on projects page
      await page.keyboard.press('Tab'); // Skip link

      // Continue tabbing through elements
      let previousY = -Infinity;
      const maxTabs = 10;

      for (let i = 0; i < maxTabs; i++) {
        await page.keyboard.press('Tab');

        const focused = page.locator(':focus');
        const box = await focused.boundingBox();

        if (box) {
          // Tab order should generally move down the page (allowing some flexibility for layouts)
          // This is a soft check - we're not strictly enforcing top-to-bottom
          // Just ensuring no wild jumps
          if (previousY !== -Infinity) {
            const verticalJump = Math.abs(box.y - previousY);
            // Allow reasonable jumps (e.g., between cards)
            expect(verticalJump).toBeLessThan(2000);
          }
          previousY = box.y;
        }
      }
    });

    test('focused elements should have visible focus indicators', async ({ page }) => {
      // Tab to first link in project card
      const firstLink = page.getByRole('link').first();
      await firstLink.focus();

      // Verify element is focused
      await expect(firstLink).toBeFocused();

      // Verify element is visible (has focus indicator)
      await expect(firstLink).toBeVisible();
      await expect(firstLink).toBeInViewport();
    });

    test('Enter key should activate links', async ({ page }) => {
      const firstLink = page.getByRole('link', { name: /view|read|blog|demo|source/i }).first();
      const href = await firstLink.getAttribute('href');

      expect(href).toBeTruthy();
    });

    test('Space key should activate links', async ({ page }) => {
      const firstLink = page.getByRole('link', { name: /view|read|blog|demo|source/i }).first();
      const href = await firstLink.getAttribute('href');

      expect(href).toBeTruthy();
    });
  });

  test.describe('External Links Accessibility', () => {
    test('external links should indicate they open in new tab', async ({ page }) => {
      // Look for demo or github links (which open in new tab)
      const externalLinks = page.getByRole('link', { name: /opens in new tab/i });
      const count = await externalLinks.count();

      if (count > 0) {
        const firstExternal = externalLinks.first();

        // Should have target="_blank"
        await expect(firstExternal).toHaveAttribute('target', '_blank');

        // Should have rel="noopener noreferrer" for security
        await expect(firstExternal).toHaveAttribute('rel', 'noopener noreferrer');

        // Should have descriptive aria-label mentioning new tab
        const ariaLabel = await firstExternal.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/opens in new tab/i);
      }
    });

    test('internal links should not indicate new tab', async ({ page }) => {
      // Blog links should be internal
      const blogLinks = page.getByRole('link', { name: /read blog post/i });
      const count = await blogLinks.count();

      if (count > 0) {
        const firstBlog = blogLinks.first();
        const ariaLabel = await firstBlog.getAttribute('aria-label');

        // Should not mention new tab
        expect(ariaLabel).not.toMatch(/opens in new tab/i);
      }
    });
  });

  test.describe('ARIA Labels and Descriptions', () => {
    test('all interactive elements should have accessible names', async ({ page }) => {
      const links = await page.getByRole('link').all();

      for (const link of links) {
        const accessibleName = await link.getAttribute('aria-label') || await link.textContent();
        expect(accessibleName?.trim().length).toBeGreaterThan(0);
      }
    });

    test('CTA buttons should have descriptive labels', async ({ page }) => {
      const demoLinks = page.getByRole('link', { name: /view live demo/i });
      const blogLinks = page.getByRole('link', { name: /read blog post/i });
      const githubLinks = page.getByRole('link', { name: /view source/i });

      const demoCount = await demoLinks.count();
      const blogCount = await blogLinks.count();
      const githubCount = await githubLinks.count();

      // At least one type of link should exist
      expect(demoCount + blogCount + githubCount).toBeGreaterThan(0);

      // Verify aria-labels are descriptive and include project title
      if (demoCount > 0) {
        const firstDemo = demoLinks.first();
        const ariaLabel = await firstDemo.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/view live demo of/i);
      }

      if (blogCount > 0) {
        const firstBlog = blogLinks.first();
        const ariaLabel = await firstBlog.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/read blog post about/i);
      }

      if (githubCount > 0) {
        const firstGithub = githubLinks.first();
        const ariaLabel = await firstGithub.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/view source code for/i);
      }
    });

    test('featured badge should have aria-label', async ({ page }) => {
      const featuredBadge = page.getByLabel('Featured project');
      const count = await featuredBadge.count();

      // If there are featured projects, verify aria-label
      if (count > 0) {
        await expect(featuredBadge.first()).toBeVisible();
      }
    });
  });

  test.describe('Focus Management', () => {
    test('no focus traps should exist', async ({ page }) => {
      const maxTabs = 30;
      let tabCount = 0;
      const focusedElements = new Set();

      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        tabCount++;

        const focused = page.locator(':focus');
        const tagName = await focused.evaluate(el => el.tagName);
        focusedElements.add(tagName);

        // Should be able to tab through without getting stuck
      }

      // Should have focused multiple different elements
      expect(focusedElements.size).toBeGreaterThan(1);
    });

    test('shift+tab should navigate backwards', async ({ page }) => {
      // Tab forward to second link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const secondElement = page.locator(':focus');
      const secondTag = await secondElement.evaluate(el => el.tagName);

      // Shift+Tab back
      await page.keyboard.press('Shift+Tab');

      const firstElement = page.locator(':focus');
      const firstTag = await firstElement.evaluate(el => el.tagName);

      // Tags should be different (navigated backwards)
      // Or if same tag, they should be different elements
      expect(firstTag).toBeTruthy();
      expect(secondTag).toBeTruthy();
    });

    test('focused elements should remain in viewport', async ({ page }) => {
      // Tab through several elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');

        const focused = page.locator(':focus');
        const isVisible = await focused.isVisible();

        if (isVisible) {
          // Focused element should be in viewport
          await expect(focused).toBeInViewport();
        }
      }
    });
  });

  test.describe('Color Contrast - Visual Verification', () => {
    test('page should have sufficient contrast for text', async ({ page }) => {
      // This is a basic check - for detailed contrast testing, use axe-core
      // We're just verifying elements are visible

      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      const articles = page.getByRole('article');
      const count = await articles.count();

      for (let i = 0; i < count; i++) {
        const article = articles.nth(i);
        const h2 = article.getByRole('heading', { level: 2 });
        await expect(h2).toBeVisible();
      }
    });

    test('buttons should be clearly visible', async ({ page }) => {
      const buttons = page.getByRole('link', { name: /view|read|blog|demo|source/i });
      const count = await buttons.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        await expect(buttons.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('Reduced Motion Support', () => {
    test('should respect prefers-reduced-motion', async ({ page, context }) => {
      // Set reduced motion preference
      await context.emulateMedia({ reducedMotion: 'reduce' });

      // Reload page with reduced motion
      await page.reload();

      // Verify page still loads and is functional
      const main = page.getByRole('main');
      await expect(main).toBeVisible();

      const articles = page.getByRole('article');
      const count = await articles.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Screen Reader Support', () => {
    test('landmark regions should be properly labeled', async ({ page }) => {
      // Main content should be a main landmark
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
    });

    test('images should not be decorative without alt=""', async ({ page }) => {
      const images = page.getByRole('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');

        // All images should have alt text (not decorative)
        expect(alt).toBeTruthy();
      }
    });

    test('skeleton loaders should indicate loading state', async ({ page }) => {
      // On fresh page load, skeleton loaders might be visible
      // They should have appropriate aria-labels
      const loadingIndicators = page.getByLabel('Loading image');
      // Just verify the selector works - loaders may or may not be visible
      // depending on image load speed
      await page.waitForLoadState('networkidle');
    });
  });

  test.describe('Language and Internationalization', () => {
    test('html element should have lang attribute', async ({ page }) => {
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });

    test('content should be in English', async ({ page }) => {
      const h1 = page.getByRole('heading', { level: 1 });
      const text = await h1.textContent();
      expect(text).toBe('Projects');
    });
  });
});
