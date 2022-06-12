const { Schema, model } = require("mongoose")

const workspaceSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			maxlength: [32, "Name must not exceed 32 characters"],
		},

		description: {
			type: String,
			required: false,
			maxlength: [64, "Description must not exceed 32 characters"],
		},

		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
	},
	{ timestamps: true }
)

module.exports = model("Workspace", workspaceSchema)
