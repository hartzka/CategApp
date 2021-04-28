import React from 'react'
import { Link } from 'react-router-dom'

const CategView = ({ id, categs, editCategForm, initializeFields }) => {

  const categ = categs.filter(b => b.id === id)[0]

  return (
    <div>
      {categ.name !== null &&
        <div>
          {categ.subCateg !== '' && <h3>{categ.mainCateg}, {categ.subCateg}</h3>}
          {categ.subCateg === '' && <h3>{categ.mainCateg}</h3>}
          <h4>{categ.name}</h4>
          <p>{categ.description}</p>
          {categ.stars === 0 && <p>unrated</p>}
          {categ.stars === 1 && <p>{categ.stars} star</p>}
          {categ.stars > 1 && <p>{categ.stars} stars</p>}
          <img src={categ.image !== undefined ? `${categ.image.imageData}` : ''} alt='' />
          <div>
            {editCategForm(id)}
          </div>
          <Link to={'/'}><button onClick={initializeFields} class='btn btn-warning'>Back</button></Link>
        </div>
      }
    </div>
  )
}


export default CategView