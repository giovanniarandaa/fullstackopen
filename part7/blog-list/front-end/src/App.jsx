import { useState, useEffect, useReducer } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import {
  notificationReducer,
  setNotification,
} from "../reducers/notificationReducer.js";

const App = () => {
  const [blogVisible, setBlogVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [update, setUpdate] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, dispatch] = useReducer(notificationReducer, null);

  useEffect(() => {
    dispatch(setNotification("Login successful!", "success"));
  }, []);

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, [update, user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setNotification("Login successful!"));
    } catch (exception) {
      dispatch(setNotification("Wrong username or password"));
    }
  };

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService
      .update(blog.id, updatedBlog)
      .then(() => {
        setUpdate(Math.random() * 100);
        dispatch(setNotification(`Liked "${blog.title}"`));
      })
      .catch(() => {
        dispatch(setNotification("Error updating blog"));
      });
  };

  const handleDelete = async (blog) => {
    console.log(blog);
    const confirm = window.confirm(
      `Delete blog ${blog.title} by ${blog.author}?`,
    );

    if (confirm) {
      await blogService.remove(blog.id);
      setUpdate(Math.random() * 100);
      dispatch(setNotification(`Deleted "${blog.title}"`));
    }
  };

  const addBlog = async (form) => {
    const blogObject = {
      title: form.title,
      author: form.author,
      url: form.url,
      user: user.id,
      likes: 0,
    };

    const newBlog = await blogService.create(blogObject);
    setBlogVisible(false);
    setBlogs(blogs.concat(newBlog));
    dispatch(
      setNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} added`,
      ),
    );
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  console.log(message);

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

  const blogsList = () => {
    return (
      <div>
        {blogs.map((blog) => (
          <Blog
            handleDelete={handleDelete}
            handleLike={handleLike}
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} dispatch={dispatch} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
        />
      ) : (
        <>
          <p>
            {user?.name} logged in <button onClick={logout}>logout</button>
          </p>
          {noteForm()}
          {blogsList()}
        </>
      )}
    </div>
  );
};

export default App;
