import { combineReducers, createStore } from "redux";
import filterReducer from "./reducers/filterReducer.js";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
