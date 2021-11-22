import React from "react";

import blogService from "../services/blogs";

function BlogForm({ state }) {
  async function addBlog(event) {
    event.preventDefault();

    const blogObject = {
      title: state.newTitle,
      author: state.newAuthor,
      url: state.newURL
    }

    const resBlog = await blogService.create(blogObject);
    state.setBlogs(state.blogs.concat(resBlog));
    state.setNewTitle("");
    state.setNewAuthor("");
    state.setNewURL("");
    state.setMessage({ text: `added '${resBlog.title}' by ${resBlog.author} to database.`,
                       type: "success"});
    setTimeout(() => state.setMessage({ text: null }), 5000);
  }

  return (
    <>
    <h2>add blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title: <input 
          type="text"
          value={state.newTitle}
          name="title"
          onChange={({ target }) => state.setNewTitle(target.value)}
        />
      </div>
      <div>
        author: <input 
          type="text"
          value={state.newAuthor}
          name="title"
          onChange={({ target }) => state.setNewAuthor(target.value)}
        />
      </div>
      <div>
        url: <input 
          type="text"
          value={state.newURL}
          name="title"
          onChange={({ target }) => state.setNewURL(target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
    </>
  )
}

export default BlogForm;