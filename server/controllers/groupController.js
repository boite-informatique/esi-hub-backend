const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')

const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find().select('name path')

  if (groups.length === 0) {
    res.status(404)
    throw new Error('no groups found')
  }
  res.status(200).json(groups)
})


const createGroup = asyncHandler(async (req, res) => {

  // verify if group already exists
  if (await Group.findOne(req.body)) {
    throw new Error('group already exists')
  }

  // create and save group
  const groupObj = new Group(req.body)

  await groupObj.save()
  res.status(201).json(groupObj)
})

const getGroupsCustom = asyncHandler(async (req, res) => {

  // search for group
  const group = await Group.findOne({name : req.params.name})

  if (!group) {
    res.status(404)
    throw new Error('group doesnt exist')
  }

  let groups;
  // handle search query based on request
  switch(req.query.type) {
    case 'allChildren' : {
      groups = await Group.find({path : new RegExp(`${group.path}${group.name},\w*`)})
      break
    }

    case 'immediateChildren' : {
     groups = await Group.find({path :`${group.path}${group.name},`})
      break
    }

    case 'parents' : {
      const parents = group.path.split(',')
      groups = await Group.find({name : {$in : parents}})
      break
    }

    default : {
      groups = group
      break
    }
  }

  if (groups.length === 0) {
    res.status(404)
    throw new Error('no groups found')
  }
  res.status(200).json(groups)
})

module.exports = {
  getGroups,
  createGroup,
  getGroupsCustom
}
