const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
  name : {
    type: String,
    required : true
  },

  description : {
    type : String,
    required : false
  },

  status : {
    type : String,
    required : true,
    enum : ["Planned", "In progess", "Done"]
  },

  userInCharge : {
    // show user who is doing the task, or who finished it
    type : Schema.Types.ObjectId,
    ref : 'User',
  },

  workspace : {
    type : Schema.Types.ObjectId,
    ref : 'Workspace',
    required : true
  }
}, {timestamps : true})

module.exports = model('Task', taskSchema)