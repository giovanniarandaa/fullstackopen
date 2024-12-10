import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    setForm({ title: "", author: "", url: "" });
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <h2>create a new blog</h2>
      <div>
        title
        <input
          type="text"
          value={form.title}
          onChange={({ target }) => setForm({ ...form, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={form.author}
          onChange={({ target }) => setForm({ ...form, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={form.url}
          onChange={({ target }) => setForm({ ...form, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  const blogsList = () => {
    return (
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        loginForm()
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
