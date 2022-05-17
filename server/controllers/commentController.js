const asyncHandler = require('express-async-handler')
const Forum = require('../models/forum/forumModel')
const Comment = require('../models/forum/commentModel')


const getCommentAll = asyncHandler(async (req, res) => { res.json({message: 'this is getCommentAll'}) })
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