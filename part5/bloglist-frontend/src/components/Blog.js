import React from 'react'


function Blog ({ blog }) {
  return (
    <p>
      {blog.title} - {blog.author}
    </p>  
  )  
}

export default Blog