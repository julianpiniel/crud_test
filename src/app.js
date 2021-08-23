const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use("/", routes);

app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status.send(message));
});

module.exports = app;
