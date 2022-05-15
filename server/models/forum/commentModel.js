const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    maxlength: 2000,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  attachments : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'File',
    required : false,
    max : [5, 'too much files for this forum']
  }],
  up_votes : {
      type : Number,
      required : true,
      default : 0
  },
  down_votes : {
    type : Number,
    required : true,
    default : 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)
