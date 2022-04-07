const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')

const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find().select('name path').sort({path : -1})

  if (groups.length === 0) {
    res.status(404)
    throw new Error('no groups found')
  }

  const trasnformed = groupTransform(groups)
  res.status(200).json(trasnformed)
})


const createGroup = asyncHandler(async (req, res) => {

  // verify if group already exists
  if (await Group.findOne(req.body)) {
    res.status(400)
    throw new Error('group already exists')
  }

  // verify if parent exists
  // unfinished
  let groupObj
  if (req.body.parent) {
    const parent = Group.findById(req.body.parent)
    if (!parent) {
      res.status(404)
      throw new Error('Group parent doesn\'t exist')
    } 

    groupObj = new Group({name : req.body.name, path : parent.path + parent.name + '/'})
    
  } else {
    groupObj = new Group({name : req.body.name, path : '/'})
  }

  // create and save group
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
      groups = await Group.find({path : new RegExp(`${group.path}${group.name}/\w*`)})
      break
    }

    case 'immediateChildren' : {
     groups = await Group.find({path :`${group.path}${group.name}/`})
      break
    }

    case 'parents' : {
      const parents = group.path.split('/')
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

const groupTransform = (arr) => {
  let childrenMap = new Map()
  let path
    while(arr.length !== 0) {
        path = arr[0].path
        let i = 0
        let children = []
        while(arr.length > i && arr[i].path === path) {
          let child = {
            _id : arr[i]._id,
            name : arr[i].name
          }
  
          if (childrenMap.has(`${path}${child.name}/`)) {
            child.children = childrenMap.get(`${path}${child.name}/`)
            childrenMap.delete(`${path}${child.name}/`)
          }
  
          children.push(child)
          i++
        }
        childrenMap.set(path, children)
        arr.splice(0,i)
  }
  return childrenMap.get('/')
}

module.exports = {
  getGroups,
  createGroup,
  getGroupsCustom
}
