const { UserModel, PostModel } = require("../models");

const createPost = async (req, res, next) => {
	try {
		const { id, title, description } = req.body;
		if (!id || !title || !description)
			return res.status(400).json({ msg: "Missing information" });
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
		const posts = await PostModel.find()
			.populate({
				path: "user",
				model: UserModel,
			})
			.exec();
		res.json(posts);
	} catch (error) {
		next(error);
	}
};

const updatePost = async (req, res, next) => {
	try {
		const { id, title, description } = req.body;
		if (!id || !title || !description)
			return res.status(400).json({ msg: "Missing information" });
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
		if (!id || id.length < 10)
			return res.status(400).json({ msg: "Please enter a valid id" });
		const post = await PostModel.deleteOne({ _id: id });
		res.json({ msg: "Post successfully deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = { createPost, readPost, updatePost, deletePost };
