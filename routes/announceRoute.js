const router = require('express').Router();
const {
    getAnnouncementAll,
    getAnnouncementId,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announceController');

router.get('/', getAnnouncementAll);
router.get('/:id', getAnnouncementId);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement)


module.exports = router;