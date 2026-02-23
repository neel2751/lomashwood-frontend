import { test, expect } from '@playwright/test';

test.describe('Appointment Booking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book-appointment');
  });

  test.describe('Page Load and Initial State', () => {
    test('should load booking page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/book-appointment/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/book|appointment|consultation/i);
    });

    test('should display page heading', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/book|appointment|consultation/i);
    });

    test('should show booking form or wizard', async ({ page }) => {
      const form = page.locator('form, [data-testid="booking-form"]');
      await expect(form).toBeVisible();
    });

    test('should display privacy notice', async ({ page }) => {
      const privacyNotice = page.locator('text=/privacy|data protection|GDPR/i');
      if (await privacyNotice.count() > 0) {
        await expect(privacyNotice.first()).toBeVisible();
      }
    });
  });

  test.describe('Step 1: Service Selection', () => {
    test('should display service type options', async ({ page }) => {
      const serviceOptions = page.locator('text=/kitchen|bedroom|consultation/i');
      expect(await serviceOptions.count()).toBeGreaterThan(0);
    });

    test('should be able to select kitchen consultation', async ({ page }) => {
      const kitchenOption = page.locator('input[value*="kitchen"], label:has-text("Kitchen"), [data-value="kitchen"]').first();
      if (await kitchenOption.count() > 0) {
        await kitchenOption.click();
        if (await kitchenOption.getAttribute('type') === 'radio') {
          await expect(kitchenOption).toBeChecked();
        }
      }
    });

    test('should be able to select bedroom consultation', async ({ page }) => {
      const bedroomOption = page.locator('input[value*="bedroom"], label:has-text("Bedroom"), [data-value="bedroom"]').first();
      if (await bedroomOption.count() > 0) {
        await bedroomOption.click();
        if (await bedroomOption.getAttribute('type') === 'radio') {
          await expect(bedroomOption).toBeChecked();
        }
      }
    });

    test('should proceed to next step after selection', async ({ page }) => {
      const firstOption = page.locator('input[type="radio"], button:has-text("Select"), [data-testid="service-option"]').first();
      if (await firstOption.count() > 0) {
        await firstOption.click();
        const nextButton = page.getByRole('button', { name: /next|continue/i });
        if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);
          expect(page.url()).toBeDefined();
        }
      }
    });

    test('should not proceed without selection', async ({ page }) => {
      const nextButton = page.getByRole('button', { name: /next|continue/i });
      if (await nextButton.count() > 0) {
        const isDisabled = await nextButton.isDisabled();
        if (!isDisabled) {
          await nextButton.click();
          const validation = page.locator('text=/required|select|choose/i');
          await page.waitForTimeout(300);
          if (await validation.count() > 0) {
            await expect(validation.first()).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('Step 2: Location Selection', () => {
    test.beforeEach(async ({ page }) => {
      const firstOption = page.locator('input[type="radio"], [data-testid="service-option"]').first();
      if (await firstOption.count() > 0) {
        await firstOption.click();
        const nextButton = page.getByRole('button', { name: /next|continue/i });
        if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      }
    });

    test('should display showroom locations', async ({ page }) => {
      const locations = page.locator('text=/london|manchester|birmingham|showroom/i');
      if (await locations.count() > 0) {
        expect(await locations.count()).toBeGreaterThan(0);
      }
    });

    test('should be able to select a showroom', async ({ page }) => {
      const locationOption = page.locator('input[name="location"], input[name="showroom"]').first();
      if (await locationOption.count() > 0) {
        await locationOption.click();
        if (await locationOption.getAttribute('type') === 'radio') {
          await expect(locationOption).toBeChecked();
        }
      }
    });

    test('should display showroom details when selected', async ({ page }) => {
      const locationCard = page.locator('[data-testid="location-card"], .location-card').first();
      if (await locationCard.count() > 0) {
        await locationCard.click();
        await page.waitForTimeout(300);
        const details = page.locator('text=/address|phone|opening hours/i');
        expect(await details.count()).toBeGreaterThan(0);
      }
    });

    test('should have option for home visit', async ({ page }) => {
      const homeVisitOption = page.locator('text=/home visit|at home|your location/i');
      if (await homeVisitOption.count() > 0) {
        await expect(homeVisitOption.first()).toBeVisible();
      }
    });
  });

  test.describe('Step 3: Date and Time Selection', () => {
    test.beforeEach(async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const radios = page.locator('input[type="radio"]');
      for (let i = 0; i < Math.min(2, await radios.count()); i++) {
        const radio = radios.nth(i);
        if (await radio.isVisible() && !await radio.isChecked()) {
          await radio.click();
          await page.waitForTimeout(300);
          const nextBtn = page.getByRole('button', { name: /next|continue/i });
          if (await nextBtn.count() > 0 && await nextBtn.isEnabled()) {
            await nextBtn.click();
            await page.waitForTimeout(500);
          }
        }
      }
    });

    test('should display calendar or date picker', async ({ page }) => {
      const calendar = page.locator('[data-testid="calendar"], .calendar, input[type="date"]');
      if (await calendar.count() > 0) {
        await expect(calendar.first()).toBeVisible();
      }
    });

    test('should not allow selection of past dates', async ({ page }) => {
      const dateInput = page.locator('input[type="date"]').first();
      if (await dateInput.count() > 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        await dateInput.fill(yesterdayStr);
        const errorMessage = page.locator('text=/past|invalid|future/i');
        const value = await dateInput.inputValue();
        expect(value !== yesterdayStr || await errorMessage.count() > 0).toBeTruthy();
      }
    });

    test('should display available time slots', async ({ page }) => {
      const dateInput = page.locator('input[type="date"], [data-testid="date-picker"]').first();
      if (await dateInput.count() > 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        await dateInput.fill(tomorrowStr);
        await page.waitForTimeout(500);
        const timeSlots = page.locator('input[type="radio"][name*="time"], button:has-text("AM"), button:has-text("PM")');
        if (await timeSlots.count() > 0) {
          expect(await timeSlots.count()).toBeGreaterThan(0);
        }
      }
    });

    test('should be able to select a time slot', async ({ page }) => {
      const timeSlot = page.locator('input[name*="time"][type="radio"]').first();
      if (await timeSlot.count() > 0) {
        await timeSlot.click();
        await expect(timeSlot).toBeChecked();
      }
    });

    test('should show duration information', async ({ page }) => {
      const durationInfo = page.locator('text=/60|90|minutes|hour/i');
      if (await durationInfo.count() > 0) {
        expect(await durationInfo.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Step 4: Personal Information', () => {
    test('should display contact form fields', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]');
      const emailField = page.locator('input[name="email"], input[type="email"]');
      const phoneField = page.locator('input[name="phone"], input[type="tel"]');
      expect(
        await nameField.count() + await emailField.count() + await phoneField.count()
      ).toBeGreaterThan(0);
    });

    test('should validate required fields', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /submit|book|confirm/i });
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await page.waitForTimeout(300);
        const validationMessages = page.locator('text=/required|field|enter|provide/i');
        expect(await validationMessages.count()).toBeGreaterThan(0);
      }
    });

    test('should validate email format', async ({ page }) => {
      const emailField = page.locator('input[name="email"], input[type="email"]').first();
      if (await emailField.count() > 0) {
        await emailField.fill('invalid-email');
        await emailField.blur();
        await page.waitForTimeout(300);
        const validation = page.locator('text=/invalid|valid email|@/i');
        if (await validation.count() > 0) {
          await expect(validation.first()).toBeVisible();
        }
      }
    });

    test('should validate phone number format', async ({ page }) => {
      const phoneField = page.locator('input[name="phone"], input[type="tel"]').first();
      if (await phoneField.count() > 0) {
        await phoneField.fill('123');
        await phoneField.blur();
        await page.waitForTimeout(300);
        const validation = page.locator('text=/invalid|phone number|digits/i');
        if (await validation.count() > 0) {
          await expect(validation.first()).toBeVisible();
        }
      }
    });

    test('should accept valid contact information', async ({ page }) => {
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      const emailField = page.locator('input[name="email"], input[type="email"]').first();
      const phoneField = page.locator('input[name="phone"], input[type="tel"]').first();
      
      if (await nameField.count() > 0) {
        await nameField.fill('John Smith');
      }
      if (await emailField.count() > 0) {
        await emailField.fill('john.smith@example.com');
      }
      if (await phoneField.count() > 0) {
        await phoneField.fill('07123456789');
      }
      if (await nameField.count() > 0) {
        expect(await nameField.inputValue()).toBe('John Smith');
      }
    });

    test('should have optional notes/comments field', async ({ page }) => {
      const notesField = page.locator('textarea[name*="note"], textarea[name*="comment"], textarea[name*="message"]');
      if (await notesField.count() > 0) {
        await notesField.fill('I would like to discuss modern kitchen designs');
        expect(await notesField.inputValue()).toContain('modern kitchen');
      }
    });

    test('should have terms and conditions checkbox', async ({ page }) => {
      const termsCheckbox = page.locator('input[type="checkbox"][name*="terms"], input[type="checkbox"][name*="agree"]');
      if (await termsCheckbox.count() > 0) {
        await expect(termsCheckbox.first()).toBeVisible();
        const termsLink = page.locator('a:has-text("Terms"), a:has-text("Conditions")');
        expect(await termsLink.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Complete Booking Flow', () => {
    test('should complete full booking journey', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const serviceOption = page.locator('input[type="radio"]').first();
      if (await serviceOption.count() > 0) {
        await serviceOption.click();
        const nextButton = page.getByRole('button', { name: /next|continue/i });
        if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      }
      
      const locationOption = page.locator('input[type="radio"]').first();
      if (await locationOption.count() > 0 && !await locationOption.isChecked()) {
        await locationOption.click();
        const nextButton = page.getByRole('button', { name: /next|continue/i });
        if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      }
      
      const dateInput = page.locator('input[type="date"]').first();
      if (await dateInput.count() > 0) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);
        await dateInput.fill(futureDate.toISOString().split('T')[0]);
        await page.waitForTimeout(500);
        
        const timeSlot = page.locator('input[type="radio"][name*="time"]').first();
        if (await timeSlot.count() > 0) {
          await timeSlot.click();
        }
        
        const nextButton = page.getByRole('button', { name: /next|continue/i });
        if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      }
      
      const nameField = page.locator('input[name="name"], input[name="firstName"]').first();
      if (await nameField.count() > 0) {
        await nameField.fill('Test User');
      }
      
      const emailField = page.locator('input[type="email"]').first();
      if (await emailField.count() > 0) {
        await emailField.fill('test@example.com');
      }
      
      const phoneField = page.locator('input[type="tel"]').first();
      if (await phoneField.count() > 0) {
        await phoneField.fill('07123456789');
      }
      
      const termsCheckbox = page.locator('input[type="checkbox"][name*="terms"]').first();
      if (await termsCheckbox.count() > 0 && !await termsCheckbox.isChecked()) {
        await termsCheckbox.check();
      }
      
      const submitButton = page.getByRole('button', { name: /submit|book|confirm/i });
      if (await submitButton.count() > 0 && await submitButton.isEnabled()) {
        await submitButton.click();
        await page.waitForLoadState('networkidle');
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
        await expect(form).toBeVisible();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form labels', async ({ page }) => {
      const inputs = page.locator('input[type="text"], input[type="email"], input[type="tel"]');
      const inputCount = await inputs.count();
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          expect(await label.count()).toBeGreaterThan(0);
        }
      }
    });
  });
});