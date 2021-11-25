import React, { useState } from "react";
import PropTypes from "prop-types";

import loginService from "../services/login";
import noteService from "../services/notes";

function LoginForm({ setUser, setErrorMessage }) {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");


  async function handleLogin(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("currentNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

    } catch (error) {
      setErrorMessage("Wrong credentials.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  return (
      <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginSubmit">login</button>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
};

export default LoginForm;