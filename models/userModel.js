const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    roles : {
        type : Array,
        required: true,
        default : ['student']
    }
    
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema);