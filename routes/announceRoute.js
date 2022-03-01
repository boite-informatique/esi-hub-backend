const router = require('express').Router();
const {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announceRoutes');

router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement)


module.exports = router;