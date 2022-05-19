const asyncHandler = require('express-async-handler')
const Forum = require('../models/forum/forumModel')
const Comment = require('../models/forum/commentModel')


const getCommentAll = asyncHandler(async (req, res) => { 
	// how many comments does the user want to see & pagination
    let { limit = 10, page = 0 } = req.query

	if (limit <= 0) {
		res.status(404)
		throw new Error("limit must be a positive number")
	}
	if (page < 0) {
		res.status(404)
		throw new Error("page must be a positive number")
	}


    // find the forum
    const forum = await Forum.findById(req.params.id).populate("comments")

	if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }

	if (!forum.comments || forum.comments.length === 0) {
		res.status(404)
		throw new Error("no comments found for this forum")
	}

	// sort the array of comments by upvotes
	forum.comments.sort( (a, b) => {
		return b.age - a.age
	})

	const comments = forum.comments.slice(limit * page, limit * page + limit)
		.populate("attachments")
		.populate("user", "name avatar")
		.populate("user.avatar")
		.select('-up_votes.users -down_votes.users')

	res.status(200).json({
		limit,
		nextPage: page + 1,
		data: comments,
	})
 })

const addComment = asyncHandler(async (req, res) => { 
	// find the forum
	const forum = await Forum.findById(req.params.id)

	if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }

	// get the data
	const {body} = req.body
	const attachments = req.files
	const user = req.user.id

	// create the comment and add it to the forum 
	try {
		const comment = await Comment.create({body, user, attachments})
		forum.comments.push(comment._id)
		res.status(201).json(comment)
	} catch (error) {
		res.status(400)
        throw new Error(error);
	}
 })

const updateComment = asyncHandler(async (req, res) => { res.json({message: 'this is updateComment'}) })

const deleteComment = asyncHandler(async (req, res) => { res.json({message: 'this is deleteComment'}) })

const addUpvote = asyncHandler(async (req, res) => { res.json({message: 'this is addUpvote'}) })

const addDownvote = asyncHandler(async (req, res) => { res.json({message: 'this is addDownvote'}) })



module.exports = {
    getCommentAll,
    addComment,
    updateComment,
    deleteComment,
    addUpvote,
    addDownvote
}