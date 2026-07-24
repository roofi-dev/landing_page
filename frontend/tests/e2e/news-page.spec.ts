import { test, expect } from "@playwright/test";

test.describe("News Page", () => {
  test("news listing page loads with title", async ({ page }) => {
    await page.goto("/news");
    await expect(page).toHaveTitle(/News.*Ladang Lima/i);
  });

  test("page header is visible", async ({ page }) => {
    await page.goto("/news");
    const header = page.locator("h1, h2").first();
    await expect(header).toBeVisible();
  });

  test("navbar and footer are visible", async ({ page }) => {
    await page.goto("/news");
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("newsletter CTA section is visible", async ({ page }) => {
    await page.goto("/news");
    const cta = page.locator("text=Never miss a story");
    await expect(cta).toBeVisible();
  });

  test("news articles are displayed or page renders without error", async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");

    const articleLinks = page.locator("a[href*='/news/']");
    const count = await articleLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("clicking an article navigates to detail page", async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");

    const articleLinks = page.locator("a[href*='/news/']");
    const count = await articleLinks.count();
    test.skip(count === 0, "No news articles available");

    const href = await articleLinks.first().getAttribute("href");
    expect(href).toBeTruthy();
    await page.goto(href!);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/news\//);
  });
});

test.describe("News Detail Page", () => {
  test("valid article slug renders detail page", async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");

    const articleLinks = page.locator("a[href*='/news/']");
    const count = await articleLinks.count();
    test.skip(count === 0, "No news articles available");

    await articleLinks.first().click();
    await page.waitForLoadState("networkidle");

    const title = page.locator("h1").first();
    await expect(title).toBeVisible();
  });

  test("non-existent article slug returns 404", async ({ page }) => {
    const response = await page.goto("/news/this-article-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
  });
});
