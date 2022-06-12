const mongoose = require("mongoose")

const chatRoomSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Room name is required"],
			maxlength: [64, "Room name length must not exceed 64 characters"],
			trim: true,
		},
		description: {
			type: String,
			required: false,
			maxlength: [
				192,
				"Room description length must not exceed 192 characters",
			],
			trim: true,
		},
		participants: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
)

function arrayLimit(value) {
	return value.length <= 8
}

module.exports = mongoose.model("Chat-Room", chatRoomSchema)
