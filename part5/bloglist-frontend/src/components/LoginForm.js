import React from "react";
import loginService from "../services/login";
import blogService from "../services/blogs"

function LoginForm(state) {
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: state.username,
        password: state.password
      });

      window.localStorage.setItem("currentNoteAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      state.setUser(user);
      state.setUsername("");
      state.setPassword("");

    } catch (error) {
      state.setErrorMessage("Wrong credentials.");
      setTimeout(() => state.setErrorMessage(null), 5000);
    }  
  }

  return (
      <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={state.username}
          name="Username"
          onChange={({ target }) => state.setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={state.password}
          name="Password"
          onChange={({ target }) => state.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm;