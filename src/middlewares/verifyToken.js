const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_KEY } = process.env;

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token)
			return res.status(401).send({
				auth: false,
				message: "No TOKEN was provided",
			});
		const decoded = await jwt.verify(token, JWT_KEY);

		req.userId = decoded.id;
		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { verifyToken };
