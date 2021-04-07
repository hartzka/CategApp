import React from 'react'
const CategDetails = ({ categ }) => (
  <div>
    <p>{categ.description}</p>
    <p>stars: {categ.stars}</p>
  </div>
)

export default CategDetails