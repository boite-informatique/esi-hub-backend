const router = require('express').Router()
const c = require('../controllers/announceController')
const authorize = require('../middleware/authorize')
const dataValidator = require('../middleware/dataValidation')
const {createSchema, updateSchema} = require('../middleware/dataSchemas/announceSchemas')


router.use(authorize)
router.get('/', c.getAnnouncementAll)
router.get('/:id', c.getAnnouncementId)
router.post('/', dataValidator(createSchema), c.createAnnouncement)
router.put('/:id', dataValidator(updateSchema), c.updateAnnouncement)
router.put('/:id/read', c.markAsRead)
router.delete('/:id', c.deleteAnnouncement)

module.exports = router
