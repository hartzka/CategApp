const imageRouter = require('express').Router()
const Image = require('../models/image')
const multer = require('multer')
const s3 = require('./s3')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

imageRouter.get('/', async (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const images = await Image.find({}).populate('categ', {
    mainCateg: 1, subCateg: 1, description: 1, stars: 1, name: 1
  })
  response.json(images.map(i => i.toJSON()))
})

imageRouter.get('/:id', async (request, response) => {
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const image = await Image.findById(request.params.id)
  if (image) {
    response.json(image.toJSON())
  } else {
    response.status(404).end()
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  fileFilter: fileFilter
})

imageRouter.route('/uploadmulter')
  .post(upload.single('imageData'), async (req, res, next) => {
    try {
      const image = new Image({
      imageName: req.body.imageName,
      imageData: `https://${process.env.S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${req.file.path}`,
      multerImage: req.body.multerImage
    });
    const newImage = await image.save()
    s3.uploadFile(req.file.path)
    res.json(newImage)
    } catch (exception) {
      next(exception)
    }
})

module.exports = imageRouter