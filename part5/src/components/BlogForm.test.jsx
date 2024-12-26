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
