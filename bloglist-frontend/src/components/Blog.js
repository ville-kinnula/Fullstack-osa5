import React,  { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyleNotVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const blogStyleVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const removeBlogVisible = { display: (user.username===blog.user.username) ? '' : 'none' }

  const likeClick = () => {
    var newObject = blog
    newObject.likes = blog.likes + 1
    addLike(newObject)
  }

  const removeClick = () => {
    deleteBlog(blog)
  }

  return (
    <div>
      <div style={blogStyleNotVisible} className='viewLessBlog'>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={blogStyleVisible} className='viewMoreBlog'>
        <p>
          {blog.title} by {blog.author} <button onClick={() => setVisible(false)}>hide</button>
        </p>
        <p>
          {blog.url}
        </p>
        <p>
          Likes {blog.likes} <button onClick={likeClick}>like</button>
        </p>
        <p>
          {blog.user.name}
        </p>
        <div style={removeBlogVisible} className='removeButton'>
          <button onClick={removeClick}>remove</button>
        </div>
      </div>
    </div>
  )

}

export default Blog
