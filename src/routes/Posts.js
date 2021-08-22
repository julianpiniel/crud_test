const {
	readPost,
	createPost,
	updatePost,
	deletePost,
} = require("../controllers/Posts");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router
	.route("/")
	.post(createPost)
	.get(readPost)
	.put(updatePost)
	.delete(deletePost);

module.exports = router;
