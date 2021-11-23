import React from "react";
import loginService from "../services/login";
import noteService from "../services/notes"

function LoginForm(state) {
  const { setUser,
          username,
          setUsername,
          password,
          setPassword,
          setErrorMessage,
          loginVisible,
          setLoginVisible } = state;


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
      <div style={{display: loginVisible ? "none" : ""}}>
        <button onClick={() => setLoginVisible(true)}>login</button>
      </div>
      <div style={{display: loginVisible ? "" : "none"}}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
    </>
  )
}

export default LoginForm;