import { useState } from "react";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  return (
    <>
      <div style={blogStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </>
  );
};

export default Blog;
