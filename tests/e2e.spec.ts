import { test, expect } from "@playwright/test";

test.describe("Prography 10th Frontend Application", () => {
  test("should navigate through the application process", async ({ page }) => {
    await page.goto("/");
    await page.click("text=지원하기");
    await expect(page).toHaveURL("/apply");

    await page.check('input[name="consent"][value="true"]');
    await page.click("text=다음");

    await page.fill('input[name="name"]', "김프로");
    await page.fill('input[name="email"]', "prography@gmail.com");
    await page.fill('input[name="phone"]', "01012345678");
    await page.click("text=다음");

    await page.check('input[name="role"][value="프론트엔드"]');
    await page.click("text=제출하기");

    await expect(page).toHaveURL("/complete");
    await expect(page.locator("text=지원이 완료되었습니다.")).toBeVisible();
  });
});
