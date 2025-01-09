import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer.js";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
    ),
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(increaseVote(id));
    dispatch(
      setNotification(
        `you voted '${anecdotes.find((anecdote) => anecdote.id === id).content}'`,
      ),
    );

    const timeout = setTimeout(() => {
      dispatch(clearNotification());
      clearTimeout(timeout);
    }, 5000);
  };

  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return anecdotesByVotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};
export default AnecdoteList;
