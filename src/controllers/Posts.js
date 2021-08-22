const { UserModel, PostModel } = require("../models/Db");

const createPost = async (req, res, next) => {
	try {
		const { id, title, description } = req.body;
		const post = new PostModel({
			title,
			description,
			created_at: new Date(),
			user: id,
		});
		const result = await post.save();
		res.json({ msg: "Post has been created" });
	} catch (error) {
		next(error);
	}
};

const readPost = async (req, res, next) => {
	try {
		const posts = await PostModel.find();
		res.json(posts);
	} catch (error) {
		next(error);
	}
};

const updatePost = async (req, res, next) => {
	try {
		const { id, title, description } = req.body;
		const originalUser = await PostModel.findById({ _id: id });
		const user = await PostModel.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					title: title ? title : originalPost.title,
					description: description
						? description
						: originalUser.description,
				},
			}
		);
		res.json({ msg: "Post successfully updated" });
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const { id } = req.body;
		const post = await PostModel.deleteOne({ _id: id });
		res.json({ msg: "Post successfully deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = { createPost, readPost, updatePost, deletePost };
