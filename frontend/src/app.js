import React, { useState, useEffect } from 'react'
import Categ from './components/Categ'
import Notification from './components/Notification'
import categService from './services/categs'
import loginService from './services/login'
import userService from './services/users'
import MainCategForm from './components/MainCategForm'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import LoginForm from './components/LoginForm'

const App = () => {
  const [categs, setCategs] = useState([])
  const [newMainCateg, setNewMainCateg] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const mainCategFormRef = React.createRef()
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    categService.getAll().then(categs =>
      setCategs(categs.sort(function(a,b) {
        return b.stars-a.stars
      })))
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
    setCategs([])
    initializeFields()
  }

  const handleMainCategChange = (event) => {
    setNewMainCateg(event.target.value)
  }

  const mainCategForm = () => {
    return (
      <Togglable buttonLabel='New category' cancelLabel='Cancel' initializeFields={initializeFields} ref={mainCategFormRef}>
        <MainCategForm
          addMainCateg={addMainCateg}
          newMainCateg={newMainCateg}
          handleMainCategChange={handleMainCategChange}
        />
      </Togglable>
    )
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

  const initializeFields = () => {
    setNewMainCateg('')
  }

  const addMainCateg = (event) => {
    event.preventDefault()
    const mainCategObject = {
      mainCateg: newMainCateg,
      name: '',
      isMainCateg: true,
      id: categs.length + 1,
    }
    mainCategObject.user=user
    categService
      .create(mainCategObject)
      .then(returnedCateg => {
        setCategs(categs.concat(returnedCateg))
        const newMessage = {
          type: 'success',
          text: `New category ${newMainCateg} created`
        }
        setMessage(newMessage)
      }).catch(error => {
        const newMessage = {
          type: 'error',
          text: 'error creating category, name must not be empty'
        }
        setMessage(newMessage)
      })
    mainCategFormRef.current.toggleVisibility()
    setTimeout(() => { setMessage(null) }, 4000)
    setNewMainCateg('')
  }

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
                <p>{mainCategForm()}</p>
              </div>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App