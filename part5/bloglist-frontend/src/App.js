import React, { useState, useEffect, useRef } from "react";
import "./index.css";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

const App = () => {
  const [ blogs, setBlogs ] = useState([]);
  const [ user, setUser ] = useState(null);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ message, setMessage ] = useState({ text: null, type: "success" });

  const blogFormRef = useRef();

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
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm state={{ blogs, setBlogs, setMessage, blogFormRef }}/>
          </Togglable>
          <div>
            {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} state={{ blogs, setBlogs }} />)}
          </div>
        </div>
      }

      <Footer />
    </div>
  );
};

export default App;