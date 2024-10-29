import axios from "axios";

const base_url = "https://studies.cs.helsinki.fi/restcountries/api";

export const getAll = (search) => {
  return axios.get(`${base_url}/all`);
};
