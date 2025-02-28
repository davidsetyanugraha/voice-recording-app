import { test, expect } from "@playwright/test";

test("App should always have correct title", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveTitle(/Voice recording app/i);
});
