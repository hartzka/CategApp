import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import categService from './services/categs'
import loginService from './services/login'
import userService from './services/users'
import imageService from './services/images'
import MainCategForm from './components/MainCategForm'
import SubCategForm from './components/SubCategForm'
import Togglable from './components/Togglable'
import CategView from './components/CategView'
import Menu from './components/Menu'
import Users from './components/Users'
import MainPage from './components/MainPage'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import DefaultImg from './assets/default-img.jpg'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import LoginForm from './components/LoginForm'

let timeoutID
let subCategDataSet = false

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
  const [categToUpdateId, setCategToUpdateId] = useState('')
  const mainCategFormRef = React.createRef()
  const subCategFormRef = React.createRef()
  const editCategFormRef = React.createRef()
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

  const setSubCategData = () => {
    if (!subCategDataSet) {
      subCategDataSet = true
      const categToUpdate = categs.find(categ => categ.id === categToUpdateId)
      if (categToUpdate !== undefined) {
        setSelectedNewSubCateg(categToUpdate.subCateg)
        setNewDescription(categToUpdate.description)
        setNewName(categToUpdate.name)
        if (categToUpdate.image) {
          setNewImage({
            multerImage: categToUpdate.image.imageData
          })
        } else {
          setDefaultImage()
        }
      }
    }
  }

  const editCategForm = (id) => {
    let subCategories = getSubCategories(false)
    setCategToUpdateId(id)
    return (
      <Togglable buttonLabel='Edit' cancelLabel='Cancel' initializeFields={initializeFields} setSubCategData={setSubCategData} ref={editCategFormRef}>
        <SubCategForm
          addSubCateg={editSubCateg}
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
          title={'Edit item'}
          selectedCateg={selectedCateg}
        />
      </Togglable>
    )
  }

  const mainPage = () => (
    <MainPage
      mainCategForm={mainCategForm}
      selectedCateg={selectedCateg}
      subCategForm={subCategForm}
      categDropDown={categDropDown}
      subCategDropDown={subCategDropDown}
      categs={categs}
      selectedSubCateg={selectedSubCateg}
      handleDeleteClick={handleDeleteClick}
      user={user}
      editStars={editStars}
      initializeFields={initializeFields}
      categRef={categRef}
    />
  )

  const initializeFields = () => {
    setSelectedNewSubCateg('')
    setNewMainCateg('')
    setNewSubCateg('')
    setNewDescription('')
    setNewName('')
    setDefaultImage()
    subCategDataSet = false
  }

  const categDropDown = () => (
    <div>
      <DropdownButton id='dropdown-basic-button' title={selectedCateg.mainCateg}
        onSelect={id =>
          handleSelectedCategChange(id)
        }
      >
        {categs.map(categ => (
          categ.isMainCateg === true && categ.user.username === user.username &&
          <Dropdown.Item eventKey={categ.id}>{categ.mainCateg}</Dropdown.Item>
        ))}
      </DropdownButton>
      {selectedCateg.mainCateg !== '' && <button className='btn btn-danger' onClick={() =>
        handleDeleteClick(selectedCateg)}>
        Delete category
      </button>
      }
    </div>
  )

  const subCategDropDown = () => (
    <DropdownButton id='dropdown-variants-Secondary' title={selectedSubCateg}
      onSelect={c =>
        handleSelectedSubCategChange(c)
      }
    >
      {getSubCategories(true).map(subCateg => (
        <Dropdown.Item eventKey={subCateg}>{subCateg}</Dropdown.Item>
      ))}
    </DropdownButton>
  )

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
      }).catch(e => {
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
      }).catch(e => {
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

  const editSubCateg = (event) => {
    event.preventDefault()
    const subCateg = newSubCateg === '' ? selectedNewSubCateg : newSubCateg
    const categToUpdate = categs.find(categ => categ.id === categToUpdateId)
    const updatedCateg = {
      stars: categToUpdate.stars,
      mainCateg: categToUpdate.mainCateg,
      subCateg: subCateg,
      name: newName,
      description: newDescription,
      isMainCateg: false
    }
    updatedCateg.image=newImage.imageObject
    categService.update(categToUpdateId, updatedCateg)
      .then(response => {
        setCategs(categs.map(categ => categ.id !== categToUpdateId ? categ : response))
        const newMessage = {
          type: 'success',
          text: `Category ${updatedCateg.name} updated`
        }
        setMessage(newMessage)
      }).catch(e => {
        const newMessage = {
          type: 'error',
          text: 'error updating item'
        }
        setMessage(newMessage)
      })
    clearTimeout(timeoutID)
    editCategFormRef.current.toggleVisibility()
    timeoutID = setTimeout(() => { setMessage(null) }, 4000)
    setDefaultImage()
    setNewSubCateg('')
    setSelectedNewSubCateg('')
    setNewName('')
    setNewDescription('')
    setCategToUpdateId('')
    subCategDataSet = false
  }

  const editStars = (categ) => {
    const id = categ.id
    const categToUpdate = categs.find(categ => categ.id === id)
    categToUpdate.stars = categ.stars
    categService.update(id, categToUpdate)
      .then(response => {
        setCategs(categs.map(categ => categ.id !== id ? categ : response))
      }).catch(error => {
        console.log(error.response.data)
      })
  }

  const handleDeleteClick = (categ) => {
    console.log('deleting', categ.id)
    const name = categ.name
    const mainCateg = categ.mainCateg
    if ((name === '' && (window.confirm(`Delete ${mainCateg}?`)))
    || (name !== '' && window.confirm(`Delete ${mainCateg}: ${name}?`)))
    {
      deleteCateg(categ)
    }
  }

  const deleteCateg = (categ) => {
    handleSelectedCategChange(0)
    categService.deleteCateg(categ.id)
      .then(e => {
        const newMessage = {
          type: 'success',
          text: 'Deleted succesfully'
        }
        setMessage(newMessage)
        if (categ.isMainCateg === true) {
          categs.forEach(c => {
            if (c.mainCateg === categ.mainCateg && c.user.username === user.username && c.isMainCateg === false) {
              categService.deleteCateg(c.id)
            }
          })
          const updatedCategs = categs.filter(c => (c.mainCateg !== categ.mainCateg && c.user.username === user.username) || (c.user.username !== user.username))
          setCategs(updatedCategs)
        } else {
          const updatedCategs = categs.filter(c => c.id !== categ.id)
          setCategs(updatedCategs)
        }
      }).then(e => {
        categs.forEach(c => {
          if (c.user.username === user.username && c.isMainCateg === true && c.id !== categ.id) {
            handleSelectedCategChange(c.id)
          }
        })
      }).catch(e => {
        const newMessage = {
          type: 'error',
          text: 'The item has already been removed from the server!'
        }
        setMessage(newMessage)
      })
    setTimeout(() => { setMessage(null) }, 4000)
  }

  const handleMainCategChange = (e) => {
    setNewMainCateg(e.target.value)
    setSelectedSubCateg('Show all')
  }

  const handleSubCategChange = (e) => {
    setSelectedNewSubCateg('')
    setNewSubCateg(e.target.value)
  }

  const handleSelectedSubCategChange = (e) => {
    setSelectedSubCateg(e)
  }

  const handleSelectedNewSubCategChange = (e) => {
    setSelectedNewSubCateg(e)
    setNewSubCateg('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value)
  }

  const handleImageChange = (e) => {
    const imageFormObj = new FormData()
    const multerImage = URL.createObjectURL(e.target.files[0])

    imageFormObj.append('imageName', 'multer-image-' + Date.now())
    imageFormObj.append('imageData', e.target.files[0])
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
          <Route path='/categ/:id' render={({ match }) =>
            <CategView id={match.params.id} categs={categs} initializeFields={initializeFields} editCategForm={editCategForm} />
          }>
          </Route>
          <Route path='/users'>
            {user && user.role === 'admin' ?
              <Users users={users} /> :
              <h2>Not authorized :(</h2>
            }
          </Route>
          <Route path='/'>
            {user === null ?
              loginForm() : mainPage()
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App