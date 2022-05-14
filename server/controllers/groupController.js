const asyncHandler = require("express-async-handler")
const Group = require("../models/groupModel")

const getGroups = asyncHandler(async (req, res) => {
	const groups = await Group.find({ name: { $ne: "admin" } })
		.select("name path")
		.sort({ path: -1 })

	if (groups.length === 0) {
		res.status(404)
		throw new Error("no groups found")
	}

	const trasnformed = groupTransform(groups)
	res.status(200).json(trasnformed)
})

const createGroup = asyncHandler(async (req, res) => {
	if (!req.user.isAdmin) {
		res.status(401)
		throw new Error("Only admins are allowed to create groups")
	}

	const { name, parent: parentId } = req.body

	if (parent) {
		//search for parent
		const parent = await Group.findById(parentId)

		if (!parent) {
			res.status(404)
			throw new Error("Parent group doesn't exist")
		}

		const path = parent.path + parent.name + "/"
		const group = await Group.findOne({ name, path })

		if (group) {
			res.status(400)
			throw new Error("Group already exists")
		}

		try {
			const newGroup = await Group.create({ name, path })

			res.status(201).json(newGroup)
		} catch (error) {
			res.status(400)
			throw new Error(error)
		}
	} else {
		const group = await Group.findOne({ name, path: "/" })

		if (group) {
			res.status(400)
			throw new Error("Group already exists")
		}

		try {
			const newGroup = await Group.create({ name, path: "/" })

			res.status(201).json(newGroup)
		} catch (error) {
			res.status(400)
			throw new Error(error)
		}
	}
})

const getGroupsCustom = asyncHandler(async (req, res) => {
	// search for group
	const group = await Group.findOne({ name: req.params.name })

	if (!group) {
		res.status(404)
		throw new Error("group doesnt exist")
	}

	let groups
	// handle search query based on request
	switch (req.query.type) {
		case "allChildren": {
			groups = await Group.find({
				path: new RegExp(`${group.path}${group.name}/\w*`),
			})
			break
		}

		case "immediateChildren": {
			groups = await Group.find({ path: `${group.path}${group.name}/` })
			break
		}

		case "parents": {
			const parents = group.path.split("/")
			groups = await Group.find({ name: { $in: parents } })
			break
		}

		default: {
			groups = group
			break
		}
	}

	if (groups.length === 0) {
		res.status(404)
		throw new Error("no groups found")
	}
	res.status(200).json(groups)
})

const groupTransform = (arr) => {
	let childrenMap = new Map()
	let path
	while (arr.length !== 0) {
		path = arr[0].path
		let i = 0
		let children = []
		while (arr.length > i && arr[i].path === path) {
			let child = {
				_id: arr[i]._id,
				name: arr[i].name,
			}

			if (childrenMap.has(`${path}${child.name}/`)) {
				child.children = childrenMap.get(`${path}${child.name}/`)
				childrenMap.delete(`${path}${child.name}/`)
			}

			children.push(child)
			i++
		}
		childrenMap.set(path, children)
		arr.splice(0, i)
	}
	return childrenMap.get("/")
}

module.exports = {
	getGroups,
	createGroup,
	getGroupsCustom,
}
