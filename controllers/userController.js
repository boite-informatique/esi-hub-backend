const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const { emailVerification } = require("../config/general.json")
const sendEmail = require("../utilities/email")

const registerUser = asyncHandler(async (req, res) => {
	const { body } = req

	// Check if account already exists
	const checkUser = await User.findOne({ email: body.email })
	if (checkUser) {
		res.status(400)
		throw new Error("Account already exists")
	}

	// hash password and create account
	const salt = await bcrypt.genSalt(10)
	body.password = await bcrypt.hash(body.password, salt)

	body.verified = true

	const user = await User.create(body)
	await user.populate("groups")

	const { __v, password, updatedAt, refreshTokens, ...output } = user._doc

	res.status(201).json(output)
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// find user in database

	const user = await User.findOne({ email })

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(404)
		throw new Error("Email or password incorrect")
	}

	// in case user found
	// check if user is verified

	if (!emailVerification || user.verified) {
		await user.populate("groups", "name")

		// generate a refresh token
		const refreshToken = generateRefreshToken(user)
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: true,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		})

		// push new refresh token to user's tokens
		user.refreshTokens.push(refreshToken)
		await user.save()

		// generate an access token
		res.cookie("accessToken", generateAccessToken(user), {
			httpOnly: false,
			sameSite: true,
			maxAge: 15 * 60 * 1000,
		})
		const { __v, password, updatedAt, refreshTokens, ...output } = user._doc
		res.status(200).json(output)
	} else {
		// unverified
		const { __v, password, updatedAt, refreshTokens, ...output } = user._doc
		res.status(200).json(output)
	}
})

const updateUser = asyncHandler(async (req, res) => {
	if (!req.params.id) req.params.id = req.user.id
	// verify if user is admin or target
	if (req.params.id !== req.user.id && !req.admin) {
		res.status(401)
		throw new Error(
			"Unauthorized operation, you have to login as target user or admin"
		)
	}
	// get data from request body
	const { body } = req

	// find user
	const user = await User.findById(req.params.id)

	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}
	// strip role modification if not admin
	body.groups = req.admin ? body.groups : null

	// hash password if new password is set
	if (body.password) {
		console.log(body.password, req.query.old)
		if (!(await bcrypt.compare(req.query.old, user.password))) {
			res.status(401)
			throw new Error("Incorrect old password")
		}

		const salt = await bcrypt.genSalt(10)
		body.password = await bcrypt.hash(body.password, salt)
	}

	// save user
	for (const key in user) {
		if (body[key]) {
			user[key] = body[key]
		}
	}

	await user.save()
	res.status(200).json(user)
})

const deleteUser = asyncHandler(async (req, res) => {
	if (!req.admin) {
		res.status(401)
		throw new Error("Unauthorized, you need to be an admin")
	}

	const user = await User.findById(req.body.id)

	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}
	await user.delete()

	res.status(200).json({
		id: req.body.id,
	})
})

const getUsers = asyncHandler(async (req, res) => {
	let { s: search, limit = 5, page = 0 } = req.query

	// define query
	let query = {}
	if (search) query.name = new RegExp(search, "i")

	const users = await User.find(query)
		.select("name email avatar createdAt groups")
		.skip(limit * page)
		.limit(limit)
		.populate("groups", "name")

	if (users.length === 0) {
		res.status(404)
		throw new Error("no users found")
	}

	res.status(200).json(users)
})

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
		.select("name email avatar createdAt groups")
		.populate("groups", "name")
		.populate("avatar")

	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}

	res.status(200).json(user)
})

const getCurrentUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
		.select("name email groups avatar")
		.populate("groups", "name")
		.populate("avatar")

	if (!user) {
		res.status(404)
		throw new Error("user doesnt exist")
	}

	res.status(200).json(user)
})

const verifyAccount = asyncHandler(async (req, res) => {
	const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET_EMAIL_VERIFICATION)

	if (!decoded) {
		res.status(401)
		throw new Error("Unauthorized, expired token")
	}

	const user = await User.findById(decoded.id)

	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}

	user.verified = true
	await user.save()

	res.status(200).redirect("http://localhost:3000/login?verified=true")
})

const verifyAccountSend = asyncHandler(async (req, res) => {
	const { email } = req.body

	if (!email) {
		res.status(400)
		throw new Error('You must enter an email')
	}

	const user = await User.findOne({ email })

	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}

	if (user.verified) {
		res.status(400)
		throw new Error("User already verified")
	}

	const token = jwt.sign(
		{ id: user.id },
		process.env.JWT_SECRET_EMAIL_VERIFICATION,
		{ expiresIn: "60m" }
	)

	sendEmail(user.email, token)
	res.status(200).json({
		status: "Success, awaiting email verification",
		expiresIn: "60 minutes",
	})
})

const logout = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}

	user.refreshTokens = user.refreshTokens.filter(
		(val) => val == req.cookies.refreshToken
	)

	res.cookie("accessToken", "")
	res.cookie("refreshToken", "")
	res.status(200).json({ success: true })
})

const changeAvatar = asyncHandler(async (req, res) => {
	if (!req.files[0]) {
		res.status(400)
		throw new Error("Bad file format")
	}

	const user = await User.findById(req.user.id)
	if (!user) {
		res.status(404)
		throw new Error("User not found")
	}

	user.avatar = req.files[0]
	await user.save()

	res.status(200).json(user)
})

const generateRefreshToken = (user) => {
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "365d",
	})
}

const generateAccessToken = (user) => {
	if (!user.populated("groups")) {
		user
			.populate("groups", "name")
			.then((res) => {
				return
			})
			.catch((err) => {
				throw new Error(err)
			})
	}
	return jwt.sign(
		{
			id: user.id,
			groups: user.groups,
			isAdmin: user.groups.some((group) => group.name === "admin"),
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "5m",
		}
	)
}

module.exports = {
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
	getCurrentUser,
	generateAccessToken,
	verifyAccount,
	verifyAccountSend,
	logout,
	changeAvatar,
}
