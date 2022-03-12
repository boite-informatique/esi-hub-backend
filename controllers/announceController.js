const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Announcement = require('../models/announceModel')

const getAnnouncementAll = asyncHandler(async (req, res) => {

  let {tags} = req.query
  let announcements
  if (tags) {
    tags = tags.split(',')
    announcements = await Announcement.find({
      tags : {$in : tags},
      $or : [
        {visibility : []},
        {user : req.user._id},
        {visibility : {$elemMatch : {$in : req.user.groups}}}
      ]
    })
  } else {
    announcements = await Announcement.find({
      $or : [
        {visibility : []},
        {user : req.user._id},
        {visibility : {$elemMatch : {$in : req.user.groups}}}
      ]
    })
  }

  if (announcements.length === 0) {
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
  })

  if (!announcement) {
    res.status(404)
    throw new Error('Announcement not found')
  }

  res.status(200).json(announcement)
})

const createAnnouncement = asyncHandler(async (req, res) => {
  const {body} = req

  // create and save announcement
  const announcementObj = new Announcement(body)
  announcementObj.user = req.user._id

  await announcementObj.save()
  res.status(201).json(announcementObj)
})

const updateAnnouncement = asyncHandler(async (req, res) => {
  const {body} = req

  // search for the announcement

  const announcement = Announcement.findById(req.params.id).populate('user', '_id')

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
  const announcement = Announcement.findById(req.params.id).populate('user', '_id')

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
module.exports = {
  getAnnouncementAll,
  getAnnouncementId,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
}
