import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);

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
            likes {blog.likes} <button>like</button> <br />
            {blog.author}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
