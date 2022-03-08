const router = require('express').Router()
const {
  getAnnouncementAll,
  getAnnouncementId,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announceController')
const authorize = require('../middleware/authorize')
const dataValidator = require('../middleware/dataValidation')
const {createSchema, updateSchema} = require('../middleware/dataSchemas/announceSchemas')


router.use(authorize)
router.route('/').get(getAnnouncementAll).post(dataValidator(createSchema), createAnnouncement)
router.route('/:id').get(getAnnouncementId).put(dataValidator(updateSchema), updateAnnouncement).delete(deleteAnnouncement)

module.exports = router
