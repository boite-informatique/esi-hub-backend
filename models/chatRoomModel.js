const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  visibility: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Roles'
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema)
