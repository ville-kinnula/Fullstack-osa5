import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FilledInput, InputLabel, Button } from '@material-ui/core'



const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        <FormControl variant='filled'>
          <InputLabel htmlFor="username-field">Username</InputLabel>
          <FilledInput id="username-field" value={username} onChange={handleUsernameChange} />
        </FormControl>
        <div></div>
        <FormControl variant='filled'>
          <InputLabel htmlFor="password-field">Password</InputLabel>
          <FilledInput id="password-field" value={password} onChange={handlePasswordChange} type='password' />
        </FormControl>
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  </div>
  )
}


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm