import React from 'react'
import Categ from './Categ'
import CategDetails from './CategDetails'
import Togglable from './Togglable'

const MainPage = ({
  mainCategForm, selectedCateg, subCategForm,
  categDropDown, subCategDropDown, categs, selectedSubCateg,
  handleDeleteClick, user, editStars,
  initializeFields, categRef
}) => {
  return (
    <div>
      <p>{mainCategForm()} {selectedCateg.mainCateg !== '' && subCategForm()}</p>
      <div className='webkit-box'>
        {selectedCateg.mainCateg !== '' && categDropDown()} {selectedCateg.mainCateg !== '' && subCategDropDown()}
      </div>
      <br></br>
      <div>
        {categs.map(categ =>
          categ.isMainCateg === false &&
          categ.mainCateg === selectedCateg.mainCateg &&
          (selectedSubCateg === 'Show all' || selectedSubCateg === categ.subCateg) &&
          categ.user.id === user.id &&
          <div className='categ'>
            <Categ key={categ.id} categ={categ} handleDeleteClick={handleDeleteClick} user={user} editStars={editStars} />
            <Togglable buttonLabel='View' cancelLabel='Hide' initializeFields={initializeFields} className='view' ref={categRef}>
              <CategDetails key={categ.id} categ={categ} />
            </Togglable>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainPage