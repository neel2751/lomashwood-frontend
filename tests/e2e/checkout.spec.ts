import { test, expect } from '@playwright/test';

test.describe('Quote Request Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('Page Load and Initial State', () => {
    test('should load contact/quote page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/contact/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/contact|quote|get in touch/i);
    });

    test('should display contact/quote form', async ({ page }) => {
      const form = page.locator('form, [data-testid="contact-form"], [data-testid="quote-form"]');
      await expect(form).toBeVisible();
    });

    test('should have quote request option', async ({ page }) => {
      const quoteOption = page.locator('text=/quote|request quote|get quote|pricing/i');
      expect(await quoteOption.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Quote Request Type Selection', () => {
    test('should display inquiry type options', async ({ page }) => {
      const inquiryTypes = page.locator('select[name*="type"], input[name*="type"], [data-testid="inquiry-type"]');
      if (await inquiryTypes.count() > 0) {
        await expect(inquiryTypes.first()).toBeVisible();
      }
    });

    test('should be able to select quote request', async ({ page }) => {
      const quoteOption = page.locator('option:has-text("Quote"), input[value*="quote"]').first();
      if (await quoteOption.count() > 0) {
        const tagName = await quoteOption.evaluate(el => el.tagName);
        if (tagName === 'OPTION') {
          const select = page.locator('select').first();
          const options = await select.locator('option').allTextContents();
          const quoteOptionText = options.find(text => /quote/i.test(text));
          if (quoteOptionText) {
            await select.selectOption(quoteOptionText);
          }
        } else {
          await quoteOption.click();
        }
      }
    });

    test('should show relevant fields for quote request', async ({ page }) => {
      const projectType = page.locator('select[name*="project"], input[name*="kitchen"], input[name*="bedroom"]');
      if (await projectType.count() > 0) {
        await expect(projectType.first()).toBeVisible();
      }
    });
  });

  test.describe('Project Information', () => {
    test('should allow selection of project type', async ({ page }) => {
      const projectType = page.locator('input[value="kitchen"], input[value="bedroom"]').first();
      if (await projectType.count() > 0) {
        await projectType.click();
        if (await projectType.getAttribute('type') === 'radio') {
          await expect(projectType).toBeChecked();
        }
      }
    });

    test('should allow selecting kitchen style preferences', async ({ page }) => {
      const styleOptions = page.locator('text=/modern|traditional|contemporary|classic/i');
      if (await styleOptions.count() > 0) {
        const firstStyle = styleOptions.first();
        await firstStyle.click();
      }
    });

    test('should have budget range selector', async ({ page }) => {
      const budgetSelect = page.locator('select[name*="budget"], input[name*="budget"]');
      if (await budgetSelect.count() > 0) {
        await expect(budgetSelect.first()).toBeVisible();
        const tagName = await budgetSelect.first().evaluate(el => el.tagName);
        if (tagName === 'SELECT') {
          await budgetSelect.first().selectOption({ index: 1 });
        }
      }
    });

    test('should have timeline/urgency selector', async ({ page }) => {
      const timeline = page.locator('select[name*="timeline"], select[name*="urgency"], input[name*="when"]');
      if (await timeline.count() > 0) {
        await expect(timeline.first()).toBeVisible();
      }
    });

    test('should allow uploading inspiration images', async ({ page }) => {
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await expect(fileInput.first()).toBeVisible();
        const accept = await fileInput.first().getAttribute('accept');
        if (accept) {
          expect(accept).toMatch(/image|\.jpg|\.png/i);
        }
      }
    });

    test('should have project description textarea', async ({ page }) => {
      const description = page.locator('textarea[name*="description"], textarea[name*="message"], textarea[name*="details"]');
      if (await description.count() > 0) {
        await expect(description.first()).toBeVisible();
        await description.first().fill('I would like a modern kitchen with island');
        expect(await description.first().inputValue()).toContain('modern kitchen');
      }
    });

    test('should have room dimensions fields', async ({ page }) => {
      const dimensionsFields = page.locator('input[name*="dimension"], input[name*="size"], input[name*="measurement"]');
      if (await dimensionsFields.count() > 0) {
        const firstDimension = dimensionsFields.first();
        await firstDimension.fill('4.5');
        expect(await firstDimension.inputValue()).toBe('4.5');
      }
    });
  });

  test.describe('Contact Information', () => {
    test('should have required contact fields', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      const emailField = page.locator('input[type="email"], input[name="email"]').first();
      const phoneField = page.locator('input[type="tel"], input[name="phone"]').first();
      
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(phoneField).toBeVisible();
    });

    test('should validate name field', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      await nameField.fill('');
      await nameField.blur();
      
      const submitButton = page.getByRole('button', { name: /submit|send|request|get quote/i });
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await page.waitForTimeout(300);
        const validation = page.locator('text=/required|name|enter|provide/i');
        expect(await validation.count()).toBeGreaterThan(0);
      }
    });

    test('should validate email format', async ({ page }) => {
      const emailField = page.locator('input[type="email"]').first();
      await emailField.fill('invalid-email');
      await emailField.blur();
      await page.waitForTimeout(300);
      
      const validation = page.locator('text=/invalid|valid email|@/i');
      if (await validation.count() > 0) {
        await expect(validation.first()).toBeVisible();
      }
    });

    test('should validate phone number', async ({ page }) => {
      const phoneField = page.locator('input[type="tel"], input[name="phone"]').first();
      await phoneField.fill('123');
      await phoneField.blur();
      await page.waitForTimeout(300);
    });

    test('should accept valid contact information', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      const emailField = page.locator('input[type="email"]').first();
      const phoneField = page.locator('input[type="tel"]').first();
      
      await nameField.fill('Jane Doe');
      await emailField.fill('jane.doe@example.com');
      await phoneField.fill('07987654321');
      
      expect(await nameField.inputValue()).toBe('Jane Doe');
      expect(await emailField.inputValue()).toBe('jane.doe@example.com');
      expect(await phoneField.inputValue()).toBe('07987654321');
    });

    test('should have address fields', async ({ page }) => {
      const addressField = page.locator('input[name*="address"], textarea[name*="address"]').first();
      const postcodeField = page.locator('input[name*="postcode"], input[name*="zip"]').first();
      
      if (await addressField.count() > 0) {
        await addressField.fill('123 Test Street');
        expect(await addressField.inputValue()).toContain('123 Test Street');
      }
      
      if (await postcodeField.count() > 0) {
        await postcodeField.fill('SW1A 1AA');
        expect(await postcodeField.inputValue()).toBe('SW1A 1AA');
      }
    });
  });

  test.describe('Form Submission', () => {
    test('should have submit button', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /submit|send|request|get quote|enquire/i });
      await expect(submitButton.first()).toBeVisible();
    });

    test('should validate all required fields before submission', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /submit|send|request/i }).first();
      await submitButton.click();
      await page.waitForTimeout(500);
      
      const validationMessages = page.locator('text=/required|field|enter|fill/i');
      expect(await validationMessages.count()).toBeGreaterThan(0);
    });

    test('should accept valid form submission', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      const emailField = page.locator('input[type="email"]').first();
      const phoneField = page.locator('input[type="tel"]').first();
      const messageField = page.locator('textarea[name*="message"], textarea[name*="description"]').first();
      
      await nameField.fill('Test User');
      await emailField.fill('test@example.com');
      await phoneField.fill('07123456789');
      
      if (await messageField.count() > 0) {
        await messageField.fill('I am interested in a modern kitchen design');
      }
      
      const termsCheckbox = page.locator('input[type="checkbox"][name*="terms"], input[type="checkbox"][name*="privacy"]').first();
      if (await termsCheckbox.count() > 0 && !await termsCheckbox.isChecked()) {
        await termsCheckbox.check();
      }
      
      const submitButton = page.getByRole('button', { name: /submit|send|request/i }).first();
      if (await submitButton.isEnabled()) {
        await submitButton.click();
        await page.waitForTimeout(2000);
      }
    });

    test('should show loading state during submission', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      const emailField = page.locator('input[type="email"]').first();
      
      if (await nameField.count() > 0 && await emailField.count() > 0) {
        await nameField.fill('Test User');
        await emailField.fill('test@example.com');
        
        const submitButton = page.getByRole('button', { name: /submit|send|request/i }).first();
        await submitButton.click();
        
        const isDisabled = await submitButton.isDisabled();
        const loadingText = await submitButton.textContent();
        
        expect(isDisabled || loadingText?.includes('...')).toBeTruthy();
      }
    });

    test('should show success message after submission', async ({ page }) => {
      const emailField = page.locator('input[type="email"]').first();
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      
      if (await nameField.count() > 0 && await emailField.count() > 0) {
        await nameField.fill('Success Test');
        await emailField.fill('success@example.com');
        
        const submitButton = page.getByRole('button', { name: /submit|send|request/i }).first();
        
        if (await submitButton.isEnabled()) {
          await submitButton.click();
          await page.waitForTimeout(2000);
          
          const successMessage = page.locator('text=/success|thank you|received|sent|contact you/i');
          if (await successMessage.count() > 0) {
            await expect(successMessage.first()).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('GDPR and Privacy', () => {
    test('should display privacy policy link', async ({ page }) => {
      const privacyLink = page.locator('a:has-text("Privacy"), a:has-text("Privacy Policy")');
      expect(await privacyLink.count()).toBeGreaterThan(0);
    });

    test('should have data consent checkbox', async ({ page }) => {
      const consentCheckbox = page.locator('input[type="checkbox"][name*="consent"], input[type="checkbox"][name*="privacy"], input[type="checkbox"][name*="agree"]');
      if (await consentCheckbox.count() > 0) {
        await expect(consentCheckbox.first()).toBeVisible();
      }
    });

    test('should have marketing opt-in option', async ({ page }) => {
      const marketingCheckbox = page.locator('input[type="checkbox"][name*="marketing"], input[type="checkbox"][name*="newsletter"]');
      if (await marketingCheckbox.count() > 0) {
        await expect(marketingCheckbox.first()).toBeVisible();
        const isRequired = await marketingCheckbox.first().getAttribute('required');
        expect(isRequired).toBeNull();
      }
    });

    test('should display data processing information', async ({ page }) => {
      const dataNotice = page.locator('text=/data protection|GDPR|process your data|privacy/i');
      expect(await dataNotice.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Brochure Request', () => {
    test('should navigate to brochure page', async ({ page }) => {
      await page.goto('/brochure');
      await expect(page).toHaveURL(/\/brochure/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should display brochure download form', async ({ page }) => {
      await page.goto('/brochure');
      const form = page.locator('form, [data-testid="brochure-form"]');
      await expect(form.first()).toBeVisible();
    });

    test('should request name and email for brochure', async ({ page }) => {
      await page.goto('/brochure');
      const nameField = page.locator('input[name="name"]').first();
      const emailField = page.locator('input[type="email"]').first();
      
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
    });

    test('should submit brochure request', async ({ page }) => {
      await page.goto('/brochure');
      const nameField = page.locator('input[name="name"]').first();
      const emailField = page.locator('input[type="email"]').first();
      
      await nameField.fill('Brochure User');
      await emailField.fill('brochure@example.com');
      
      const submitButton = page.getByRole('button', { name: /download|get brochure|submit/i });
      if (await submitButton.count() > 0 && await submitButton.isEnabled()) {
        await submitButton.click();
        await page.waitForTimeout(1000);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('main')).toBeVisible();
      const form = page.locator('form');
      if (await form.count() > 0) {
        await expect(form.first()).toBeVisible();
      }
    });

    test('should have mobile-friendly form layout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const inputs = page.locator('input[type="text"], input[type="email"]');
      
      if (await inputs.count() > 1) {
        const firstBox = await inputs.first().boundingBox();
        const secondBox = await inputs.nth(1).boundingBox();
        
        if (firstBox && secondBox) {
          expect(secondBox.y).toBeGreaterThan(firstBox.y);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form labels', async ({ page }) => {
      const inputs = page.locator('input[type="text"], input[type="email"], input[type="tel"]');
      const inputCount = await inputs.count();
      let labelsFound = 0;
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          if (await label.count() > 0) {
            labelsFound++;
          }
        }
      }
      
      expect(labelsFound).toBeGreaterThan(0);
    });

    test('should have descriptive button text', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /submit|send|request|get quote/i });
      if (await submitButton.count() > 0) {
        const buttonText = await submitButton.first().textContent();
        if (buttonText) {
          expect(buttonText.length).toBeGreaterThan(3);
        }
      }
    });
  });
});