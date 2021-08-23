const mongoose = require("mongoose");

module.exports = mongoose.Schema(
	{
		title: String,
		description: String,
		created_at: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ versionKey: false }
);
