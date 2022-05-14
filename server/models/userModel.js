const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		maxlength: [32, "Name must not exceed 32 characters"],
		trim: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	groups: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
		required: true,
		default: [],
	},
	verified: {
		type: Boolean,
		required: true,
		default: false,
	},
	avatar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "File",
		required: false,
	},
	refreshTokens: [
		{
			type: String,
			required: false,
		},
	],
})

module.exports = mongoose.model("User", userSchema)
