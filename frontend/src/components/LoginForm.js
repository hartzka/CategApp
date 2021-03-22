import React from 'react'
import { TextField } from '@material-ui/core'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <TextField label="username"
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField label="password"
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" class="btn btn-success" id="login-button">login</button>
    </form>
  </div>
)

export default LoginForm