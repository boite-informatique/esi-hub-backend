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
const {createSchema} = require('../middleware/dataSchemas/announceSchemas')


router.use(authorize)
router.route('/').get(getAnnouncementAll).post(dataValidator(createSchema), createAnnouncement)
router.route('/:id').get(getAnnouncementId).put(dataValidator(createSchema), updateAnnouncement).delete(dataValidator(createSchema), deleteAnnouncement)

module.exports = router
