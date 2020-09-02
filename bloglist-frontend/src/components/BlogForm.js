import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const dispatch = useDispatch()


  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: newTitle, author:newAuthor, url:newUrl
    }))
      .then(() => dispatch(setNotification(`A new blog ${newTitle} by ${newAuthor} added`, 5, false)))
      .catch(error => dispatch(setNotification(`${error.response.data.error}`, 5, true)))
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>Title: <input
          value={newTitle}
          id='title'
          name='Title:'
          onChange={handleTitleChange}
        />
        </div>
        <div>Author: <input
          value={newAuthor}
          id='author'
          name='Author:'
          onChange={handleAuthorChange}
        />
        </div>
        <div>URL: <input
          value={newUrl}
          id='url'
          name='URL:'
          onChange={handleUrlChange}
        />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm