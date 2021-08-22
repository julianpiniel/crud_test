const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const routes = require("./routes");

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors({ origin: "*" }));

server.use("/", routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status.send(message));
});

module.exports = server;
