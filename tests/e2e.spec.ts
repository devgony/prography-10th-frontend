import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

async function fillOneAndNext(page) {
  await page.check('input[name="consent"][value="true"]');
  await page.click("text=다음");
}

async function fillTwoAndNext(page) {
  await page.fill('input[name="name"]', "김프로");
  await page.fill('input[name="email"]', "prography@gmail.com");
  await page.fill('input[name="phone"]', "01012345678");
  await page.click("text=다음");
}

async function fillThreeAndSubmit(page) {
  await page.check('input[name="role"][value="프론트엔드"]');
  await page.click("text=제출하기");
}

async function getCurrentProgress(page: Page) {
  const elements = await page.$$(".circle.bg-blue-500");

  const values = await Promise.all(
    elements.map(async (element) => {
      const text = (await element.textContent()) ?? "0";
      return parseInt(text, 10);
    }),
  );

  return Math.max(...values);
}

test.describe("Prography 10th Frontend Application", () => {
  test("모든 리쿠르팅 진행 단계를 통과하고 지원을 완료 해야한다.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click("text=지원하기");
    await expect(page).toHaveURL("/apply");

    await fillOneAndNext(page);
    await fillTwoAndNext(page);
    await fillThreeAndSubmit(page);

    await expect(page).toHaveURL("/complete");
    await expect(page.locator("text=지원이 완료되었습니다.")).toBeVisible();
  });

  test("리쿠르팅 진행단계를 표시합니다", async ({ page }) => {
    await page.goto("/apply");
    const progressOne = page.getByText("1", { exact: true });
    await expect(progressOne).toHaveClass(/bg-blue-500/);

    const progressTwo = page.getByText("2", { exact: true });
    await expect(progressTwo).toHaveClass(/bg-gray-200/);

    const progressThree = page.getByText("3", { exact: true });
    await expect(progressThree).toHaveClass(/bg-gray-200/);
  });

  test("제출하기 버튼을 누르기 전까지 리크루팅 폼 데이터가 유지되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/apply");
    await fillOneAndNext(page);
    await fillTwoAndNext(page);

    await page.click("text=뒤로");
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveValue("김프로");
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveValue("prography@gmail.com");
    const phoneInput = page.locator('input[name="phone"]');
    await expect(phoneInput).toHaveValue("01012345678");

    await page.click("text=뒤로");
    const consentInput = page.getByText("개인정보 수집 여부에 동의합니다");
    await expect(consentInput).toBeChecked();
  });

  test("필수 입력 항목이 있으며, 필수 항목을 입력하기 전까지는 다음 단계로 넘어갈 수 없어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/apply");
    await page.click("text=다음");
    let currentProgress = await getCurrentProgress(page);
    await expect(currentProgress).toBe(1);

    await fillOneAndNext(page);
    await page.click("text=다음");
    currentProgress = await getCurrentProgress(page);
    await expect(currentProgress).toBe(2);

    await fillTwoAndNext(page);
    await page.click("text=다음");
    currentProgress = await getCurrentProgress(page);
    await expect(currentProgress).toBe(3);
  });

  test("다음 단계로 넘어갈 경우, 필수 입력 항목이 누락되었을 때 경고 표시 및 알림이 제공되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/apply");
    await page.click("text=다음");

    const consentErr = page.getByText("개인정보 수집에 동의해주세요");
    await expect(consentErr).toBeVisible();

    await fillOneAndNext(page);

    await page.click("text=다음");
    const nameErr = page.getByText("이름은 두 글자 이상이여야 합니다.");
    await expect(nameErr).toBeVisible();
    const emailErr = page.getByText("올바른 이메일 형식이 아닙니다.");
    await expect(emailErr).toBeVisible();
    const phoneErr = page.getByText("올바른 휴대폰 번호 형식이 아닙니다.");
    await expect(phoneErr).toBeVisible();

    await fillTwoAndNext(page);

    await page.click("text=다음");
    const roleErr = page.getByText("역할을 선택해주세요.");
    await expect(roleErr).toBeVisible();
  });

  test("특정항목에 대한 예시 데이터를 표시해야 합니다.", async ({ page }) => {
    await page.goto("/apply");
    await page.click("text=다음");
    await fillOneAndNext(page);

    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute("placeholder", "예시: 김프로");
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute(
      "placeholder",
      "예시: prography@gmail.com",
    );
    const phoneInput = page.locator('input[name="phone"]');
    await expect(phoneInput).toHaveAttribute(
      "placeholder",
      "예시: 010-1234-5678 혹은 01012345678",
    );
  });

  test("API통신을 위한 리쿠르팅 폼 데이터 구성해야 합니다.", async ({
    page,
  }) => {
    let postRequestBody: string | null = null;
    await page.route("https://dummyjson.com/products/add", (route) => {
      if (route.request().method() === "POST") {
        postRequestBody = route.request().postData();
      }
      route.continue();
    });

    await page.goto("/apply");
    await page.click("text=다음");
    await fillOneAndNext(page);
    await fillTwoAndNext(page);
    await fillThreeAndSubmit(page);

    await expect(postRequestBody).toEqual(
      '{"name":"김프로","email":"prography@gmail.com","phone":"01012345678","consent":true,"role":"프론트엔드"}',
    );
  });
});
