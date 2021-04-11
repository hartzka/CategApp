import React from 'react'
import DefaultImg from '../assets/default-img.jpg'

const Categ = ({ categ, handleDeleteClick, user }) => {
  
  return (
    <div>
      <h4>{categ.name}</h4>
        <img src={categ.image !== undefined ? `${categ.image.imageData}` : `${DefaultImg}`} className="process__image" />
      <form>
        {user !== undefined && categ.user !== undefined && user.username === categ.user.username &&
        <button class="btn btn-danger" onClick={() =>
          handleDeleteClick(categ)}>
          Delete
        </button>
        }
      </form>
    </div>
  )
}

export default Categ