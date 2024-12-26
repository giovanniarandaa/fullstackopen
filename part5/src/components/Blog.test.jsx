import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";

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
