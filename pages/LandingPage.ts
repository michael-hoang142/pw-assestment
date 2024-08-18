import { test, expect } from '@playwright/test';
export enum CARD {
    Elements = "elements",
    Forms = "forms",
    "Alerts, Frame & Windows" = "alertsWindows",
    Widgets = "widgets",
    Interactions = "interaction",
    "Book Store Application" = "books"
} 

export async function goToLandingPage({ page }) {
    await test.step(`Go to landing page`, async () => {
        await page.goto('/');
        await expect(await page.locator('a[href="https://demoqa.com"]')).toBeVisible();
    });
}

export async function clickOnCard({ page }, cardName: string) {
    await test.step(`Click on ${cardName} card`, async () => {
        await page.locator(`//h5[text()='${cardName}']`).click();
        await expect(page).toHaveURL(CARD[cardName])
    })
}