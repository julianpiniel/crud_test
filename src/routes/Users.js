const {
	readUser,
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/Users");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router
	.route("/")
	.get(readUser)
	.post(createUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;
