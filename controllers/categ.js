const categRouter = require('express').Router()
const Categ = require('../models/categ')

categRouter.get('/', async (request, response) => {
  const categs = await Categ.find({})
  .populate('user', { username: 1, name: 1 })
  response.json(categs.map(categ => categ.toJSON()))
})

module.exports = categRouter