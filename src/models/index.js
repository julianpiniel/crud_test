const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_DB_URI, MONGO_DB_TEST, NODE_ENV } = process.env;

const userSchema = require("./Users");
const postSchema = require("./Posts");

const connectionString = NODE_ENV === "test" ? MONGO_DB_TEST : MONGO_DB_URI;

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`Connected to ${connectionString}`))
	.catch((error) => console.log("error:", error));

const PostModel = mongoose.model("posts", postSchema),
	UserModel = mongoose.model("users", userSchema);

module.exports = { PostModel, UserModel };

//crear index donde tenga todo esto menos los esquemas, importo los esquemas;
