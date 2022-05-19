const mongoose = require('mongoose')

const forumSchema = mongoose.Schema({
  title : {
    type: String,
    maxlength: 70,
    required : true
  },
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
  views : {
    type : Number,
    required : true,
    default : 0
  },
  up_votes : {
    amount : {
      type : Number,
      required : true,
      default : 0
    },
    users : [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default : []
    }]
  },
  down_votes : {
    amount : {
      type : Number,
      required : true,
      default : 0
    },
    users : [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default : []
    }]
  },
  comments : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'Comment',
    required : false
  }],
}, { timestamps: true })

module.exports = mongoose.model('Forum', forumSchema)
