const mongoose = require("mongoose");
require("dotenv").config();

const { DB_SERVER, DB_HOST, DB_NAME } = process.env;
const url = `${DB_SERVER}://${DB_HOST}:/${DB_NAME}`;
const userSchema = require("./Users");
const postSchema = require("./Posts");
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`Connected to ${DB_SERVER}`))
	.catch((error) => console.log("error:", error));

const PostModel = mongoose.model("posts", postSchema),
	UserModel = mongoose.model("users", userSchema);

module.exports = { PostModel, UserModel };

//crear index donde tenga todo esto menos los esquemas, importo los esquemas;
