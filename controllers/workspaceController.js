const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Workspace = require("../models/task/workspaceModel")
const Task = require("../models/task/taskModel")

const getWorkspaceAll = asyncHandler(async (req, res) => {
	const { limit = 0 } = req.query

	const workspaces = await Workspace.find({
		members: { $elemMatch: { $in: [req.user.id] } },
	})
		.sort({ createdAt: -1 })
		.limit(limit)
		.populate("members", "name avatar")

	if (workspaces.length === 0) {
		res.status(404)
		throw new Error("Workspace(s) not found")
	}
	res.status(200).json(workspaces)
})

const getWorkspaceId = asyncHandler(async (req, res) => {
	const workspace = await Workspace.findOne({
		_id: req.params.id,
		members: { $elemMatch: { $eq: req.user.id } },
	}).populate("members", "name avatar")

	if (!workspace) {
		res.status(404)
		throw new Error("Workspace not found")
	}

	const tasks = await Task.find({ workspace })
		.populate("userInCharge", "name avatar")
		.sort({ createdAt: -1 })

	res.status(200).json({ ...workspace._doc, tasks })
})

const createWorkspace = asyncHandler(async (req, res) => {
	const { body } = req

	body.members.push(req.user.id)
	if (!req.admin && !body.members.includes(req.user.id)) {
		res.status(400)
		throw new Error("Unauthorized creation of workspace")
	}

	// create and save workspace
	const workspace = new Workspace(body)

	await workspace.save()
	res.status(201).json(workspace)
})

const updateWorkspace = asyncHandler(async (req, res) => {
	const { body } = req

	// search for the workspace

	const workspace = await Workspace.findById(req.params.id)

	if (!workspace) {
		res.status(400)
		throw new Error("Workspace doesn't exist")
	}

	// search if workspace matches the user
	if (!req.admin && !workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("Unauthorized, you can't change this workspace")
	}

	// search for new members
	const members = req.query.members.split(",").map((val) => val.trim())

	const queriedMembers = await (
		await User.find({ email: { $in: members } })
	).map((elem) => elem.id)

	// updating the workspace

	queriedMembers.forEach((elem) => {
		if (!workspace.members.includes(elem)) workspace.members.push(elem)
	})

	await workspace.save()

	res.status(200).json(workspace)
})

const deleteWorkspace = asyncHandler(async (req, res) => {
	const workspace = await Workspace.findById(req.params.id)

	if (!workspace) {
		res.status(400)
		throw new Error("Workspace doesn't exist")
	}

	// search if workspace matches the user

	if (!req.admin && !workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("Unauthorized, you can't change this workspace")
	}

	// deleting the workspace

	await workspace.remove()

	res.status(200).json({ id: workspace._id })
})
module.exports = {
	getWorkspaceAll,
	getWorkspaceId,
	createWorkspace,
	updateWorkspace,
	deleteWorkspace,
}
