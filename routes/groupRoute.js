const router = require('express').Router()
const {
  getGroups,
  createGroup,
  getGroupsCustom
} = require('../controllers/groupController')

router.get('/', getGroups)
router.post('/', createGroup)
router.get('/:name', getGroupsCustom)
module.exports = router