import { test, expect, type Page } from "@playwright/test";

async function getFirstProductSlug(page: Page): Promise<string | null> {
  try {
    const response = await page.request.get("http://127.0.0.1:8000/api/public/products", {
      headers: { Accept: "application/json" },
    });
    const contentType = response.headers()["content-type"] || "";
    if (!contentType.includes("application/json")) return null;
    const products = await response.json();
    if (!Array.isArray(products) || products.length === 0) return null;
    return products[0].slug || null;
  } catch {
    return null;
  }
}

test.describe("Products Page", () => {
  test("products listing page loads with title", async ({ page }) => {
    await page.goto("/products");
    await expect(page).toHaveTitle(/Our Products.*Ladang Lima/i);
  });

  test("page header is visible", async ({ page }) => {
    await page.goto("/products");
    const header = page.locator("h1, h2").first();
    await expect(header).toBeVisible();
  });

  test("navbar and footer are visible", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("products are displayed or empty state is shown", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    const productNames = page.locator("h3");
    const emptyState = page.locator("text=No products available");

    const nameCount = await productNames.count();
    const emptyVisible = await emptyState.isVisible().catch(() => false);

    expect(nameCount > 0 || emptyVisible).toBeTruthy();
  });

  test("product items have Buy Now links", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    const buyNowLinks = page.locator("a:has-text('Buy Now')");
    const count = await buyNowLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("product items have View Detail buttons", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    const viewDetailButtons = page.locator("button:has-text('View Detail')");
    const count = await viewDetailButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Product Detail Page", () => {
  test("valid product slug renders detail page", async ({ page }) => {
    await page.goto("/products");
    const slug = await getFirstProductSlug(page);
    test.skip(!slug, "No product slug available from API");

    await page.goto(`/products/${slug}`);
    await page.waitForLoadState("networkidle");

    const productName = page.locator("h1").filter({ hasNot: page.locator(".hidden") }).first();
    await expect(productName).not.toHaveText("");
  });

  test("product detail has buy button", async ({ page }) => {
    await page.goto("/products");
    const slug = await getFirstProductSlug(page);
    test.skip(!slug, "No product slug available from API");

    await page.goto(`/products/${slug}`);
    await page.waitForLoadState("networkidle");

    const buyButton = page.locator("button:has-text('Buy Now')");
    await expect(buyButton).toBeVisible({ timeout: 10000 });
  });

  test("product detail has back to products link", async ({ page }) => {
    await page.goto("/products");
    const slug = await getFirstProductSlug(page);
    test.skip(!slug, "No product slug available from API");

    await page.goto(`/products/${slug}`);
    await page.waitForLoadState("networkidle");

    const backLink = page.locator("a:has-text('Back to Products')");
    await expect(backLink).toBeVisible({ timeout: 10000 });
  });

  test("non-existent product slug returns 404", async ({ page }) => {
    const response = await page.goto("/products/this-product-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
  });
});
