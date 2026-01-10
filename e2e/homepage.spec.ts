import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    // Wait for the main content to be visible
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('should have the correct page title', async ({ page }) => {
    // Verify the page title from metadata
    await expect(page).toHaveTitle('Brian Griffey - Full-Stack Software Engineer');
  });

  test.describe('Hero Content', () => {
    test('should display the name', async ({ page }) => {
      // Verify the main heading with the name is visible
      const heading = page.getByRole('heading', { name: 'Brian Griffey', level: 1 });
      await expect(heading).toBeVisible();
    });

    test('should display the professional role', async ({ page }) => {
      // Verify the professional role is visible
      await expect(page.getByText('Full-Stack Software Engineer')).toBeVisible();
    });

    test('should display the tagline', async ({ page }) => {
      // Verify the tagline/value proposition is visible
      const tagline = page.getByText('Building exceptional web experiences with modern technologies');
      await expect(tagline).toBeVisible();
    });

    test('should display complete tagline text', async ({ page }) => {
      // Verify the complete tagline with both sentences
      const fullTagline = page.getByText(
        'Building exceptional web experiences with modern technologies. Passionate about creating clean, scalable solutions that make a difference.'
      );
      await expect(fullTagline).toBeVisible();
    });
  });

  test.describe('CTA Buttons', () => {
    test('should have View Projects button', async ({ page }) => {
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeVisible();
      await expect(viewProjectsButton).toHaveAttribute('href', '/projects');
    });

    test('should have Contact button', async ({ page }) => {
      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeVisible();
      await expect(contactButton).toHaveAttribute('href', '/contact');
    });

    test('should have Read Blog button', async ({ page }) => {
      const blogButton = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogButton).toBeVisible();
      await expect(blogButton).toHaveAttribute('href', '/blog');
    });

    test('View Projects button should be clickable', async ({ page }) => {
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeEnabled();

      // Verify it's interactive (can be clicked)
      const href = await viewProjectsButton.getAttribute('href');
      expect(href).toBe('/projects');
    });

    test('Contact button should be clickable', async ({ page }) => {
      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeEnabled();

      // Verify it's interactive (can be clicked)
      const href = await contactButton.getAttribute('href');
      expect(href).toBe('/contact');
    });

    test('Read Blog button should be clickable', async ({ page }) => {
      const blogButton = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogButton).toBeEnabled();

      // Verify it's interactive (can be clicked)
      const href = await blogButton.getAttribute('href');
      expect(href).toBe('/blog');
    });

    test('all CTA buttons should be present', async ({ page }) => {
      // Verify all three CTA buttons are present on the page
      const buttons = page.getByRole('link').filter({
        hasText: /view.*projects|contact|read.*blog/i
      });

      // Should have exactly 3 CTA buttons
      await expect(buttons).toHaveCount(3);
    });
  });

  test.describe('Page Structure', () => {
    test('should have main element with correct id', async ({ page }) => {
      const mainElement = page.locator('main#main-content');
      await expect(mainElement).toBeVisible();
      await expect(mainElement).toHaveAttribute('id', 'main-content');
    });

    test('should have hero section', async ({ page }) => {
      const heroSection = page.getByRole('region', { name: 'Hero section' });
      await expect(heroSection).toBeVisible();
    });
  });

  test.describe('Visual Verification', () => {
    test('hero section should be within viewport', async ({ page }) => {
      const heroSection = page.getByRole('region', { name: 'Hero section' });

      // Verify the hero section is in the viewport
      await expect(heroSection).toBeInViewport();
    });

    test('all CTA buttons should be within viewport', async ({ page }) => {
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      const contactButton = page.getByRole('link', { name: /contact/i });
      const blogButton = page.getByRole('link', { name: /read.*blog/i });

      // All buttons should be visible in the viewport
      await expect(viewProjectsButton).toBeInViewport();
      await expect(contactButton).toBeInViewport();
      await expect(blogButton).toBeInViewport();
    });
  });
});
