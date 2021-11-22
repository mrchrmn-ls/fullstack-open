import axios from "axios";
const baseURL = "/api/notes";

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

function getAll() {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token }
  };

  const res = await axios.post(baseURL, newObject, config);
  return res.data;
}

function update(id, newObject) {
  const req = axios.put(`${baseURL}/${id}`, newObject);
  return req.then(res => res.data);
}

let service = { getAll, create, update, setToken };

export default service;