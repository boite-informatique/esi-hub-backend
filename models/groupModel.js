const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength : [32, 'Name must not exceed 32 characters']
  },
  path : {
    type : String,
    required : true,
    default : '/'
  }
})

module.exports = mongoose.model('Group', groupSchema)
