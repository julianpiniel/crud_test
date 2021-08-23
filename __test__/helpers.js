const { app, server } = require("../index");
const supertest = require("supertest");
const api = supertest(app);
const initialUsers = [
		{
			name: "Julian",
			email: "julian@gmail.com",
			img: "julian.png",
			password: "1234567",
		},
		{
			name: "Maximo",
			email: "maximo@gmail.com",
			img: "maximo.png",
			password: "987654321",
		},
	],
	initialPosts = [
		{
			title: "julian post",
			description: "hola mundo",
			user: "id",
		},
		{
			title: "maximo post",
			description: "adios mundo",
			user: "id",
		},
	];

module.exports = { initialPosts, initialUsers, api, server };
