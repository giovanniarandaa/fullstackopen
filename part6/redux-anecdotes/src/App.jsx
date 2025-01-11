import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecdotesService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
