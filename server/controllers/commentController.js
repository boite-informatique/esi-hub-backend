const asyncHandler = require('express-async-handler')
const Forum = require('../models/forum/forumModel')
const Comment = require('../models/forum/commentModel')


const getCommentAll = asyncHandler(async (req, res) => { 
    // let { limit = 10, page = 0 } = req.query

	// // perform query
	// let comments = await Announcement.find()
	// 	.sort({ 'up_votes.amount': -1 })
	// 	.skip(limit * page)
	// 	.limit(limit)
	// 	.populate("attachments")
	// 	.populate("user", "name avatar")
    //     .populate("user.avatar")

	// // check is query returned any results
	// if (!comments || comments.length === 0) {
	// 	res.status(404)
	// 	throw new Error("Comments not found")
	// }


	// //THIS CONTROLLER IS ALL WRONG, REDO IT
	// //CUZ I AM FETCHING ALL FORUMS, WHILE I SHOULD FETCH ONLY THE ONES OF A SPESIFIC FORUM

 })

const addComment = asyncHandler(async (req, res) => { res.json({message: 'this is addComment'}) })

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