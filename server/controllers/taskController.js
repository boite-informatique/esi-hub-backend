const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Workspace = require("../models/task/workspaceModel")
const Task = require("../models/task/taskModel")

const getTaskAll = asyncHandler(async (req, res) => {
	const workspace = await Workspace.findById(req.params.workspaceId)

	if (!workspace) {
		res.status(404)
		throw new Error("Workspace not found")
	}

	if (!workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("You don't have access to this workspace")
	}

	const tasks = await Task.find({ workspace: workspace })

	if (tasks.length === 0) {
		res.status(404)
		throw new Error("Task(s) not found")
	}
	res.status(200).json(tasks)
})

const getTaskId = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id).populate(
		"workspace",
		"members"
	)

	if (!task) {
		res.status(404)
		throw new Error("Task not found")
	}

	if (!task.workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("You don't have access to this workspace")
	}

	res.status(200).json(task)
})

const createTask = asyncHandler(async (req, res) => {
	const { body } = req

	const workspace = await Workspace.findOne({
		_id: body.workspace,
		members: { $elemMatch: { $eq: req.user.id } },
	})

	if (!workspace) {
		res.status(404)
		throw new Error("Workspace not found")
	}

	// create and save task
	const task = new Task(body)

	await task.save()
	res.status(201).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id).populate(
		"workspace",
		"members"
	)

	if (!task) {
		res.status(404)
		throw new Error("Task not found")
	}

	if (!task.workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("You don't have access to this workspace")
	}

	// updating the task
	task.status = req.query?.status === "1" ? "Done" : "In progress"
	task.userInCharge = req.user.id

	await task.save()
	res.status(200).json(task)
})

const deleteTask = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id).populate(
		"workspace",
		"members"
	)

	if (!task) {
		res.status(404)
		throw new Error("Task not found")
	}

	if (!task.workspace.members.includes(req.user.id)) {
		res.status(401)
		throw new Error("You don't have access to this workspace")
	}

	// updating the task

	await task.remove()

	res.status(200).json({ id: task.id })
})

module.exports = {
	getTaskAll,
	getTaskId,
	createTask,
	updateTask,
	deleteTask,
}
