import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, increaseVote } from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(increaseVote(id));
  };

  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
