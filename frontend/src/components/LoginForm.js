import React from 'react'
import { TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => (
  <div class='login-container'>
    <h2>Log in to Application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label='username'
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label='password'
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' class='btn btn-success' id='login-button'>Login</button>
    </form>
    <Link to={'/register'}>Register</Link>
  </div>
)

export default LoginForm