import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getAllUsers = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get("/api/users", config);
  return request.then((response) => response.data);
};

const getUser = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get("/api/users/" + id, config);
  return request.then((response) => response.data);
};

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
  getAllUsers,
  getUser,
  getById,
};
