import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, {
  appendAnecdote,
  setAnecdotes,
} from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/filterReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import anecdoteService from "./services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
