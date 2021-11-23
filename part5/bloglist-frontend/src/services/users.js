import axios from "axios";

const baseURL = "/api/users";

async function getUser(username) {
  const res = await axios.get(`${baseURL}/${username}`);
  return res.data;
}

const userService = { getUser };

export default userService;