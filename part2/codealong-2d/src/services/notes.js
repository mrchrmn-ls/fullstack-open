import axios from "axios";

const baseURL = "http://localhost:3001/notes";

async function getAll() {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
}

async function create(newObject) {
  const req = axios.post(baseURL, newObject);
  return req.then(res => res.data);
}

async function update(id, newObject) {
  const req = axios.put(`${baseURL}/${id}`, newObject);
  return req.then(res => res.data);
}

let service = { getAll, create, update };

export default service;