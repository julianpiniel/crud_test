const mongoose = require("mongoose");

module.exports = mongoose.Schema(
	{
		name: String,
		email: String,
		img: String,
		password: String,
	},
	{ versionKey: false }
);
