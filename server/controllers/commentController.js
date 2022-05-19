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

const updateComment = asyncHandler(async (req, res) => { 
	// find the comment
	const comment = await Comment.findById(req.params.id)

	if (!comment) {
        res.status(404)
        throw new Error('comment not found')
    }

	// check if user is authorized (if user is the owner or admin)
	if (comment.user != req.user.id && !req.user.isAdmin ) {
		res.status(401)
		throw new Error("Unauthorized, you can't change this comment")
	}
	
	// updating the comment
	try {
        const {body} = req.body  
        const {files} = req
        if (body) {
            comment.body = body 
        }
        if (files) {
            comment.attachments = files
        }
        await comment.save()

        res.status(200).json({"comment updated": comment})
    } catch (error) { //in case validation fails
        res.status(400)
		throw new Error(error)
    }
})

const deleteComment = asyncHandler(async (req, res) => { 
	// find the comment
	const comment = await Comment.findById(req.params.id)

	if (!comment) {
		res.status(404)
		throw new Error('comment not found')
	}

	// check if user is authorized (if user is the owner or admin)
	if (comment.user != req.user.id && !req.user.isAdmin ) {
		res.status(401)
		throw new Error("Unauthorized, you can't delete this comment")
	}
	
	// deleting comment
	try {
		await comment.remove()
		res.status(200).json({ message: 'comment deleted', id: comment._id })
	} catch (error) {
		res.status(400)
		throw new Error(error)
	}
 })

const addUpvote = asyncHandler(async (req, res) => { 
	// find the comment
	const comment = await Comment.findById(req.params.id)

	if (!comment) {
		res.status(404)
		throw new Error('comment not found')
	}

    // check if user is the owner and prevent the upvote
    if (comment.user === req.user.id) {
        res.status(400)
		throw new Error("the owner cannot upvote his comment")
    }
    // check if user already upvoted and prevent the upvote
    if (comment.up_votes.users.some(user => user === req.user.id)) {
        res.status(400)
		throw new Error("you have already upvoted this comment")
    }

    //add the upvote
    comment.up_votes.amount++
    
    try {
        await comment.save()
        res.status(201).json({message: 'upvote added', comment})
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
 })

const addDownvote = asyncHandler(async (req, res) => { 
	// find the comment
	const comment = await Comment.findById(req.params.id)

	if (!comment) {
		res.status(404)
		throw new Error('comment not found')
	}

    // check if user is the owner and prevent the downvote
    if (comment.user === req.user.id) {
        res.status(400)
		throw new Error("the owner cannot downvote his comment")
    }
    // check if user already downvoted and prevent the downvote
    if (comment.down_votes.users.some(user => user === req.user.id)) {
        res.status(400)
		throw new Error("you have already downvoted this comment")
    }

    //add the downvote
    comment.down_votes.amount++
    
    try {
        await comment.save()
        res.status(201).json({message: 'downvote added', comment})
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
 })



module.exports = {
    getCommentAll,
    addComment,
    updateComment,
    deleteComment,
    addUpvote,
    addDownvote
}