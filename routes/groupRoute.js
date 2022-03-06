const router = require('express').Router()
const {
  getGroups,
  createGroup
} = require('../controllers/groupController')

router.get('/', getGroups)
router.post('/', createGroup)
module.exports = router