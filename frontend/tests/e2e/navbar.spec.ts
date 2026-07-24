import { test, expect } from "@playwright/test";

test.describe("Navbar Navigation", () => {
  test("navbar is visible on about page", async ({ page }) => {
    await page.goto("/about");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });

  test("logo is visible and links to home", async ({ page }) => {
    await page.goto("/about");
    const logo = page.locator("nav img").first();
    await expect(logo).toBeVisible();
  });

  test("navbar links are visible on desktop", async ({ page }) => {
    await page.goto("/about");
    await page.setViewportSize({ width: 1280, height: 720 });

    const aboutLink = page.locator("nav a", { hasText: "ABOUT US" }).first();
    await expect(aboutLink).toBeVisible();
  });

  test("clicking HOME navigates to homepage", async ({ page }) => {
    await page.goto("/about");
    await page.setViewportSize({ width: 1280, height: 720 });

    const homeLink = page.locator("nav a", { hasText: "HOME" }).first();
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });

  test("clicking OUR PRODUCT navigates to products page", async ({ page }) => {
    await page.goto("/about");
    await page.setViewportSize({ width: 1280, height: 720 });

    const productLink = page.locator("nav a", { hasText: "OUR PRODUCT" }).first();
    await productLink.click();
    await expect(page).toHaveURL(/\/products/);
  });

  test("CAREER link is present", async ({ page }) => {
    await page.goto("/about");
    await page.setViewportSize({ width: 1280, height: 720 });

    const careerLink = page.locator("nav a", { hasText: "CAREER" }).first();
    await expect(careerLink).toBeVisible();
  });
});
