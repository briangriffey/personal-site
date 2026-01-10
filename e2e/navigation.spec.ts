import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Internal Navigation Links', () => {
    test('View Projects link should have correct href', async ({ page }) => {
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsLink).toBeVisible();
      await expect(viewProjectsLink).toHaveAttribute('href', '/projects');
    });

    test('Contact link should have correct href', async ({ page }) => {
      const contactLink = page.getByRole('link', { name: /contact/i });
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveAttribute('href', '/contact');
    });

    test('Blog link should have correct href', async ({ page }) => {
      const blogLink = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogLink).toBeVisible();
      await expect(blogLink).toHaveAttribute('href', '/blog');
    });

    test('Skip link should have correct href', async ({ page }) => {
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeAttached();
      await expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('all internal links should not open in new tab', async ({ page }) => {
      // Get all internal navigation links (excluding skip link as it's a hash link)
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      const contactLink = page.getByRole('link', { name: /contact/i });
      const blogLink = page.getByRole('link', { name: /read.*blog/i });

      // Internal links should not have target="_blank"
      await expect(viewProjectsLink).not.toHaveAttribute('target', '_blank');
      await expect(contactLink).not.toHaveAttribute('target', '_blank');
      await expect(blogLink).not.toHaveAttribute('target', '_blank');
    });

    test('all internal links should be accessible via keyboard', async ({ page }) => {
      // Tab to View Projects
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects

      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsLink).toBeFocused();

      // Tab to Contact
      await page.keyboard.press('Tab');
      const contactLink = page.getByRole('link', { name: /contact/i });
      await expect(contactLink).toBeFocused();

      // Tab to Blog
      await page.keyboard.press('Tab');
      const blogLink = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogLink).toBeFocused();
    });
  });

  test.describe('Navigation Link Attributes', () => {
    test('all navigation links should have valid hrefs', async ({ page }) => {
      // Get all links on the page
      const allLinks = await page.getByRole('link').all();

      // Verify each link has a valid href attribute
      for (const link of allLinks) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href?.length).toBeGreaterThan(0);
      }
    });

    test('all navigation links should have accessible names', async ({ page }) => {
      // Get all links on the page
      const allLinks = await page.getByRole('link').all();

      // Verify each link has accessible text content
      for (const link of allLinks) {
        const text = await link.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    });

    test('navigation links should be visible and clickable', async ({ page }) => {
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      const contactLink = page.getByRole('link', { name: /contact/i });
      const blogLink = page.getByRole('link', { name: /read.*blog/i });

      // All links should be visible
      await expect(viewProjectsLink).toBeVisible();
      await expect(contactLink).toBeVisible();
      await expect(blogLink).toBeVisible();

      // All links should be enabled (clickable)
      await expect(viewProjectsLink).toBeEnabled();
      await expect(contactLink).toBeEnabled();
      await expect(blogLink).toBeEnabled();
    });
  });

  test.describe('External Link Attributes', () => {
    test('external links should have target="_blank" attribute', async ({ page }) => {
      // Check if there are any external links (links not starting with / or #)
      const allLinks = await page.getByRole('link').all();

      for (const link of allLinks) {
        const href = await link.getAttribute('href');

        // If it's an external link (doesn't start with / or #)
        if (href && !href.startsWith('/') && !href.startsWith('#')) {
          // External link should have target="_blank"
          await expect(link).toHaveAttribute('target', '_blank');
        }
      }
    });

    test('external links should have rel="noopener noreferrer" for security', async ({ page }) => {
      // Check if there are any external links
      const allLinks = await page.getByRole('link').all();

      for (const link of allLinks) {
        const href = await link.getAttribute('href');

        // If it's an external link (doesn't start with / or #)
        if (href && !href.startsWith('/') && !href.startsWith('#')) {
          // External link should have rel="noopener noreferrer" for security
          const rel = await link.getAttribute('rel');
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        }
      }
    });
  });

  test.describe('Navigation Flow', () => {
    test('should maintain proper navigation context', async ({ page }) => {
      // Verify we're on the homepage
      await expect(page).toHaveURL('/');

      // Verify all main navigation links are present
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      const contactLink = page.getByRole('link', { name: /contact/i });
      const blogLink = page.getByRole('link', { name: /read.*blog/i });

      await expect(viewProjectsLink).toBeVisible();
      await expect(contactLink).toBeVisible();
      await expect(blogLink).toBeVisible();
    });

    test('hash navigation should work correctly', async ({ page }) => {
      // Click the skip link
      await page.keyboard.press('Tab'); // Focus skip link
      await page.keyboard.press('Enter'); // Activate skip link

      // Verify URL has hash
      await expect(page).toHaveURL('/#main-content');

      // Verify main content is visible
      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeVisible();
    });

    test('navigation links should maintain focus state during interaction', async ({ page }) => {
      // Tab to View Projects link
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects

      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsLink).toBeFocused();

      // Focus should remain stable
      await page.waitForTimeout(100);
      await expect(viewProjectsLink).toBeFocused();
    });
  });

  test.describe('Link Consistency', () => {
    test('all CTA links should have consistent structure', async ({ page }) => {
      // Verify all 3 CTA links exist and have proper structure
      const ctaLinks = [
        { name: /view.*projects/i, href: '/projects' },
        { name: /contact/i, href: '/contact' },
        { name: /read.*blog/i, href: '/blog' }
      ];

      for (const cta of ctaLinks) {
        const link = page.getByRole('link', { name: cta.name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', cta.href);
        await expect(link).toBeEnabled();
      }
    });

    test('navigation links should be within viewport', async ({ page }) => {
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      const contactLink = page.getByRole('link', { name: /contact/i });
      const blogLink = page.getByRole('link', { name: /read.*blog/i });

      // All navigation links should be visible in viewport
      await expect(viewProjectsLink).toBeInViewport();
      await expect(contactLink).toBeInViewport();
      await expect(blogLink).toBeInViewport();
    });

    test('navigation links should have proper aria-labels', async ({ page }) => {
      // Verify links have accessible labels
      const viewProjectsLink = page.getByRole('link', { name: /view.*projects/i });
      const contactLink = page.getByRole('link', { name: /contact/i });
      const blogLink = page.getByRole('link', { name: /read.*blog/i });

      // Check that links either have aria-label or meaningful text content
      const viewProjectsAriaLabel = await viewProjectsLink.getAttribute('aria-label');
      const viewProjectsText = await viewProjectsLink.textContent();
      expect(viewProjectsAriaLabel || viewProjectsText?.trim()).toBeTruthy();

      const contactAriaLabel = await contactLink.getAttribute('aria-label');
      const contactText = await contactLink.textContent();
      expect(contactAriaLabel || contactText?.trim()).toBeTruthy();

      const blogAriaLabel = await blogLink.getAttribute('aria-label');
      const blogText = await blogLink.textContent();
      expect(blogAriaLabel || blogText?.trim()).toBeTruthy();
    });
  });
});
