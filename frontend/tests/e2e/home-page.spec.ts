import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Ladang Lima/i);
  });

  test("navbar is visible", async ({ page }) => {
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });

  test("hero section is visible", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("page has meaningful content — not blank", async ({ page }) => {
    const bodyText = await page.locator("body").textContent();
    expect(bodyText!.trim().length).toBeGreaterThan(100);
  });

  test("logo image is present", async ({ page }) => {
    const logo = page.locator("nav img").first();
    await expect(logo).toBeVisible();
  });

  test("navbar links navigate to about page", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const aboutLink = page.locator("nav a", { hasText: "ABOUT US" }).first();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });
});
