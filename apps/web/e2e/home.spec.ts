import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display hero section and call to action', async ({ page }) => {
        await page.goto('/');

        // Check headlines
        await expect(page.getByText('Master English Through Daily Habits')).toBeVisible();
        await expect(page.getByText('Structure breeds fluency')).toBeVisible();

        // Check CTA buttons
        const getStartedBtn = page.getByRole('link', { name: /Start Learning Free/i });
        await expect(getStartedBtn).toBeVisible();
        await expect(getStartedBtn).toHaveAttribute('href', '/auth/sign-up');

        const signInBtn = page.getByRole('link', { name: /Sign In/i });
        await expect(signInBtn).toBeVisible();
        await expect(signInBtn).toHaveAttribute('href', '/auth/sign-in');
    });

    test('should display daily routine features', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText('Your Daily English Routine')).toBeVisible();
        await expect(page.getByText('Speaking Session')).toBeVisible();
        await expect(page.getByText('Day Recap Journal')).toBeVisible();
    });

    test('should navigate to sign up page', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /Start Learning Free/i }).click();
        await expect(page).toHaveURL(/\/auth\/sign-up/);
    });
});
