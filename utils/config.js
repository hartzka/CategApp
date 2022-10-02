require('dotenv').config()

if (!process.env.MONGODB_URI)
  console.warn('.env.MONGODB_URI is not set')
if (!process.env.MONGODB_TEST_URI)
  console.warn('.env.MONGODB_TEST_URI is not set')
if (!process.env.SECRET)
  console.warn('.env.SECRET is not set')
if (!process.env.AWS_ACCESS_KEY_ID)
  console.warn('.env.AWS_ACCESS_KEY_ID is not set')
if (!process.env.AWS_SECRET_ACCESS_KEY)
  console.warn('.env.AWS_SECRET_ACCESS_KEY is not set')
if (!process.env.S3_BUCKET_NAME)
  console.warn('.env.S3_BUCKET_NAME is not set')

let PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}