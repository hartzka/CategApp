const categRouter = require('express').Router()
const Categ = require('../models/categ')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

categRouter.get('/', async (request, response) => {
  const categs = await Categ.find({})
  .populate('user', { username: 1, name: 1 })
  response.json(categs.map(categ => categ.toJSON()))
})

categRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (!body.mainCateg || body.mainCateg === '') {
    return response.status(400).send({ error: 'category1 missing' })
  }

  if (!body.isMainCateg && body.name === '') {
    return response.status(400).send({ error: 'name is empty' })
  }

  const user = await User.findById(decodedToken.id)

  const categ = new Categ({
    mainCateg: body.mainCateg,
    subCateg: body.subCateg === undefined ? '' : body.subCateg,
    isMainCateg: body.isMainCateg,
    name: body.name === undefined ? '' : body.name,
    description: body.description === undefined ? '' : body.description,
    stars: body.stars === undefined ? 0 : body.stars,
    user: user._id
  })

  const savedCateg = await categ.save()
  user.categs = user.categs.concat(savedCateg._id)
  await user.save()
  const categToBeReturned = await Categ.findById(savedCateg.id)
  .populate('user', { username: 1, name: 1 })
  response.json(categToBeReturned.toJSON())
})

module.exports = categRouter