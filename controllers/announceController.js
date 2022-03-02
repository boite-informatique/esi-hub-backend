const asyncHandler = require('express-async-handler')
// eslint-disable-next-line no-unused-vars
const User = require('../models/userModel')
const Announcement = require('../models/announceModel')

const getAnnouncementAll = asyncHandler(async (req, res) => {
  // TODO comply with announcement visibility
  let params = req.query.tags
  let announcements
  if (params) {
    params = params.split(',')
    announcements = await Announcement.find({ tags: { $in: params } })
  } else {
    announcements = await Announcement.find()
  }

  if (announcements.length === 0) {
    res.status(404)
    throw new Error('Announcement(s) not found')
  }
  res.status(200).json(announcements)
})

const getAnnouncementId = asyncHandler(async (req, res) => {
  // TODO comply with announcement visibility

  const announcement = await Announcement.findById(req.params.id)

  if (!announcement) {
    res.status(404)
    throw new Error('Announcement not found')
  }

  res.status(200).json(announcement)
})

const createAnnouncement = asyncHandler(async (req, res) => {
  const { userId, text, tags } = req.body

  // create and save announcement
  const announcementObj = await Announcement.create({
    user: userId,
    text,
    tags
  })

  res.status(201).json(announcementObj)
})

const updateAnnouncement = asyncHandler(async (req, res) => {
  const { user, text, tags } = req.body
  const announcementID = req.params.id

  // search for the announcement

  const announcement = Announcement.findById(announcementID)

  if (!announcement) {
    res.status(400)
    throw new Error('Announcement doesn\'t exist')
  }

  // search if announcement matches the user

  if (announcement._id === user._id || !user.roles.includes('admin')) {
    res.status(401)
    throw new Error('Unauthorized, you can\'t change this announcement')
  }

  // updating the announcement

  announcement.text = text || announcement.text
  announcement.tags = tags || announcement.tags

  await announcement.save()

  res.status(200).json(announcement)
})

const deleteAnnouncement = asyncHandler(async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { user, text, tags } = req.body
  const announcementID = req.params.id

  // search for the announcement

  const announcement = Announcement.findOne(announcementID)

  if (!announcement) {
    res.status(400)
    throw new Error('Announcement doesn\'t exist')
  }

  // search if announcement matches the user

  if (announcement._id === user._id || !user.roles.includes('admin')) {
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
