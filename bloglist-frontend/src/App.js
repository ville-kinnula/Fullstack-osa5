import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Menu from './components/Menu'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logOut, setAlreadyLoggedinUser } from './reducers/userReducer'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'  
import Container from '@material-ui/core/Container'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const  user = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setAlreadyLoggedinUser(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setUser({username, password}))
      .then( () => {
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        setUsername('')
        setPassword('')
        dispatch(setNotification('wrong username or password', 5, true))
      })
  }


  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }

  if (user===null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange= {handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )

  } else if (user!==null) {
    return (
      <Container>
        <Menu />
        <Switch>
          <Route path='/users' >
            <Notification />
            {user.name} logged in <button onClick={handleLogoutClick}> logout </button>
            <UserList />
          </Route>
          <Route path='/' >
            <div>
              <Notification />
              {user.name} logged in <button onClick={handleLogoutClick}> logout </button>
              <BlogList />
            </div>
          </Route>
        </Switch>
      </Container>
    )
  }
/*
  return (
    <div>
      <Menu />
      <Notification />
      {user.name} logged in <button onClick={handleLogoutClick}> logout </button>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      No blogs yet!
    </div>
  )
*/
}


export default App