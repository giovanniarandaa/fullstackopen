import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you created '${content}'`));
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
