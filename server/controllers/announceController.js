const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Announcement = require('../models/announcement/announceModel')
const Announcement_User = require('../models/announcement/announcement_user')

const getAnnouncementAll = asyncHandler(async (req, res) => {
  let {tags, limit} = req.query
  let announcements
  if (tags) {
    tags = tags.split(',')
    announcements = await Announcement.find({
      tags : {$elemMatch : {$in : tags}},
      $or : [
        {visibility : []},
        {user : req.user.id},
        {visibility : {$elemMatch : {$in : req.user.groups}}}
      ]
    })
    .limit(limit)
    .populate('user', 'name avatar')
//     .cursor()
//     .eachAsync(async (doc) => {
//       const read = await Announcement_User.findOne({user : req.user.id, announcement : doc})
//       doc.read = read ? true : false
//     })
  } else {
    announcements = await Announcement.find({
      $or : [
        {visibility : []},
        {user : req.user.id},
        {visibility : {$elemMatch : {$in : req.user.groups}}}
      ]
    })
    .limit(limit)
    .populate('user', 'name avatar')
//     .cursor()
//     .eachAsync(async (doc) => {
//       const read = await Announcement_User.findOne({user : req.user.id, announcement : doc})
//       doc.read = read ? true : false
//     })

  }
  if (!announcements || announcements.length === 0) {
    res.status(404)
    throw new Error('Announcement(s) not found')
  }
  res.status(200).json(announcements)
})

const getAnnouncementId = asyncHandler(async (req, res) => {

  const announcement = await Announcement.findOne({
    _id : req.params.id,
    $or : [
      {visibility : []},
      {user : req.user._id},
      {visibility : {$elemMatch : {$in : req.user.groups}}}
    ]
  }).populate('user','name avatar')

  if (!announcement) {
    res.status(404)
    throw new Error('Announcement not found')
  }

  // read status
  const read = await Announcement_User.findOne({user : req.user.id, announcement})
  announcement.read = read ? true : false

  res.status(200).json(announcement)
})

const createAnnouncement = asyncHandler(async (req, res) => {
  const {body} = req

  // create and save announcement
  const announcementObj = new Announcement(body)
  announcementObj.user = req.user.id

  await announcementObj.save()
  res.status(201).json(announcementObj)
})

const updateAnnouncement = asyncHandler(async (req, res) => {
  const {body} = req

  // search for the announcement

  const announcement = await Announcement.findById(req.params.id).populate('user', '_id')

  if (!announcement) {
    res.status(400)
    throw new Error('Announcement doesn\'t exist')
  }

  // search if announcement matches the user

  if (announcement.user._id === req.user._id || req.admin) {
    res.status(401)
    throw new Error('Unauthorized, you can\'t change this announcement')
  }

  // updating the announcement

  await announcement.update(body)

  res.status(200).json(announcement)
})

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id).populate('user', '_id')

  if (!announcement) {
    res.status(400)
    throw new Error('Announcement doesn\'t exist')
  }

  // search if announcement matches the user

  if (announcement.user._id === req.user._id || req.admin) {
    res.status(401)
    throw new Error('Unauthorized, you can\'t change this announcement')
  }

  // deleting the announcement

  await announcement.remove()

  res.status(200).json({ id: announcement._id })
})


const markAsRead = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findOne({
    _id : req.params.id,
    $or : [
      {visibility : []},
      {user : req.user._id},
      {visibility : {$elemMatch : {$in : req.user.groups}}}
    ]
  })

  if (!announcement) {
    res.status(400)
    throw new Error('Announcement doesn\'t exist')
  }

  // search if announcement is already read

  const read = await Announcement_User.findOne({user : req.user.id, announcement : announcement})

  // mark as read or unread
  // req.query.read specifies if announcement is marked to be read or not

  if (req.query.read === 'true') {
    if (!read) {
      const read = await Announcement_User.create({
        announcement,
        user : req.user.id
      })

      res.status(200)
      res.json(read)
    } else {
      res.status(200)
      res.json(read)
    }
  } else {
    if (read) {
      await Announcement_User.deleteOne(read)
      res.status(200)
      res.json(read)
    } else {
      res.status(200)
      res.json(null)
    }
  }

  await announcement.remove()

  res.status(200).json({ id: announcement._id })
})

module.exports = {
  getAnnouncementAll,
  getAnnouncementId,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  markAsRead
}
