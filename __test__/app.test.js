const { app, server } = require("../index");
//const session = require("supertest-session");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { UserModel, PostModel } = require("../src/models/index");

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

beforeEach(async () => {
	await UserModel.deleteMany({});
	await PostModel.deleteMany({});
	await new UserModel(initialUsers[0]).save();
	await new UserModel(initialUsers[1]).save();
	const users = await UserModel.find();
	(initialPosts[0].user = users[0]._id), (initialPosts[1] = users[1]._id);
	await new PostModel(initialPosts[0]).save();
	await new PostModel(initialPosts[1]).save();
});
afterAll(async () => {
	await UserModel.deleteMany({});
	await PostModel.deleteMany({});
	//mongoose.posts.remove({});
	mongoose.connection.close();
	server.close();
});

describe("TEST==> /users", () => {
	test("Users are returned as JSON", async () => {
		await api
			.get("/users")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("Should return two users", async () => {
		const response = await api.get("/users");
		expect(response.body).toHaveLength(initialUsers.length);
	});
	test("Users should have correct properties", async () => {
		const response = await api.get("/users");
		const keys = Object.keys(initialUsers[0]);
		response.body.forEach((user) => {
			for (let key of keys) {
				expect(user).toHaveProperty(key);
			}
		});
	});
	test("Users should be the same as initialUsers", async () => {
		const response = await api.get("/users");
		const values1 = Object.values(initialUsers[0]);
		const values2 = Object.values(initialUsers[1]);
		for (let value of values1) {
			expect(Object.values(response.body[0]).includes(value)).toBe(true);
		}
		for (let value of values2) {
			expect(Object.values(response.body[1]).includes(value)).toBe(true);
		}
	});
});
