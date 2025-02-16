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

    await request.post("/api/users", {
      data: {
        name: "Another User",
        username: "anotheruser",
        password: "anotherpassword",
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

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("Test Blog for Liking");
      await page.getByTestId("author").fill("Test Author");
      await page.getByTestId("url").fill("www.example.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(
        page.getByText("Test Blog for Liking Test Author"),
      ).toBeVisible();
      await page.getByRole("button", { name: "show" }).click();
      const likeButton = page.getByRole("button", { name: "like" });
      await expect(page.getByText("likes 0")).toBeVisible();
      await likeButton.click();
      //await page.waitForSelector("text=likes 1");
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("a blog can be deleted by the user who created it", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("Blog to be deleted");
      await page.getByTestId("author").fill("Author Delete");
      await page.getByTestId("url").fill("www.example.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("Blog to be deleted Author Delete"),
      ).toBeVisible();

      await page.getByRole("button", { name: "show" }).click();
      page.on("dialog", (dialog) => {
        dialog.accept();
      });
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("Blog to be deleted Author Delete"),
      ).not.toBeVisible();
    });

    test("only the user who created the blog can see the remove button", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("User-specific Blog");
      await page.getByTestId("author").fill("Author Test");
      await page.getByTestId("url").fill("www.example.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("User-specific Blog Author Test"),
      ).toBeVisible();

      await page.getByRole("button", { name: "show" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();

      await loginWith(page, "anotheruser", "anotherpassword");
      await expect(page.getByText("Another User logged in")).toBeVisible();

      await page.getByRole("button", { name: "show" }).click();
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });

    test("blogs are ordered by likes in descending order", async ({ page }) => {
      const blogs = [
        {
          title: "Blog with 3 likes",
          author: "Author 1",
          url: "www.example1.com",
          likes: 3,
        },
        {
          title: "Blog with 5 likes",
          author: "Author 2",
          url: "www.example2.com",
          likes: 5,
        },
        {
          title: "Blog with 1 like",
          author: "Author 3",
          url: "www.example3.com",
          likes: 1,
        },
      ];

      for (const blog of blogs) {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByTestId("title").fill(blog.title);
        await page.getByTestId("author").fill(blog.author);
        await page.getByTestId("url").fill(blog.url);
        await page.getByRole("button", { name: "create" }).click();

        const blogContainer = page
          .locator(".blog")
          .filter({ hasText: blog.title });
        await blogContainer.getByRole("button", { name: "show" }).click();

        const likeButton = blogContainer.getByRole("button", { name: "like" });
        for (let i = 0; i < blog.likes; i++) {
          await likeButton.click();
        }

        console.log(
          await blogContainer.getByRole("button", { name: "hide" }).isVisible(),
        );
        console.log(
          await blogContainer.getByRole("button", { name: "hide" }).isEnabled(),
        );
        await blogContainer.getByRole("button", { name: "hide" }).click();
      }

      const blogTitles = await page.locator(".blog .title").allTextContents();
      const blogLikes = await page.locator(".blog .likes").allTextContents();
      const blogsWithLikes = blogTitles.map((title, index) => ({
        title,
        likes: parseInt(blogLikes[index].match(/\d+/)[0]),
      }));
      const sortedByLikes = [...blogsWithLikes].sort(
        (a, b) => b.likes - a.likes,
      );
      expect(blogsWithLikes).toEqual(sortedByLikes);
    });
  });
});
