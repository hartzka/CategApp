import React from 'react'
import DefaultImg from '../assets/default-img.jpg'

const Categ = ({ categ }) => {
  
  return (
    <div>
      <h4>{categ.name}</h4>
        <img src={categ.image !== undefined ? `${categ.image.imageData}` : `${DefaultImg}`} className="process__image" />
    </div>
  )
}

export default Categ