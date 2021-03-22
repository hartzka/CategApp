import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import categService from './services/categs'
import loginService from './services/login'
import userService from './services/users'
import Menu from './components/Menu'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import LoginForm from './components/LoginForm'

const App = () => {
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      categService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      categService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const newMessage = {
        type: 'success',
        text: `Welcome, ${username}`
      }
      setMessage(newMessage)
      setTimeout(() => { setMessage(null) }, 4000)
    } catch (exception) {
      const newMessage = {
        type: 'error',
        text: 'Wrong credentials'
      }
      setMessage(newMessage)
      setTimeout(() => { setMessage(null) }, 4000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    categService.setToken('')
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  )

  return (
    <div>
      <Router>
        <Menu user={user} handleLogout={handleLogout} />
        <Notification message={message} />
        <Switch>
          <Route path="/users">
            <Users users={users}/>
          </Route>
          <Route path="/">
            {user === null ?
              loginForm() :
              <div>
                <p>Welcome!</p>
              </div>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App