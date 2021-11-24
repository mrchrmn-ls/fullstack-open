import React, { useState } from "react";
import blogService from "../services/blogs";

function Blog ({ blog, state }) {
  const { blogs, setBlogs, user } = state;
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
      console.log("Could not update blog:\n", error);
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


  function RemoveBlog() {
    if (!blog.user) {
      return (
        <RemoveButton />
      );
    }

    if (user.id && (blog.user.id === user.id)) {
      return (
        <RemoveButton />
      );
    }

    return (
      <>
      </>
    );
  }


  function RemoveButton() {
    return (
      <button onClick={removeBlog}>remove</button>
    );
  }


  return (
    <>
    <p className="titleAuthor">{blog.title} - {blog.author} - <button onClick={toggleDetails}>{detailsVisible ? "hide" : "show"} details</button>    </p>
    <div className="blogDetails" style={{ display: detailsVisible ? "" : "none" }}>
      <ul>
        <li>{blog.url}</li>
        <li>Likes: {likes} <button onClick={likeBlog}>like</button></li>
        <li>{blog.url}</li>
        <li>{blog.id}</li>
      </ul>
      <RemoveBlog />
    </div>
    </>
  );
}

export default Blog;