import { test, expect } from "./fixture";
import path from "path";

test("loads extension", async ({ page, toggleExtension }) => {
  const testPage = path.join(__dirname, "./page.html");
  await page.goto(`file://${testPage}`);
  await expect(page).toHaveTitle("Test");

  await toggleExtension();
  await expect(page).toHaveScreenshot("enabled.png");

  await toggleExtension();
  await expect(page).toHaveScreenshot("disabled.png");
});
