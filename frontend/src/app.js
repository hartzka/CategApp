import React, { useState, useEffect } from 'react'
import Categ from './components/Categ'
import Notification from './components/Notification'
import categService from './services/categs'
import loginService from './services/login'
import userService from './services/users'
import imageService from './services/images'
import MainCategForm from './components/MainCategForm'
import SubCategForm from './components/SubCategForm'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import DefaultImg from './assets/default-img.jpg'
import LoginForm from './components/LoginForm'

const App = () => {
  const [categs, setCategs] = useState([])
  const [newDescription, setNewDescription] = useState('')
  const [newName, setNewName] = useState('')
  const [newMainCateg, setNewMainCateg] = useState('')
  const [newSubCateg, setNewSubCateg] = useState('')
  const [selectedCateg, setSelectedCateg] = useState({ mainCateg: '', id: 0 })
  const [selectedNewSubCateg, setSelectedNewSubCateg] = useState('')
  const [selectedSubCateg, setSelectedSubCateg] = useState('Show all')
  const [newImage, setNewImage] = useState({ multerImage: DefaultImg })
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const mainCategFormRef = React.createRef()
  const subCategFormRef = React.createRef()
  const categRef = React.createRef()
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
      imageService.setToken(user.token)
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
      imageService.setToken(user.token)
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
    imageService.setToken('')
    handleSelectedCategChange(0)
    setCategs([])
    initializeFields()
  }

  const getSubCategories = (includeShowAll) => {
    let set = new Set()
    if (includeShowAll) {
      set.add('Show all')
    }
    categs.forEach(function(c) {
      if (c.mainCateg === selectedCateg.mainCateg && c.user.username === user.username && c.subCateg !== '') {
        set.add(c.subCateg)
      }
    })
    let array = Array.from(set)
    return array
  }

  const mainCategForm = () => {
    if (selectedCateg.mainCateg === '' && categs.length > 0) {
      categs.forEach(c => {
        if (c.user.username === user.username && c.isMainCateg === true) {
          handleSelectedCategChange(c.id)
        }
      })
    } else if (categs.length === 0 && selectedCateg.mainCateg !== '') {
      handleSelectedCategChange(0)
    }
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

  const subCategForm = () => {
    let subCategories = getSubCategories(false)
    return (
      <Togglable buttonLabel='New item' cancelLabel='Cancel' initializeFields={initializeFields} ref={subCategFormRef}>
        <SubCategForm
          addSubCateg={addSubCateg}
          newSubCateg={newSubCateg}
          handleSubCategChange={handleSubCategChange}
          newName={newName}
          handleNameChange={handleNameChange}
          newDescription={newDescription}
          handleDescriptionChange={handleDescriptionChange}
          newImage={newImage}
          handleImageChange={handleImageChange}
          selectedNewSubCateg={selectedNewSubCateg}
          handleSelectedNewSubCategChange={handleSelectedNewSubCategChange}
          subCategories={subCategories}
          title={'Add new item'}
          selectedCateg={selectedCateg}
        />
      </Togglable>
    )
  }

  const initializeFields = () => {
    setSelectedNewSubCateg('')
    setNewMainCateg('')
    setNewSubCateg('')
    setNewDescription('')
    setNewName('')
    setDefaultImage()
  }

  const handleSelectedCategChange = (id) => {
    if (id === 0) {
      setSelectedCateg({ id: 0, mainCateg: '' })
    } else {
      let selected = categs.find(c => c.id === id)
      if (selected !== undefined) {
        setSelectedCateg(selected)
      } else {
        setSelectedCateg({ id: 0, mainCateg: '' })
      }
      setSelectedSubCateg('Show all')
    }
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
        if (selectedCateg.mainCateg === '') {
          handleSelectedCategChange(returnedCateg.id)
        }
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

  const addSubCateg = (event) => {
    event.preventDefault()
    const subCateg = newSubCateg === '' ? selectedNewSubCateg : newSubCateg
    const subCategObject = {
      mainCateg: selectedCateg.mainCateg,
      subCateg: subCateg,
      name: newName,
      description: newDescription,
      isMainCateg: false,
      id: categs.length + 1,
    }
    subCategObject.user=user
    subCategObject.image=newImage.imageObject

    categService
      .create(subCategObject)
      .then(returnedCateg => {
        setCategs(categs.concat(returnedCateg))
        const newMessage = {
          type: 'success',
          text: `New item ${newName} created`
        }
        setMessage(newMessage)
      }).catch(error => {
        const newMessage = {
          type: 'error',
          text: 'error creating item, name must not be empty and image in correct format'
        }
        setMessage(newMessage)
      })
    subCategFormRef.current.toggleVisibility()
    setTimeout(() => { setMessage(null) }, 4000)
    setDefaultImage()
    setNewSubCateg('')
    setSelectedNewSubCateg('')
    setNewName('')
    setNewDescription('')
  }

  const handleMainCategChange = (event) => {
    setNewMainCateg(event.target.value)
    setSelectedSubCateg('Show all')
  }

  const handleSubCategChange = (event) => {
    setSelectedNewSubCateg('')
    setNewSubCateg(event.target.value)
  }

  const handleSelectedNewSubCategChange = (e) => {
    setSelectedNewSubCateg(e)
    setNewSubCateg('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }

  const handleImageChange = (e) => {
    const imageFormObj = new FormData()

    imageFormObj.append('imageName', 'multer-image-' + Date.now())
    imageFormObj.append('imageData', e.target.files[0])

    const multerImage = URL.createObjectURL(e.target.files[0])
    imageFormObj.append('multerImage', multerImage)

    imageService.create(imageFormObj)
      .then((data) => {
        setNewImage({
          multerImage: multerImage,
          imageObject: { id: data.id, imageData: data.imageData, imageName: data.imageName }
        })
        if (data) {
          alert('Image has been successfully uploaded')
        }
      })
      .catch((err) => {
        alert('Error while uploading image')
        console.log(err)
        setDefaultImage()
      })
  }

  const setDefaultImage = () => {
    setNewImage({
      multerImage: DefaultImg
    })
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
                <p>{mainCategForm()} {selectedCateg.mainCateg !== '' && subCategForm()}</p>
                <div>
                  {categs.map(categ =>
                    categ.isMainCateg === false &&
                    categ.mainCateg === selectedCateg.mainCateg &&
                    (selectedSubCateg === 'Show all' || selectedSubCateg === categ.subCateg) &&
                    <div className="categ">
                      <Categ key={categ.id} categ={categ} />
                    </div>
                  )}
                </div>
              </div>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App