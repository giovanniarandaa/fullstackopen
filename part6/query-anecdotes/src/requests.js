import axios from "axios";

const base_url = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () =>
  axios.get(base_url).then((res) => res.data);

export const createAnecdote = async (body) =>
  axios.post(base_url, body).then((res) => res.data);
