import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(setNotification(`you created '${content}'`));
    dispatch(createAnecdote(content));

    const timeout = setTimeout(() => {
      dispatch(clearNotification());
      clearTimeout(timeout);
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
