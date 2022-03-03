const router = require('express').Router()
const {
  getAnnouncementAll,
  getAnnouncementId,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announceController')

router.route('/').get(getAnnouncementAll).post(createAnnouncement)
router.route('/:id').get(getAnnouncementId).put(updateAnnouncement).delete(deleteAnnouncement)

module.exports = router
