const express = require("express");
const router = express.Router();
const users = require("./Users");
const posts = require("./Posts");

router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
