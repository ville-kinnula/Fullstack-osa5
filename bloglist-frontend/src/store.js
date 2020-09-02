import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})
const store = createStore(combinedReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store