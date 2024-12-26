import BlogForm from "./BlogForm.jsx";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={createBlog} />);

  const input = screen.getByRole("textbox", { name: "title" });
  const button = screen.getByRole("button");

  await user.type(input, "testing a form...");
  await user.click(button);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});

test("calls onSubmit with correct details when a new blog is created", async () => {
  const mockAddBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={mockAddBlog} />);

  const titleInput = screen.getByRole("textbox", { name: "title" });
  const authorInput = screen.getByRole("textbox", { name: "author" });
  const urlInput = screen.getByRole("textbox", { name: "url" });
  const createButton = screen.getByRole("button", { name: "create" });

  await user.type(titleInput, "Testing Blog Title");
  await user.type(authorInput, "Testing Blog Author");
  await user.type(urlInput, "http://testblog.com");

  await user.click(createButton);

  expect(mockAddBlog).toHaveBeenCalledTimes(1);

  expect(mockAddBlog.mock.calls[0][0]).toEqual({
    title: "Testing Blog Title",
    author: "Testing Blog Author",
    url: "http://testblog.com",
  });
});
