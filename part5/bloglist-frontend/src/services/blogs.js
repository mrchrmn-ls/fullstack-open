import axios from 'axios'
const baseURL = '/api/blogs'

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

function getAll() {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token }
  };

  const res = await axios.post(baseURL, newObject, config);
  return res.data;
}

const blogService = { getAll, create, setToken }

export default blogService;