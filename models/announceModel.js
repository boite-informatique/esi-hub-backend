const mongoose = require('mongoose')

const announceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true,
    default: null
  },
  visibility: {
    type: Array,
    required: true,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announceSchema)
