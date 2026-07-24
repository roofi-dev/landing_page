import { test, expect } from "@playwright/test";

test.describe("About Page Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("page loads and has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/About Us.*Ladang Lima/i);
  });

  test("hero banner is visible with title and subtitle", async ({ page }) => {
    const hero = page.locator(".about-hero");
    await expect(hero).toBeVisible();

    const heroTitle = page.locator(".about-hero h1");
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).not.toHaveText("");

    const heroSubtitle = page.locator(".about-hero p").last();
    await expect(heroSubtitle).toBeVisible();
  });

  test("hero 'about Ladang Lima' label is visible", async ({ page }) => {
    const label = page.locator(".about-hero .text-amber-400").first();
    await expect(label).toBeVisible();
    await expect(label).toContainText(/about Ladang Lima/i);
  });

  test("stats strip renders 4 stat cards", async ({ page }) => {
    const stats = page.locator(".vc-stats-card");
    await expect(stats).toHaveCount(4);

    const firstStatNum = stats.first().locator("p").first();
    await expect(firstStatNum).not.toHaveText("");
  });

  test("story section renders with image and text cards", async ({ page }) => {
    const storySection = page.locator(".vc-story");
    await expect(storySection).toBeVisible();

    const storyCards = page.locator(".vc-story-card");
    await expect(storyCards.first()).toBeVisible();
  });

  test("values section renders core value cards", async ({ page }) => {
    const valuesSection = page.locator(".vc-values");
    await expect(valuesSection).toBeVisible();

    const valueCards = page.locator(".vc-value-card");
    const count = await valueCards.count();
    expect(count).toBeGreaterThanOrEqual(4);

    const firstCardTitle = valueCards.first().locator("h3");
    await expect(firstCardTitle).not.toHaveText("");
  });

  test("timeline section renders milestone cards", async ({ page }) => {
    const timelineSection = page.locator(".vc-timeline");
    await expect(timelineSection).toBeVisible();

    const timelineCards = page.locator(".vc-timeline-card");
    const count = await timelineCards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("CTA card in timeline has 'What's Next' label", async ({ page }) => {
    const ctaCard = page.locator(".vc-cta-card");
    await expect(ctaCard).toBeVisible();
    await expect(ctaCard).toContainText(/what.*next/i);
  });

  test("closing section renders with promise text", async ({ page }) => {
    const closingSection = page.locator(".vc-closing");
    await expect(closingSection).toBeVisible();
    await expect(closingSection).toContainText(/our promise/i);
    await expect(closingSection).toContainText(/feeding the future/i);
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
