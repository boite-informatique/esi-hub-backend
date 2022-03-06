const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref : 'Group'
  }

})

module.exports = mongoose.model('User', userSchema)
