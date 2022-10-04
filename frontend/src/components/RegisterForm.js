import React from 'react'
import { TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

const RegisterForm = ({
  handleRegister,
  registerUsername,
  setRegisterUsername,
  registerName,
  setRegisterName,
  registerPassword,
  setRegisterPassword
}) => (
  <div class='login-container'>
    <h2>Register a new user</h2>
    <form onSubmit={handleRegister}>
      <div>
        <TextField
          label='name'
          id='register-name'
          type='text'
          value={registerName}
          name='Name'
          onChange={({ target }) => setRegisterName(target.value)}
        />
        {registerName.length > 0 && registerName.length < 3 && <p className='error'>Min length 3</p>}
      </div>
      <div>
        <TextField
          label='username'
          id='register-username'
          type='text'
          value={registerUsername}
          name='Username'
          onChange={({ target }) => setRegisterUsername(target.value)}
        />
        {registerUsername.length > 0 && registerUsername.length < 3 && <p className='error'>Min length 3</p>}
      </div>
      <div>
        <TextField
          label='password'
          id='register-password'
          type='password'
          value={registerPassword}
          name='Password'
          onChange={({ target }) => setRegisterPassword(target.value)}
        />
        {registerPassword.length > 0 && registerPassword.length < 3 && <p className='error'>Min length 3</p>}
      </div>
      <button type='submit' class='btn btn-success' disabled={[registerName, registerUsername, registerPassword].find(v => v.length < 3) !== undefined} id='register-button'>Register</button>
    </form>
    <Link to={'/'}>Back</Link>
  </div>
)

export default RegisterForm