import React, { useState, useEffect } from 'react';
import "./index.css"

import Blog from './components/Blog';
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import blogService from './services/blogs';

const App = () => {
  const [ blogs, setBlogs ] = useState([]);
  const [ user, setUser ] = useState(null);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ message, setMessage ] = useState({text: null, type: "success"});
  const [ newTitle, setNewTitle ] = useState("");
  const [ newAuthor, setNewAuthor ] = useState("");
  const [ newURL, setNewURL ] = useState("");


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
    window.localStorage.removeItem("currentBloglistAppUser");
  }


  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification message={message} />

      {
        user === null ?
        LoginForm({ username,
                    password,
                    setUsername,
                    setPassword,
                    setUser,
                    setMessage }) :
        <div>
          <h2>blogs</h2>
          <p>{user.name} is logged in. <a href="/" onClick={logout}>log out</a></p>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}

          <BlogForm state={{ newTitle,
                             setNewTitle,
                             newAuthor,
                             setNewAuthor,
                             newURL,
                             setNewURL,
                             blogs,
                             setBlogs,
                             setMessage}}/>
        </div>
      }

      <Footer />
    </div>
  )
}

export default App