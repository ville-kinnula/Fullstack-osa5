import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Route, Switch, Link
} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs.length===0) {
    return <div><h2>Blogs</h2>No blogs yet!</div>
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Switch>
        <Route path='/blogs/:id'>
          <Blog/>
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='new blog'>
            <BlogForm />
          </Togglable>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow><TableCell><strong>Blogs</strong></TableCell></TableRow>
                {blogs.map(blog => {
                   return (<TableRow key={blog.id}>
                      <TableCell>
                        <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                      </TableCell>
                    </TableRow>)
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </div>
  )
}

export default BlogList