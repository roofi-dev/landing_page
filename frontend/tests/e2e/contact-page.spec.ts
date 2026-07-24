import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("contact page loads with title", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact Us.*Ladang Lima/i);
  });

  test("page header is visible", async ({ page }) => {
    await page.goto("/contact");
    const header = page.locator("h1, h2").first();
    await expect(header).toBeVisible();
  });

  test("navbar and footer are visible", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("contact info cards are visible", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("text=Main Office").first()).toBeVisible();
    await expect(page.locator("text=Phone").first()).toBeVisible();
    await expect(page.locator("text=Email").first()).toBeVisible();
    await expect(page.locator("text=Business Hours").first()).toBeVisible();
  });

  test("contact form is visible", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form").first();
    await expect(form).toBeVisible();
  });

  test("factory CTA section is visible", async ({ page }) => {
    await page.goto("/contact");
    const cta = page.locator("text=Visit Our Factory").or(page.locator("text=See Where the"));
    await expect(cta.first()).toBeVisible();
  });

  test("contact form has name, email, and message fields", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form").first();

    const nameField = form.locator("input[name='name'], input[placeholder*='name' i]").first();
    const emailField = form.locator("input[name='email'], input[type='email'], input[placeholder*='email' i]").first();
    const messageField = form.locator("textarea").first();

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();
  });

  test("contact form has submit button", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form").first();
    const submitButton = form.locator("button[type='submit'], button:has-text('Send'), button:has-text('Submit')").first();
    await expect(submitButton).toBeVisible();
  });
});
