import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.loggedInUser
    case 'LOGOUT':
      return null
    case 'SET_ALREADY_LOGGED':
      return action.user
    default:
      return state
  }
}

export const setUser = user => {
  return async dispatch => {
    const loggedInUser = await loginService.login(user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    dispatch({
    type: 'SET_USER',
    loggedInUser,
    })
  }
}

export const setAlreadyLoggedinUser = user => {
  blogService.setToken(user.token)
  return {
    type: 'SET_ALREADY_LOGGED',
    user
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export default userReducer