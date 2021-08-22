const mongoose = require("mongoose");
require("dotenv").config();
const { DB_SERVER, DB_HOST, DB_NAME } = process.env;
const url = `${DB_SERVER}://${DB_HOST}:/${DB_NAME}`;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`Connected to ${DB_SERVER}`))
	.catch((error) => console.log("error:", error));

const postSchema = mongoose.Schema(
		{
			title: String,
			description: String,
			created_at: Date,
			user: {
				id: String,
				name: String,
				img: String,
			},
		},
		{ versionKey: false }
	),
	userSchema = mongoose.Schema({
		name: String,
		email: String,
		img: String,
		password: String,
	}),
	PostModel = mongoose.model("posts", postSchema),
	UserModel = mongoose.model("users", userSchema);

module.exports = { PostModel, UserModel };
