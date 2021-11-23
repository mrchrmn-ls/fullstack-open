import React, { useState } from 'react'
import blogService from "../services/blogs";

function Blog ({ blog }) {
  const [ detailsVisible, setDetailsVisible ] = useState(false);
  const [ likes, setLikes ] = useState(blog.likes);

  function toggleDetails() {
    setDetailsVisible(!detailsVisible);
  }

  async function handleLike() {
    const update = {
      id: blog.id,
      likes: likes + 1
    }

    try {
      const updated = await blogService.update(update);
      setLikes(updated.likes);
    } catch (error) {
      console.log("Coudl not update blog:\n", error)
    }
  }

  return (
    <>
    <p>{blog.title} - {blog.author} - <button onClick={toggleDetails}>{detailsVisible ? "hide" : "show"} details</button>    </p>  
    <ul style={{display: detailsVisible ? "" : "none"}}>
      <li>{blog.url}</li>
      <li>Likes: {likes} <button onClick={handleLike}>like</button></li>
      <li>{blog.url}</li>
      <li>{blog.id}</li>
    </ul>
    </>
  )  
}

export default Blog