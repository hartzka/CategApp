import React from 'react'
import { Link } from 'react-router-dom'
import DefaultImg from '../assets/default-img.jpg'
import StarRatingComponent from 'react-star-rating-component'

const Categ = ({ categ, handleDeleteClick, user, editStars }) => {
  const onStarClick = (nextValue, prevValue, name) => {
    categ.stars=nextValue
    editStars(categ)
  }
  return (
    <div>
      <h4>{categ.name}</h4>
      <Link to={`/categ/${categ.id}`}>
        <img alt = '' src={categ.image !== undefined ? `${categ.image.imageData}` : `${DefaultImg}`} className='process__image' />
      </Link>
      <StarRatingComponent
        name='rate1'
        starCount={5}
        value={categ.stars}
        onStarClick={onStarClick}
      />
      <form>
        {user !== undefined && categ.user !== undefined && user.username === categ.user.username &&
          <button className='btn btn-danger' onClick={() =>
            handleDeleteClick(categ)}>
            Delete
          </button>
        }
      </form>
    </div>
  )
}

export default Categ
