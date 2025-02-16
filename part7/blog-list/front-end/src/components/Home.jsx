import { Blogs } from "./Blogs.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs.js";
import { setNotification } from "../../reducers/notificationReducer.js";

export const Home = ({ user, dispatch }) => {
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch(setNotification("Blog added successfully!", "success"));
    },
    onError: () => {
      dispatch(setNotification("Error adding blog", "error"));
    },
  });
  const [blogVisible, setBlogVisible] = useState(false);

  const addBlog = async (form) => {
    const blogObject = {
      title: form.title,
      author: form.author,
      url: form.url,
      user: user.id,
      likes: 0,
    };

    newBlogMutation.mutate(blogObject);
    setBlogVisible(false);
  };

  const noteForm = () => {
    const hideWhenVisible = { display: blogVisible ? "none" : "block" };
    const showWhenVisible = { display: blogVisible ? "block" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm addBlog={addBlog} />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <>
      {noteForm()}
      <Blogs user={user} dispatch={dispatch} />
    </>
  );
};
