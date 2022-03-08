const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
  
}, { timestamps: true })

module.exports = mongoose.model('Message', announceSchema)
