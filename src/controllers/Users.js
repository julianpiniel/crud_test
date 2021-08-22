const { UserModel } = require("../models/Db");

const createUser = async (req, res, next) => {
	try {
		const { name, email, img, password } = req.body;
		const user = new UserModel({
			name,
			email,
			img,
			password,
		});
		const result = await user.save();
		res.json({ msg: "User has been created" });
	} catch (error) {
		next(error);
	}
};

const readUser = async (req, res, next) => {
	try {
		const users = await UserModel.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id, name, email, img, password } = req.body;
		const originalUser = await UserModel.findById({ _id: id });
		const user = await UserModel.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					name: name ? name : originalUser.name,
					email: email ? email : originalUser.email,
					img: img ? img : originalUser.img,
					password: password ? password : originalUser.password,
				},
			}
		);
		res.json({ msg: "User successfully updated" });
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.body;
		const user = await UserModel.deleteOne({ _id: id });
		res.json({ msg: "User successfully deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, readUser, updateUser, deleteUser };
