const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  categs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categ'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User