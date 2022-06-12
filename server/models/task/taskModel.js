const { Schema, model } = require("mongoose")

const taskSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			maxlength: [64, "Name must not exceed 64 characters"],
		},

		description: {
			type: String,
			required: false,
			maxlength: [128, "Description must not exceed 64 characters"],
		},

		status: {
			type: String,
			required: true,
			enum: {
				values: ["Planned", "In progress", "Done"],
				message: "{VALUE} is not supported status",
			},
			default: "Planned",
		},

		userInCharge: {
			// show user who is doing the task, or who finished it
			type: Schema.Types.ObjectId,
			ref: "User",
		},

		workspace: {
			type: Schema.Types.ObjectId,
			ref: "Workspace",
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = model("Task", taskSchema)
