import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import NoteForm from "./components/NoteForm.jsx";

const App = () => {
  const [blogVisible, setBlogVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [update, setUpdate] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, [update]);

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
    } catch (exception) {
      setMessage({ type: "error", text: "wrong username or password" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLike = (blog) => {
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

  const handleDelete = async (blog) => {
    const confirm = window.confirm(
      `Delete blog ${blog.title} by ${blog.author}?`,
    );

    if (confirm) {
      await blogService.remove(blog.id);
      setUpdate(Math.random() * 100);
    }
  };

  const addNote = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: form.title,
      author: form.author,
      url: form.url,
      user: user.id,
      likes: 0,
    };

    await blogService.create(blogObject);
    setBlogs(blogs.concat(blogObject));
    setMessage({
      type: "success",
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
    });
    setForm({ title: "", author: "", url: "" });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
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
          <NoteForm addNote={addNote} setForm={setForm} form={form} />
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
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          password={password}
          handleUsernameChange={({ target }) => setPassword(target.value)}
          handlePasswordChange={({ target }) => setUsername(target.value)}
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
