import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Notification from "./components/Notification.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests.js";
import { useNotificationDispatch } from "../notificationContext.jsx";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
    dispatch({
      type: "showNotification",
      payload: `You voted '${anecdote.content}'`,
    });
    setTimeout(() => {
      dispatch({ type: "hideNotification" });
    }, 2000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
  });

  if (result.isPending) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
