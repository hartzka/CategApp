import React from 'react'

const ImageView = ({ id, categs }) => {

  const categ = categs.filter(c => c.id === id)[0]
  const img = categ.image.imageData

  return (
    <img src={img ? `${img}` : ''} id='scaled-image' alt='' />
  )
}


export default ImageView