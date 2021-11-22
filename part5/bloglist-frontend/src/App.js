import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    blogService.getAll()
               .then(blogs => setBlogs( blogs ));
  }, []);


  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentBloglistAppUser");
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  function logout() {
    window.localStorage.removeItem("currentNoteAppUser");
  }


  return (
    <div>
      <Notification message={errorMessage} />

      {
        user === null ?
        LoginForm({ username,
                    password,
                    setUsername,
                    setPassword,
                    setUser,
                    setErrorMessage }) :
        <div>
          <h2>blogs</h2>
          <p>{user.name} is logged in. <a href="/" onClick={logout}>log out</a></p>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }

      <Footer />
    </div>
  )
}

export default App