const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')

const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find().select('name')

  if (groups.length === 0) {
    res.status(404)
    throw new Error('no groups found')
  }
  res.status(200).json(groups)
})


const createGroup = asyncHandler(async (req, res) => {
  const { parentId, name } = req.body
  parent = parentId ? await Group.findById(parentId) : null

  // verify if group already exists
  if (await Group.findOne({name, parent})) {
    throw new Error('group already exists')
  }
  // create and save group
  const groupObj = new Group({
    name,
    parent
  })

  await groupObj.save()
  res.status(201).json(groupObj)
})

const updateGroup = asyncHandler(async (req, res) => {
  const { user, text, tags } = req.body
  const groupID = req.params.id

  // search for the group

  const group = Group.findById(groupID)

  if (!group) {
    res.status(400)
    throw new Error('Group doesn\'t exist')
  }

  // search if group matches the user

  if (group._id === user._id || !user.groups.includes('admin')) {
    res.status(401)
    throw new Error('Unauthorized, you can\'t change this group')
  }

  // updating the group

  group.text = text || group.text
  group.tags = tags || group.tags

  await group.save()

  res.status(200).json(group)
})

const deleteGroup = asyncHandler(async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { user, text, tags } = req.body
  const groupID = req.params.id

  // search for the group

  const group = Group.findOne(groupID)

  if (!group) {
    res.status(400)
    throw new Error('Group doesn\'t exist')
  }

  // search if group matches the user

  if (group._id === user._id || !user.groups.includes('admin')) {
    res.status(401)
    throw new Error('Unauthorized, you can\'t change this group')
  }

  // deleting the group

  await group.remove()

  res.status(200).json({ id: group._id })
})
module.exports = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup
}
