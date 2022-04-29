const mongoose = require('mongoose')

const announceSchema = new mongoose.Schema({
  title : {
    type: String,
    required : true
  },
  body: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  visibility: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
    required: true,
    default: []
  },
  attachments : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'File',
    required : false,
    max : 8
  }]
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announceSchema)
