import { useState, useEffect, useReducer } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
import { Container } from "@mui/material";
import { Navigation } from "./components/Navigation.jsx";

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
    <Container maxWidth="xl">
      <Navigation onLogout={logout} user={user} />
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
          <div style={{ paddingTop: "70px" }}>
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
          </div>
        </>
      )}
    </Container>
  );
};

export default App;
