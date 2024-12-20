import { useState } from "react";
import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, setUpdate }) => {
  const [show, setShow] = useState(false);

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService
      .update(blog.id, updatedBlog)
      .then((response) => {
        setUpdate(Math.random() * 100);
        console.log("Blog updated:", response);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  return (
    <>
      <div style={blogStyle}>
        {blog.title}
        <button onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? "hide" : "show"}
        </button>
        {show && (
          <div>
            {blog.url}
            <br />
            likes {blog.likes} <button onClick={handleLike}>like</button> <br />
            {blog.author}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
