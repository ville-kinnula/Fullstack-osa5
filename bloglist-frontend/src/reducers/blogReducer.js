import blogService from '../services/blogs'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'LIKE_BLOG':
      const likedId = action.data.id
      return state.map( blog => blog.id !== likedId ? blog : action.data ).sort((a,b) => b.likes - a.likes)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return state.filter( blog => blog.id !== action.data.id)
    case 'COMMENT_BLOG':
      const commentedId = action.commentedBlog.id
      return state.map( blog => blog.id !== commentedId ? blog : action.commentedBlog)
    default:
    return state
    }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs,
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  const votedBlog = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, votedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.del(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(blog.id, comment)
    dispatch({
      type:'COMMENT_BLOG',
      commentedBlog
    })
  }
}

export default reducer