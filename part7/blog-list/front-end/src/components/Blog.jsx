import { useState } from "react";
import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title} {!show && blog.author}
        <button onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? "hide" : "show"}
        </button>
        {show && (
          <div>
            <span className="url">{blog.url}</span>
            <br />
            likes <span className="likes">{blog.likes}</span>{" "}
            <button onClick={() => handleLike(blog)}>like</button> <br />
            {blog.author}
            {user?.username === blog.user?.username && (
              <div>
                <button onClick={() => handleDelete(blog)}>remove</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
