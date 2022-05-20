const mongoose = require("mongoose")

const chatMessageSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			maxlength: [368, "Chat message cannot exceed 368 characters"],
			required: true,
			trim: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat-Room",
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Chat-Message", chatMessageSchema)
