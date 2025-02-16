import { useState, useEffect, useReducer } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import {
  notificationReducer,
  setNotification,
} from "../reducers/notificationReducer.js";
import { Home } from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { UserDetail } from "./pages/UserDetail.jsx";
import { BlogDetail } from "./pages/BlogDetail.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, dispatch] = useReducer(notificationReducer, null);

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

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
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
          <Routes>
            <Route
              path="/"
              element={<Home user={user} dispatch={dispatch} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route
              path="/blogs/:id"
              element={<BlogDetail dispatch={dispatch} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
