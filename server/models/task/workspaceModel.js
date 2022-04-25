const {Schema, model} = require('mongoose')

const workspaceSchema = new Schema({
  name : {
    type: String,
    required : true
  },

  description : {
    type : String,
    required : false
  },

  members : [{
    type : Schema.Types.ObjectId,
    ref : 'Task',
    required : true
  }]
})

module.exports = model('Workspace', workspaceSchema)