import React, { useState } from "react";

import blogService from "../services/blogs";

function BlogForm({ state }) {
  const [ newTitle, setNewTitle ] = useState("");
  const [ newAuthor, setNewAuthor ] = useState("");
  const [ newURL, setNewURL ] = useState("");

  const { blogs, setBlogs, setMessage, blogFormRef } = state;

  async function addBlog(event) {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    };

    blogFormRef.current.toggleVisibility();
    const resBlog = await blogService.create(blogObject);

    setBlogs(blogs.concat(resBlog));
    setNewTitle("");
    setNewAuthor("");
    setNewURL("");
    setMessage({ text: `added '${resBlog.title}' by ${resBlog.author} to database.`,
                       type: "success" });
    setTimeout(() => setMessage({ text: null }), 5000);
  }

  return (
    <>
    <h2>add blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title: <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type="text"
          value={newAuthor}
          name="title"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url: <input
          type="text"
          value={newURL}
          name="title"
          onChange={({ target }) => setNewURL(target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
    </>
  );
}

export default BlogForm;