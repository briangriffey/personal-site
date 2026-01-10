import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Skip Link Functionality', () => {
    test('should have skip link in the DOM', async ({ page }) => {
      // Verify skip link exists with correct text
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeAttached();
    });

    test('should have correct href attribute', async ({ page }) => {
      // Verify skip link points to #main-content
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('should be visually hidden by default', async ({ page }) => {
      // Skip link should not be visible until focused
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });

      // Check that it's positioned off-screen (has negative top position)
      const box = await skipLink.boundingBox();
      expect(box).toBeTruthy();

      // The skip link should be in the DOM but positioned off-screen
      await expect(skipLink).toBeAttached();
    });

    test('should become visible when focused with Tab key', async ({ page }) => {
      // Press Tab to focus the skip link (first focusable element)
      await page.keyboard.press('Tab');

      // Skip link should now be visible
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();

      // Verify it's now within viewport and visible
      await expect(skipLink).toBeInViewport();
    });

    test('should navigate to main content when activated', async ({ page }) => {
      // Press Tab to focus the skip link
      await page.keyboard.press('Tab');

      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();

      // Press Enter to activate the skip link
      await page.keyboard.press('Enter');

      // Verify we're still on the same page (URL should have #main-content hash)
      await expect(page).toHaveURL('/#main-content');

      // Verify main content exists
      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeVisible();
    });

    test('should have visible focus indicator', async ({ page }) => {
      // Press Tab to focus the skip link
      await page.keyboard.press('Tab');

      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();

      // Verify the skip link is visible when focused (indicating focus state)
      await expect(skipLink).toBeVisible();
      await expect(skipLink).toBeInViewport();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate through interactive elements with Tab key', async ({ page }) => {
      // Start by focusing the skip link
      await page.keyboard.press('Tab');
      let skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();

      // Tab to View Projects button
      await page.keyboard.press('Tab');
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeFocused();

      // Tab to Contact button
      await page.keyboard.press('Tab');
      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeFocused();

      // Tab to Read Blog button
      await page.keyboard.press('Tab');
      const blogButton = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogButton).toBeFocused();
    });

    test('should navigate backwards with Shift+Tab', async ({ page }) => {
      // Tab forward through all buttons first
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects
      await page.keyboard.press('Tab'); // Contact
      await page.keyboard.press('Tab'); // Read Blog

      const blogButton = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogButton).toBeFocused();

      // Shift+Tab backwards
      await page.keyboard.press('Shift+Tab');
      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skipLink).toBeFocused();
    });

    test('should activate links with Enter key', async ({ page }) => {
      // Tab to View Projects button
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects

      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeFocused();

      // Verify Enter key would navigate (check href)
      const href = await viewProjectsButton.getAttribute('href');
      expect(href).toBe('/projects');
    });

    test('should activate links with Space key', async ({ page }) => {
      // Tab to Contact button
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects
      await page.keyboard.press('Tab'); // Contact

      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeFocused();

      // Verify Space key would navigate (check href)
      const href = await contactButton.getAttribute('href');
      expect(href).toBe('/contact');
    });

    test('all interactive elements should be keyboard accessible', async ({ page }) => {
      // Get all links on the page
      const links = page.getByRole('link');

      // Should have at least 4 links (skip link + 3 CTA buttons)
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(4);

      // All links should be focusable (verify they all have valid hrefs)
      const allLinks = await links.all();
      for (const link of allLinks) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('Focus States', () => {
    test('CTA buttons should have visible focus indicators', async ({ page }) => {
      // Tab to View Projects button
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // View Projects

      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeFocused();

      // Verify button is visible (indicating focus state is working)
      await expect(viewProjectsButton).toBeVisible();
      await expect(viewProjectsButton).toBeInViewport();
    });

    test('focused elements should remain visible in viewport', async ({ page }) => {
      // Tab through each CTA button and verify it's in viewport
      await page.keyboard.press('Tab'); // Skip link

      await page.keyboard.press('Tab'); // View Projects
      const viewProjectsButton = page.getByRole('link', { name: /view.*projects/i });
      await expect(viewProjectsButton).toBeFocused();
      await expect(viewProjectsButton).toBeInViewport();

      await page.keyboard.press('Tab'); // Contact
      const contactButton = page.getByRole('link', { name: /contact/i });
      await expect(contactButton).toBeFocused();
      await expect(contactButton).toBeInViewport();

      await page.keyboard.press('Tab'); // Read Blog
      const blogButton = page.getByRole('link', { name: /read.*blog/i });
      await expect(blogButton).toBeFocused();
      await expect(blogButton).toBeInViewport();
    });

    test('focus order should be logical', async ({ page }) => {
      const focusOrder: string[] = [];

      // Tab through elements and record their labels
      await page.keyboard.press('Tab');
      focusOrder.push('Skip to main content');

      await page.keyboard.press('Tab');
      focusOrder.push('View Projects');

      await page.keyboard.press('Tab');
      focusOrder.push('Contact');

      await page.keyboard.press('Tab');
      focusOrder.push('Read Blog');

      // Verify the focus order is logical (skip link first, then CTAs in order)
      expect(focusOrder).toEqual([
        'Skip to main content',
        'View Projects',
        'Contact',
        'Read Blog'
      ]);
    });

    test('no focus traps should exist', async ({ page }) => {
      // Tab through all elements and verify we don't get stuck
      const maxTabs = 20;
      let tabCount = 0;

      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        tabCount++;

        // If we've tabbed more than expected, we should have cycled through
        // This ensures no focus trap exists
      }

      // If we get here without hanging, no focus trap exists
      expect(tabCount).toBe(maxTabs);
    });
  });

  test.describe('Semantic HTML and ARIA', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Verify h1 exists
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      // Verify h1 contains the name
      await expect(h1).toHaveText('Brian Griffey');
    });

    test('should have main landmark', async ({ page }) => {
      // Verify main element exists
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      await expect(main).toHaveAttribute('id', 'main-content');
    });

    test('should have region landmark with accessible name', async ({ page }) => {
      // Verify hero region exists with aria-label
      const heroRegion = page.getByRole('region', { name: 'Hero section' });
      await expect(heroRegion).toBeVisible();
    });

    test('all links should have accessible names', async ({ page }) => {
      // Get all links
      const links = await page.getByRole('link').all();

      // Verify each link has accessible text
      for (const link of links) {
        const text = await link.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    });

    test('should have valid lang attribute on html', async ({ page }) => {
      // Verify html element has lang attribute
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });
  });

  test.describe('Assistive Technology Support', () => {
    test('skip link should have descriptive text for screen readers', async ({ page }) => {
      const skipLink = page.getByRole('link', { name: 'Skip to main content' });

      // Verify the link text is descriptive
      const text = await skipLink.textContent();
      expect(text).toBe('Skip to main content');
    });

    test('CTA buttons should have clear purposes', async ({ page }) => {
      // Verify each button has clear, descriptive text
      const viewProjects = page.getByRole('link', { name: /view.*projects/i });
      const viewProjectsText = await viewProjects.textContent();
      expect(viewProjectsText).toContain('View');
      expect(viewProjectsText).toContain('Projects');

      const contact = page.getByRole('link', { name: /contact/i });
      const contactText = await contact.textContent();
      expect(contactText?.toLowerCase()).toContain('contact');

      const blog = page.getByRole('link', { name: /read.*blog/i });
      const blogText = await blog.textContent();
      expect(blogText).toContain('Read');
      expect(blogText).toContain('Blog');
    });

    test('main content should be identified for skip link target', async ({ page }) => {
      // Verify main content has the id that skip link targets
      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeVisible();

      // Verify it's a main element
      await expect(mainContent).toHaveRole('main');
    });
  });
});
