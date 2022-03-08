const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  participantGroups: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Group'
  }
}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema)
