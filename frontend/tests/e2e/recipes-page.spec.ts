import { test, expect } from "@playwright/test";

test.describe("Recipes Page", () => {
  test("recipes listing page loads with title", async ({ page }) => {
    await page.goto("/recipes");
    await expect(page).toHaveTitle(/Recipes.*Ladang Lima/i);
  });

  test("page header is visible", async ({ page }) => {
    await page.goto("/recipes");
    const header = page.locator("h1, h2").first();
    await expect(header).toBeVisible();
  });

  test("navbar and footer are visible", async ({ page }) => {
    await page.goto("/recipes");
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("recipes are displayed or empty state is shown", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");

    const recipeLinks = page.locator("a[href*='/recipes/']");
    const emptyState = page.locator("text=No recipes available");

    const recipeCount = await recipeLinks.count();
    const emptyVisible = await emptyState.isVisible().catch(() => false);

    expect(recipeCount > 0 || emptyVisible).toBeTruthy();
  });

  test("clicking a recipe navigates to detail page", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");

    const recipeLinks = page.locator("a[href*='/recipes/']");
    const count = await recipeLinks.count();
    test.skip(count === 0, "No recipes available");

    const firstLink = recipeLinks.first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await expect(page).toHaveURL(href!);
  });
});

test.describe("Recipe Detail Page", () => {
  test("valid recipe slug renders detail page with title", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");

    const recipeLinks = page.locator("a[href*='/recipes/']");
    const count = await recipeLinks.count();
    test.skip(count === 0, "No recipes available");

    await recipeLinks.first().click();
    await page.waitForLoadState("networkidle");

    const title = page.locator("h1").first();
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText("");
  });

  test("recipe detail has back to recipes link", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");

    const recipeLinks = page.locator("a[href*='/recipes/']");
    const count = await recipeLinks.count();
    test.skip(count === 0, "No recipes available");

    await recipeLinks.first().click();
    await page.waitForLoadState("networkidle");

    const backLink = page.locator("a", { hasText: "Back to Recipes" });
    await expect(backLink).toBeVisible();
  });

  test("non-existent recipe slug returns 404", async ({ page }) => {
    const response = await page.goto("/recipes/this-recipe-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
  });
});
