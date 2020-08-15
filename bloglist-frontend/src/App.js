import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [ newNotification, setNewNotification ] = useState('')
  const [ errorExists, setErrorExists ] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setErrorExists(true)
      setTimeout(() => {
        setErrorMessage('')
        setErrorExists(false)
      }, 5000)
    }
  }


  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddBlog = async (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
        setNewNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        console.log(returnedBlog)
        setTimeout(() => {
          setNewNotification('')
        }, 5000)
      })
      .catch(error => {
        setNewNotification(`${error.response.data.error}`)
        setErrorExists(true)
        setTimeout(() => {
          setNewNotification('')
          setErrorExists(false)
        }, 5000)
      })
  }

  const handleAddLike = async (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog).sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setNewNotification(`${error.response.data.error}`)
        setErrorExists(true)
        setTimeout(() => {
          setNewNotification('')
          setErrorExists(false)
        }, 5000)
      })
  }

  const handleDeleteClick = (blogObject) => {
    if (window.confirm(`delete ${blogObject.title} by ${blogObject.author}?`)) {
      blogService
        .del(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id!==blogObject.id))
          setNewNotification(`${blogObject.title} by ${blogObject.author} deleted`)
          setTimeout(() => {
            setNewNotification('')
          }, 5000)
        })
        .catch(error => {
          setNewNotification(`${error.response.data.error}`)
          setErrorExists(true)
          setTimeout(() => {
            setNewNotification('')
            setErrorExists(false)
          }, 5000)
        })
    }
  }

  if (user===null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={errorMessage} errorExists={errorExists}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange= {handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )

  } else if (blogs[0]) {
    return (
      <div>
        <Notification message={newNotification} errorExists={errorExists} />
        {user.name} logged in <button onClick={handleLogoutClick}> logout </button>
        <Togglable buttonLabel='new blog'>
          <BlogForm createBlog={handleAddBlog} />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={handleAddLike} deleteBlog={handleDeleteClick} user={user} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={newNotification} errorExists={errorExists} />
      {user.name} logged in <button onClick={handleLogoutClick}> logout </button>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>
      No blogs yet!
    </div>
  )

}


const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => (

  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type='text'
        value={username}
        name='Username'
        id='username'
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        name='Password'
        id='password'
        onChange={handlePasswordChange}
      />
    </div>
    <button type='submit'>login</button>
  </form>
)


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const Notification = ({ message, errorExists }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  if (errorExists) {
    return (
      <div style={errorStyle} className={'notification'}>
        <br />
        <em>{message}</em>
      </div>
    )
  }

  return (
    <div style={notificationStyle}>
      <br />
      <em>{message}</em>
    </div>
  )
}

export default App