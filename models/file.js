const mongoose = require('mongoose')

const announcementUserSchema = new mongoose.Schema({

  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },

  filename : {
    type : String,
    required : true
  },

  path : {
    type : String,
    required : true
  },

  mimetype : {
    type : String,
    required : true
  },

  size : {
    type : Number,
    required : true
  }
}, { timestamps: true })

module.exports = mongoose.model('File', announcementUserSchema)
