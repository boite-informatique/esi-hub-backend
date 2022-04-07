const {Schema, Model} = require('mongoose')

const workspaceSchema = new Schema({
  name : {
    type: String,
    required : true
  },

  description : {
    type : String,
    required : false
  },

  members : {
    type : [{
      type : Schema.Types.ObjectId,
      ref : true,
      required : true
    }],
    required : true
  }
})

module.exports = Model('Workspace', workspaceSchema)