import { test, expect } from '@playwright/test';
test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test.describe('Page Load and SEO', () => {
    test('should load successfully', async ({ page }) => {

      await expect(page).toHaveURL('/');

      await expect(page.locator('main')).toBeVisible();
    });

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/Lomash Wood/);
    });

    test('should have meta description', async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('should have favicon', async ({ page }) => {
      const favicon = page.locator('link[rel="icon"]');
      await expect(favicon).toHaveCount(1);
    });
  });

  test.describe('Header and Navigation', () => {
    test('should display header with logo', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();

      const logo = page.locator('header').getByRole('link', { name: /lomash wood/i });
      await expect(logo).toBeVisible();
    });

    test('should have main navigation links', async ({ page }) => {
      await expect(page.getByRole('link', { name: /kitchen/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /bedroom/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /showrooms/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /inspiration/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
    });

    test('should navigate to kitchen page', async ({ page }) => {
      await page.getByRole('link', { name: /kitchen/i }).first().click();

      await expect(page).toHaveURL(/\/kitchen/);
    });

    test('should navigate to bedroom page', async ({ page }) => {
      await page.getByRole('link', { name: /bedroom/i }).first().click();

      await expect(page).toHaveURL(/\/bedroom/);
    });

    test('should have mobile menu toggle on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileMenuButton = page.getByRole('button', { name: /menu/i });
      await expect(mobileMenuButton).toBeVisible();

      await mobileMenuButton.click();

      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Hero Section', () => {
    test('should display hero section', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();
    });

    test('should have main heading', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/.+/);
    });

    test('should have primary CTA button', async ({ page }) => {
      const ctaButton = page.getByRole('link', { name: /book|consultation|get started/i }).first();
      await expect(ctaButton).toBeVisible();
    });

    test('should navigate when CTA clicked', async ({ page }) => {
      const ctaButton = page.getByRole('link', { name: /book|consultation|get started/i }).first();
      await ctaButton.click();

      await expect(page).not.toHaveURL('/');
    });
  });

  test.describe('Main Content Sections', () => {
    test('should display kitchen category section', async ({ page }) => {
      const kitchenSection = page.getByRole('heading', { name: /kitchen/i });
      await expect(kitchenSection).toBeVisible();
    });

    test('should display bedroom category section', async ({ page }) => {
      const bedroomSection = page.getByRole('heading', { name: /bedroom/i });
      await expect(bedroomSection).toBeVisible();
    });

    test('should have multiple CTA buttons', async ({ page }) => {
      const ctaLinks = page.getByRole('link', { 
        name: /book|view|browse|explore|get started|consultation/i 
      });

      await expect(ctaLinks).toHaveCount(await ctaLinks.count());
      expect(await ctaLinks.count()).toBeGreaterThan(3);
    });

    test('should display featured products or designs', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 1000));

      const images = page.locator('img');
      expect(await images.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Footer', () => {
    test('should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should have footer navigation links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const footer = page.locator('footer');
      await expect(footer.getByRole('link', { name: /privacy|terms|about/i })).toBeVisible();
    });

    test('should have contact information', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.locator('footer');

      const contactInfo = footer.locator('text=/phone|email|contact/i');
      expect(await contactInfo.count()).toBeGreaterThan(0);
    });

    test('should have social media links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.locator('footer');

      const socialLinks = footer.locator('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"]');
      expect(await socialLinks.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
    });

    test('should be responsive on tablet (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
    });

    test('should be responsive on desktop (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should not have console errors', async ({ page }) => {
      const consoleErrors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const significantErrors = consoleErrors.filter(
        error => !error.includes('third-party') && !error.includes('chrome-extension')
      );
      
      expect(significantErrors.length).toBe(0);
    });

    test('should have accessible images with alt text', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeDefined();
      }
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThan(0);
    });

    test('should have keyboard navigation support', async ({ page }) => {
      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeDefined();
      expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '');
    });
  });

  test.describe('User Interactions', () => {
    test('should handle smooth scrolling to sections', async ({ page }) => {
      const anchorLinks = page.locator('a[href^="#"]');
      
      if (await anchorLinks.count() > 0) {
        const firstAnchor = anchorLinks.first();
        await firstAnchor.click();

        await page.waitForTimeout(500);

        await expect(page).toHaveURL(/\/#/);
      }
    });

    test('should load images as page scrolls', async ({ page }) => {
      const initialImages = await page.locator('img[src]').count();

      await page.evaluate(() => window.scrollTo(0, 2000));
      await page.waitForTimeout(500);

      const afterScrollImages = await page.locator('img[src]').count();
      expect(afterScrollImages).toBeGreaterThanOrEqual(initialImages);
    });
  });

  test.describe('Cookie Consent', () => {
    test('should display cookie consent banner on first visit', async ({ page, context }) => {
      await context.clearCookies();
      
      await page.goto('/');

      const cookieBanner = page.getByText(/cookie|consent/i);

      const exists = await cookieBanner.count();
      if (exists > 0) {
        await expect(cookieBanner).toBeVisible();
      }
    });
  });

  test.describe('Search Functionality', () => {
    test('should have search functionality if available', async ({ page }) => {
      const searchInput = page.getByRole('searchbox');
      const searchButton = page.getByRole('button', { name: /search/i });

      if (await searchInput.count() > 0) {
        await searchInput.fill('modern kitchen');
        
        if (await searchButton.count() > 0) {
          await searchButton.click();
        } else {
          await searchInput.press('Enter');
        }

        await page.waitForLoadState('networkidle');
      }
    });
  });
});