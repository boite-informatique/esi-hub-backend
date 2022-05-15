const router = require('express').Router()
const c = require('../controllers/forumController')
const authorize = require('../middleware/authorize')


router.use(authorize)
router.get('/', c.getForumAll)
router.get('/:id', c.getForumId)
router.post('/', c.createForum)
router.put('/:id', c.updateForum)
router.delete('/:id', c.deleteForum)
router.put('/view/:id', c.viewForum)  //view forum, +1
router.put('/upvote/:id', c.addUpvote)  //to add an upvote
router.put('/downvote/:id', c.addDownvote)  //to add a downvote
router.put('/comment/:id', c.addComment)  //to add a comment


module.exports = router