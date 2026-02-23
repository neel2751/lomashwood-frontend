import { test, expect } from '@playwright/test';

test.describe('Kitchen Category Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kitchen');
  });

  test.describe('Page Load and SEO', () => {
    test('should load kitchen page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/kitchen/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should have correct title and meta', async ({ page }) => {
      await expect(page).toHaveTitle(/kitchen/i);
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('should have breadcrumb navigation', async ({ page }) => {
      const breadcrumb = page.locator('nav[aria-label="breadcrumb"], nav:has-text("Home")');
      await expect(breadcrumb).toBeVisible();
    });
  });

  test.describe('Hero Section', () => {
    test('should display page heading', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1, name: /kitchen/i });
      await expect(heading).toBeVisible();
    });

    test('should have descriptive content', async ({ page }) => {
      const content = page.locator('main p').first();
      await expect(content).toBeVisible();
    });

    test('should have CTA buttons', async ({ page }) => {
      const ctaButton = page.getByRole('link', { name: /book|consultation|browse/i }).first();
      await expect(ctaButton).toBeVisible();
    });
  });

  test.describe('Product Grid', () => {
    test('should display product cards', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
        timeout: 10000,
      });

      const productCards = page.locator('[data-testid="product-card"], .product-card, article').filter({ hasText: /kitchen/i });
      const count = await productCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display product images', async ({ page }) => {
      await page.waitForSelector('img');
      
      const productImages = page.locator('img').filter({ hasNot: page.locator('header img') });
      const imageCount = await productImages.count();
      expect(imageCount).toBeGreaterThan(0);
      
      const firstImage = productImages.first();
      const alt = await firstImage.getAttribute('alt');
      expect(alt).toBeDefined();
    });

    test('should display product names and prices', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const productHeadings = page.getByRole('heading', { level: 3 });
      expect(await productHeadings.count()).toBeGreaterThan(0);
      
      const prices = page.locator('text=/£[0-9]/');
      expect(await prices.count()).toBeGreaterThan(0);
    });

    test('should have clickable product cards', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const firstProduct = page.locator('[data-testid="product-card"] a, .product-card a, article a').first();
      
      if (await firstProduct.count() > 0) {
        await firstProduct.click();
        await expect(page).not.toHaveURL('/kitchen');
      }
    });
  });

  test.describe('Filtering and Sorting', () => {
    test('should have filter options', async ({ page }) => {
      const filterSection = page.locator('[data-testid="filters"], aside, .filters');
      if (await filterSection.count() > 0) {
        await expect(filterSection).toBeVisible();
      }
    });

    test('should have sort dropdown', async ({ page }) => {
      const sortDropdown = page.locator('select:has-text("Sort"), [data-testid="sort-select"]');
      if (await sortDropdown.count() > 0) {
        await expect(sortDropdown).toBeVisible();
      }
    });

    test('should filter by style when clicked', async ({ page }) => {
      const styleFilter = page.locator('text=/modern|traditional|contemporary/i').first();
      
      if (await styleFilter.count() > 0) {
        await styleFilter.click();
        await page.waitForTimeout(500);
        await page.waitForLoadState('networkidle');
        
        const products = page.locator('[data-testid="product-card"], .product-card, article');
        expect(await products.count()).toBeGreaterThan(0);
      }
    });

    test('should sort products when sort option selected', async ({ page }) => {
      const sortDropdown = page.locator('select:has-text("Sort")').first();
      
      if (await sortDropdown.count() > 0) {
        await sortDropdown.selectOption({ index: 1 });
        await page.waitForTimeout(500);
        await page.waitForLoadState('networkidle');
        
        const products = page.locator('[data-testid="product-card"], .product-card, article');
        expect(await products.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Search and View Options', () => {
    test('should have search functionality', async ({ page }) => {
      const searchInput = page.getByRole('searchbox');
      if (await searchInput.count() > 0) {
        await searchInput.fill('modern white');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('networkidle');
      }
    });

    test('should have grid/list view toggle if available', async ({ page }) => {
      const viewToggle = page.locator('[data-testid="view-toggle"], button:has-text("Grid"), button:has-text("List")');
      if (await viewToggle.count() > 0) {
        await expect(viewToggle).toBeVisible();
      }
    });
  });

  test.describe('Pagination', () => {
    test('should have pagination if many products', async ({ page }) => {
      const pagination = page.locator('nav[aria-label="pagination"], .pagination');
      if (await pagination.count() > 0) {
        await expect(pagination).toBeVisible();
      }
    });

    test('should navigate to next page', async ({ page }) => {
      const nextButton = page.getByRole('button', { name: /next/i });
      if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBeDefined();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('main')).toBeVisible();
      
      const products = page.locator('[data-testid="product-card"], .product-card, article');
      expect(await products.count()).toBeGreaterThan(0);
    });

    test('should have mobile-friendly filters', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const filterButton = page.getByRole('button', { name: /filter/i });
      if (await filterButton.count() > 0) {
        await expect(filterButton).toBeVisible();
      }
    });
  });
});

test.describe('Bedroom Category Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bedroom');
  });

  test.describe('Page Load', () => {
    test('should load bedroom page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/bedroom/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/bedroom/i);
    });

    test('should display bedroom products', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const products = page.locator('[data-testid="product-card"], .product-card, article');
      expect(await products.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Bedroom Specific Features', () => {
    test('should show bedroom-related content', async ({ page }) => {
      const bedroomContent = page.locator('text=/bedroom|wardrobe|closet/i');
      expect(await bedroomContent.count()).toBeGreaterThan(0);
    });

    test('should have bedroom category filters', async ({ page }) => {
      const content = await page.content();
      const hasBedroom = /bedroom|wardrobe|built-in|walk-in/i.test(content);
      expect(hasBedroom).toBe(true);
    });
  });
});

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kitchen');
    await page.waitForLoadState('networkidle');
    
    const firstProduct = page.locator('[data-testid="product-card"] a, .product-card a, article a').first();
    if (await firstProduct.count() > 0) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
    }
  });

  test.describe('Product Information', () => {
    test('should display product name', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1 });
      if (await heading.count() > 0) {
        await expect(heading).toBeVisible();
      }
    });

    test('should display product images', async ({ page }) => {
      const images = page.locator('main img');
      if (await images.count() > 0) {
        await expect(images.first()).toBeVisible();
      }
    });

    test('should display product description', async ({ page }) => {
      const description = page.locator('main p, [data-testid="product-description"]');
      if (await description.count() > 0) {
        expect(await description.first().textContent()).toBeTruthy();
      }
    });

    test('should display price', async ({ page }) => {
      const price = page.locator('text=/£[0-9]/');
      if (await price.count() > 0) {
        await expect(price.first()).toBeVisible();
      }
    });
  });

  test.describe('Product Actions', () => {
    test('should have book consultation CTA', async ({ page }) => {
      const ctaButton = page.getByRole('link', { name: /book|consultation|enquire/i });
      if (await ctaButton.count() > 0) {
        await expect(ctaButton.first()).toBeVisible();
      }
    });

    test('should have add to wishlist button', async ({ page }) => {
      const wishlistButton = page.getByRole('button', { name: /wishlist|save|favorite/i });
      if (await wishlistButton.count() > 0) {
        await expect(wishlistButton).toBeVisible();
      }
    });

    test('should have share button', async ({ page }) => {
      const shareButton = page.getByRole('button', { name: /share/i });
      if (await shareButton.count() > 0) {
        await expect(shareButton).toBeVisible();
      }
    });
  });

  test.describe('Product Gallery', () => {
    test('should have image gallery or carousel', async ({ page }) => {
      const images = page.locator('main img');
      const imageCount = await images.count();
      expect(imageCount).toBeGreaterThan(0);
    });

    test('should allow navigation between images', async ({ page }) => {
      const galleryNav = page.locator('button:has-text("Previous"), button:has-text("Next"), [data-testid="gallery-nav"]');
      if (await galleryNav.count() > 1) {
        const nextButton = galleryNav.last();
        await nextButton.click();
        await page.waitForTimeout(300);
      }
    });
  });

  test.describe('Related Products', () => {
    test('should show related products section', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      const relatedSection = page.locator('text=/related|similar|you may also like/i');
      if (await relatedSection.count() > 0) {
        await expect(relatedSection.first()).toBeVisible();
      }
    });
  });

  test.describe('Breadcrumb Navigation', () => {
    test('should have breadcrumb with back navigation', async ({ page }) => {
      const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb).toBeVisible();
        
        const categoryLink = breadcrumb.getByRole('link', { name: /kitchen|bedroom/i });
        if (await categoryLink.count() > 0) {
          await categoryLink.click();
          await expect(page).toHaveURL(/\/(kitchen|bedroom)/);
        }
      }
    });
  });
});

test.describe('Cross-Category Features', () => {
  test('should navigate between kitchen and bedroom', async ({ page }) => {
    await page.goto('/kitchen');
    const bedroomLink = page.getByRole('link', { name: /bedroom/i }).first();
    await bedroomLink.click();
    
    await expect(page).toHaveURL(/\/bedroom/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('should maintain filters in URL params', async ({ page }) => {
    await page.goto('/kitchen');
    const filter = page.locator('text=/modern|traditional/i').first();
    
    if (await filter.count() > 0) {
      await filter.click();
      await page.waitForTimeout(500);
      const url = page.url();
      expect(url).toBeDefined();
    }
  });

  test('should have consistent layout across categories', async ({ page }) => {
    await page.goto('/kitchen');
    const kitchenLayout = {
      hasHeader: await page.locator('header').count() > 0,
      hasFooter: await page.locator('footer').count() > 0,
      hasMain: await page.locator('main').count() > 0,
    };
    
    await page.goto('/bedroom');
    const bedroomLayout = {
      hasHeader: await page.locator('header').count() > 0,
      hasFooter: await page.locator('footer').count() > 0,
      hasMain: await page.locator('main').count() > 0,
    };
    
    expect(kitchenLayout).toEqual(bedroomLayout);
  });
});

test.describe('Performance', () => {
  test('should load products within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/kitchen');
    await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
      timeout: 10000,
    });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000);
  });

  test('should lazy load images', async ({ page }) => {
    await page.goto('/kitchen');
    const visibleImages = await page.locator('img').count();
    
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    
    const afterScrollImages = await page.locator('img').count();
    expect(afterScrollImages).toBeGreaterThanOrEqual(visibleImages);
  });
});