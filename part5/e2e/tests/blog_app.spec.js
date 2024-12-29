const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
      data: {
        name: "Giovanni Aranda",
        username: "garanda",
        password: "1234567890",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const heading = await page.getByText("Log in to application");
    await expect(heading).toBeVisible();

    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "garanda", "1234567890");
      await expect(page.getByText("Giovanni Aranda logged in")).toBeVisible();
    });
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "garanda", "wrong");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "garanda", "1234567890");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("Kansalle ruokaa");
      await page.getByTestId("author").fill("Kansan Make");
      await page.getByTestId("url").fill("www.example.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("Kansalle ruokaa Kansan Make")).toBeVisible();
    });
  });
});
