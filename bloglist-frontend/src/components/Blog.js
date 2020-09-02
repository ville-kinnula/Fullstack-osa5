import React,  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  BrowserRouter as Router, Route, Switch, Link,
   useHistory, useRouteMatch
} from 'react-router-dom'
import { FormControl, FilledInput, InputLabel, Button } from '@material-ui/core'

const Blog = () => {
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  const removeBlogVisible = { display: (user.username===blog.user.username) ? '' : 'none' }

  const like = async () => {
    
    dispatch(likeBlog(blog))
      .then(() => dispatch(setNotification(`you liked '${blog.title}'`, 5, false)))
      .catch(error => dispatch(setNotification(`${error.response.data.error}`, 5, true)))
  }


  const removeClick = () => {
    dispatch(deleteBlog(blog))
      .then(() => {
        dispatch(setNotification(`${blog.title} by ${blog.author} deleted`, 5, false))
      })
      .catch(error => {
        dispatch(setNotification(`${error.response.data.error}`, 5,true))
      })
  }

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
      .then(() => {
        setComment('')
        dispatch(setNotification(`comment added`, 5, false))
      })
      .catch(error => {
        dispatch(setNotification(`${error.response.data.error}`, 5,true))
      })
  }

  const handleFormChange = (event) => setComment(event.target.value)

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={like}>like</button></div>
      added by {blog.user.username}
      <div style={removeBlogVisible} className='removeButton'>
          <button onClick={removeClick}>remove</button>
      </div>
      <h3>Comments</h3>
      <div>
        <form onSubmit={submitComment}>
          <div>
          <FormControl variant='filled'>
            <InputLabel htmlFor="component-simple">Comment here</InputLabel>
            <FilledInput id="component-simple" value={comment} onChange={handleFormChange} />
          </FormControl>
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Add comment
            </Button>
          </div>
        </form>
      </div>
      {blog.comments.map(comment => {
        return <li key={Math.ceil(Math.random()*1000000)}>{comment}</li>
      })}
    </div>
  )
}


export default Blog
