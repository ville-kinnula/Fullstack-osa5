import React from 'react'
import {
  BrowserRouter as Router, Route, Switch, Link
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
        Blogs
      </Button>
      <Button color="inherit" component={Link} to="/users">
        Users
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Menu