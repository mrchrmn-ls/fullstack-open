import axios from "axios";

const baseURL = "/api/login";

async function login(credentials) {
  const res = await axios.post(baseURL, credentials);
  return res.data;
}

const loginService = { login };

export default loginService;