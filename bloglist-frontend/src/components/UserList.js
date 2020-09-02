import React from 'react'
import { useState, useEffect } from 'react'
import usersServices from '../services/users'
import {
  BrowserRouter as Router, Route, Switch, Link,
   useHistory, useRouteMatch
} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const UserList = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    usersServices
      .getAll()
      .then(response => setUsers(response))
  }, [])

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!users[0]) {
    return null
  }

  return (
    <div>
      <Switch>
        <Route path='/users/:id' >
          <h1>{user ? user.name : null}</h1>
          <strong>added blogs</strong>
          {user 
            ? user.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>)
            : null}
        </Route>
        <Route path='/users' >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow key={'0'}>
                  <TableCell><strong>Users</strong> </TableCell>
                  <TableCell><strong>blogs created</strong></TableCell>
                </TableRow>
                {users.map(user => {
                  return (<TableRow key={user.id}>
                    <TableCell>
                      <Link to={`users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                      {user.blogs.length}
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

export default UserList