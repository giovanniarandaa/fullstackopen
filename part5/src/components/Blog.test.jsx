import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import { userEvent } from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 10,
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("Test title");
});

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 10,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} setUpdate={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  expect(screen.getByText("10")).toBeDefined();
  expect(screen.getByText("Test url")).toBeDefined();
});

test("clicking the like button twice calls the event handler twice", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    likes: 10,
    url: "Test url",
  };

  const mockLikeHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockLikeHandler} />);

  const user = userEvent.setup();
  const showButton = screen.getByText("show");

  await user.click(showButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikeHandler).toHaveBeenCalledTimes(2);
});
