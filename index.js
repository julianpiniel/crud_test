const app = require("./src/app.js");
require("./src/models/index");

const server = app.listen(process.env.PORT, () => {
	console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
});

module.exports = { app, server };
