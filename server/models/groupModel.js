const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path : {
    type : String,
    required : true,
    default : '/'
  }
})

module.exports = mongoose.model('Group', groupSchema)
