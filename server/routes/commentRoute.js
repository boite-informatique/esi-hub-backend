const router = require('express').Router()
const c = require('../controllers/commentController')
const authorize = require('../middleware/authorize')


router.use(authorize)
router.get('/:id', c.getCommentAll) // the id is the forum's id
router.post('/:id', c.addComment) // the id is the forum's id
router.put('/:id', c.updateComment) //the id is the comment's id
router.delete('/:id', c.deleteComment) //the id is the comment's id
router.put('/upvote/:id', c.addUpvote)  //to add an upvote, the id is the comment's id
router.put('/downvote/:id', c.addDownvote)  //to add a downvote, the id is the comment's id


module.exports = router