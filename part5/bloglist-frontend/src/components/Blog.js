import React, { useState } from 'react'
import blogService from "../services/blogs";

function Blog ({ blog }) {
  const [ detailsVisible, setDetailsVisible ] = useState(false);

  function toggleDetails() {
    setDetailsVisible(!detailsVisible);
  }

  async function handleLike() {
    console.log("liking");
  }

  return (
    <>
    <p>{blog.title} - {blog.author} - <button onClick={toggleDetails}>{detailsVisible ? "hide" : "show"} details</button>    </p>  
    <ul style={{display: detailsVisible ? "" : "none"}}>
      <li>{blog.url}</li>
      <li>Likes: {blog.likes} <button onClick={handleLike}>like</button></li>
    </ul>
    </>
  )  
}

export default Blog