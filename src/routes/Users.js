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
	.post(createUser)
	.get(readUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;
