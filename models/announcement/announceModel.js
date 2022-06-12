const mongoose = require("mongoose")

const announceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			maxlength: [128, "Title's length must not exceed 128 characters"],
			trim: true,
		},
		body: {
			type: String,
			required: [true, "Body is required"],
			maxlength: [1024, "Body's length must not exceed 1024 characters"],
			trim: true,
		},
		tags: {
			type: [String],
			required: false,
			default: [],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		visibility: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Group",
			required: true,
			default: [],
		},
		attachments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "File",
				required: false,
			},
		],
	},
	{ timestamps: true }
)

function arrayLimit(value) {
	return value.length <= 8
}
module.exports = mongoose.model("Announcement", announceSchema)
