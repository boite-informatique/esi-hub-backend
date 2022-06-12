const mongoose = require('mongoose')

// collection to store user's read status of announcements
// existance of document => user has read announcement

const announcementUserSchema = new mongoose.Schema({
  announcement : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Announcement',
    required : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
}, { timestamps: true })

module.exports = mongoose.model('Announcement_User', announcementUserSchema)
