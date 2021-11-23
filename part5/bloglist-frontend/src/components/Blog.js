import React, { useState } from "react";
import blogService from "../services/blogs";

function Blog ({ blog, state }) {
  const { blogs, setBlogs } = state;
  const [ detailsVisible, setDetailsVisible ] = useState(false);
  const [ likes, setLikes ] = useState(blog.likes);


  function toggleDetails() {
    setDetailsVisible(!detailsVisible);
  }


  async function likeBlog() {
    const update = {
      id: blog.id,
      likes: likes + 1
    };

    try {
      const updated = await blogService.update(update);
      setLikes(updated.likes);
    } catch (error) {
      console.log("Coudl not update blog:\n", error);
    }
  }


  async function removeBlog() {
    if (window.confirm(`Remove '${blog.title}' by '${blog.author}'?\nThis canot be undone.`)) {
      await blogService.remove(blog.id);

      const newBlogs = blogs.slice();
      const splicedIndex = blogs.findIndex(element => element.id === blog.id);
      newBlogs.splice(splicedIndex, 1);

      setBlogs(newBlogs);
    }
  }


  return (
    <>
    <p>{blog.title} - {blog.author} - <button onClick={toggleDetails}>{detailsVisible ? "hide" : "show"} details</button>    </p>
    <div style={{ display: detailsVisible ? "" : "none" }}>
      <ul>
        <li>{blog.url}</li>
        <li>Likes: {likes} <button onClick={likeBlog}>like</button></li>
        <li>{blog.url}</li>
        <li>{blog.id}</li>
      </ul>
      <button onClick={removeBlog}>remove</button>
    </div>
    </>
  );
}

export default Blog;