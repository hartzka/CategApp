const defaultRouter = require('express').Router()
const path = require('path')

defaultRouter.get('/users', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

defaultRouter.get('*', function(req, res) {
  res.redirect('/')
})

module.exports = defaultRouter