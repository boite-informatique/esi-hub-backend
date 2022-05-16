const asyncHandler = require('express-async-handler')
const Forum = require('../models/forumModel')


const getForumAll = asyncHandler(async (req, res) => { 
	let { search, limit = 30, page = 0 } = req.query

	// define our query conditions
	let query = {}

	// check if search params exist and if so add to query
	if (search) query.title = new RegExp(search, "i") // perform case insensitive search on title

	// perform query
	let forums = await Forum.find(query)
		.sort({ createdAt: -1 })
		.skip(limit * page)
		.limit(limit)
		.populate("attachments")
        .populate({path: "comments",
            populate: [{path: 'user', select: 'name avatar'},{path: 'attachments'}]
        })
		.populate("user", "name avatar")
        .populate("user.avatar")


	// check is query returned any results
	if (!forums || forums.length === 0) {
		res.status(404)
		throw new Error("forums not found")
	}

	res.status(200).json({
		limit,
		nextPage: page + 1,
		data: forums
	})
})

const getForumId = asyncHandler(async (req, res) => { 

    //fetch the forum from DB
    const forum = await Forum.findOne({ _id : req.params.id })
    .populate("attachments")
    .populate({path: "comments",
        populate: [{path: 'user', select: 'name avatar'},{path: 'attachments'}]
    })
    .populate("user", "name avatar")
    .populate("user.avatar")


    //if forum doesnt exist
    if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }
    
    res.status(200).json(forum)

})

const createForum = asyncHandler(async (req, res) => { 
    //get the data
    const {title, body, attachments} = req.body
    const user = req.user.id

    //make forum using data, if data not valid it will apply mongoose data validation and throw error
    try {
        const forum = await Forum.create({title, body, attachments, user})
        res.status(201).json(forum)
    } catch (error) {
        res.status(400)
        throw new Error(error);
    }

})
  
const updateForum = asyncHandler(async (req, res) => { 

    // find the forum and get id of the owner
    const forum = await Forum.findById(req.params.id).populate('user', '_id')

    if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }

    // check if user is authorized (if user is the owner or admin)
    if (forum.user._id != req.user.id && !req.user.isAdmin ) {
		res.status(401)
		throw new Error("Unauthorized, you can't change this forum")
    }
    
    // updating forum
    try {
        const {title, body} = req.body  
        const {files} = req
        if (title) {
            forum.title = title 
            await forum.save()
        }
        if (body) {
            forum.body = body 
            await forum.save()
        }
        if (files) {
            forum.attachments = files
            await forum.save()
        }

        res.status(200).json({"forum updated": forum})
    } catch (error) { //in case validation fails
        res.status(400)
		throw new Error(err)
    }

})

const deleteForum = asyncHandler(async (req, res) => { 

    // find the forum and get id of the owner
    const forum = await Forum.findById(req.params.id).populate('user', '_id')

    if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }

    // check if user is authorized (if user is the owner or admin)
    if (forum.user._id != req.user.id && !req.user.isAdmin ) {
		res.status(401)
		throw new Error("Unauthorized, you can't delete this forum")
    }
    
    // deleting forum
    try {
        await forum.remove()
        res.status(200).json({ message: 'forum deleted', id: forum._id })
    } catch (error) {
        res.status(400)
		throw new Error(err)
    }
})

const viewForum = asyncHandler(async (req, res) => { 
    // find the forum
    const forum = await Forum.findById(req.params.id)

    if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }
    
    // incrementing views
    try {
        forum.views++
        await forum.save()
        res.status(200).json({ message: 'forum viewed', id: announcement._id })
    } catch (error) {
        res.status(500)
        throw new Error(err)
    }
})

const addUpvote = asyncHandler(async (req, res) => { 
    // find the forum
    const forum = await Forum.findById(req.params.id).populate('user', '_id').populate('up_votes.users', '_id')

    if (!forum) {
        res.status(404)
        throw new Error('forum not found')
    }
    
    // check if user is the owner and prevent the upvote
    if (forum.user._id === req.user.id) {
        res.status(400)
		throw new Error("the owner cannot upvote his forum")
    }
    // check if user already upvoted and prevent the upvote
    if (forum.up_votes.users.some(user => user._id === req.user.id)) {
        res.status(400)
		throw new Error("you have already upvoted this forum")
    }

    //add the upvote
    forum.up_votes.amount++
    
    try {
        await forum.save()
        res.status(201).json({message: 'upvote added', forum})
    } catch (error) {
        res.status(500)
        throw new Error(err)
    }
})

const addDownvote = asyncHandler(async (req, res) => { 
        // find the forum
        const forum = await Forum.findById(req.params.id).populate('user', '_id').populate('down_votes.users', '_id')

        if (!forum) {
            res.status(404)
            throw new Error('forum not found')
        }
        
        // check if user is the owner and prevent the down_votes
        if (forum.user._id === req.user.id) {
            res.status(400)
            throw new Error("the owner cannot down_votes his forum")
        }
        // check if user already downvoted and prevent the downvote
        if (forum.down_votes.users.some(user => user._id === req.user.id)) {
            res.status(400)
            throw new Error("you have already downvoted this forum")
        }
    
        //add the downvote
        forum.down_votes.amount++
        
        try {
            await forum.save()
            res.status(201).json({message: 'downvote added', forum})
        } catch (error) {
            res.status(500)
            throw new Error(err)
        }    
 })

const addComment = asyncHandler(async (req, res) => { res.json({msg: 'this is addComment'}) })



module.exports = {
    getForumAll,
    getForumId,
    createForum,
    updateForum,
    deleteForum,
    viewForum,
    addUpvote,
    addDownvote,
    addComment
}
