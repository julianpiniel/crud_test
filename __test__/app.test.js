const mongoose = require("mongoose");
const { UserModel, PostModel } = require("../src/models/index");
const { initialPosts, initialUsers, api, server } = require("./helpers");

beforeEach(async () => {
	await UserModel.deleteMany({});
	await PostModel.deleteMany({});
	await new UserModel(initialUsers[0]).save();
	await new UserModel(initialUsers[1]).save();
	const users = await UserModel.find();
	(initialPosts[0].user = users[0]._id),
		(initialPosts[1].user = users[1]._id);
	await new PostModel(initialPosts[0]).save();
	await new PostModel(initialPosts[1]).save();
});
afterAll(async () => {
	await UserModel.deleteMany({});
	await PostModel.deleteMany({});
	mongoose.connection.close();
	server.close();
});

describe("TEST==> /users", () => {
	describe("GET request", () => {
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
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
			for (let value of values2) {
				expect(Object.values(response.body[1]).includes(value)).toBe(
					true
				);
			}
		});
	});
	describe("POST request", () => {
		const newUser = {
			name: "Carlos",
			email: "carlos@gmail.com",
			img: "carlos.png",
			password: "abcdefgh",
		};

		test("Valid POST request should add a user into db", async () => {
			await api
				.post("/users")
				.send(newUser)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/users");
			expect(response.body).toHaveLength(initialUsers.length + 1);
		});
		test("User added should be as intended", async () => {
			await api
				.post("/users")
				.send(newUser)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/users");
			const newUserKeys = Object.keys(newUser);
			const newUserValues = Object.values(newUser);
			for (let key of newUserKeys) {
				expect(
					response.body.find((user) => user.name === newUser.name)
				).toHaveProperty(key);
			}
			for (let value of newUserValues) {
				expect(
					Object.values(
						response.body.find((user) => user.name === newUser.name)
					).includes(value)
				).toBe(true);
			}
		});
		test("Invalid POST request shouldn't add a user into db", async () => {
			const unvalidUser = {
				name: "juan",
			};
			await api.post("/users").send(unvalidUser).expect(400);
			const response = await api.get("/users").expect(200);
			expect(response.body).toHaveLength(initialUsers.length);
		});
	});

	describe("PUT request", () => {
		const updateUser = {
			name: "Carlos",
			email: "carlos@gmail.com",
			img: "carlos.png",
			password: "abcdefgh",
		};

		test("Valid PUT request should update a user", async () => {
			const users = await UserModel.find();
			updateUser.id = users[0]._id;
			await api
				.put("/users")
				.send(updateUser)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/users");
			expect(response.body).toHaveLength(initialUsers.length);
		});
		test("User updated should be as intended", async () => {
			const users = await UserModel.find();
			updateUser.id = users[0]._id;
			await api
				.put("/users")
				.send(updateUser)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/users");
			let updateKeys = Object.keys(updateUser).filter(
				(key) => key !== "id"
			);
			let updateValues = Object.values(updateUser).filter(
				(value) => value.length < 12
			);

			for (let key of updateKeys) {
				expect(response.body[0]).toHaveProperty(key);
			}
			for (let value of updateValues) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
		test("Invalid PUT request shouldn't update a user", async () => {
			const unvalidUser = {
				name: "juan",
			};
			await api.put("/users").send(unvalidUser).expect(400);
			const response = await api.get("/users").expect(200);
			let values = Object.values(initialUsers[0]);
			for (let value of values) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
	});
	describe("DELETE request", () => {
		test("Valid DELETE request should delete a user", async () => {
			const users = await UserModel.find();
			const id = users[0]._id;
			await api
				.delete("/users")
				.send({ id })
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/users");
			expect(response.body).toHaveLength(initialUsers.length - 1);
		});
		test("Invalid DELETE request shouldn't delete a user ", async () => {
			const unvalidUser = {
				id: "2",
			};
			await api.delete("/users").send(unvalidUser).expect(400);
			const response = await api.get("/users").expect(200);
			let values = Object.values(initialUsers[0]);
			for (let value of values) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
	});
});

describe("TEST==> /posts", () => {
	describe("GET request", () => {
		test("posts are returned as JSON", async () => {
			await api
				.get("/posts")
				.expect(200)
				.expect("Content-Type", /application\/json/);
		});

		test("Should return two posts", async () => {
			const response = await api.get("/posts");
			expect(response.body).toHaveLength(initialPosts.length);
		});
		test("Posts should have correct properties", async () => {
			const response = await api.get("/posts");
			const keys = Object.keys(initialPosts[0]);
			response.body.forEach((post) => {
				for (let key of keys) {
					expect(post).toHaveProperty(key);
				}
			});
		});
		test("Posts should be the same as initialPosts", async () => {
			const response = await api.get("/posts");
			let values1 = Object.values(initialPosts[0]);
			let values2 = Object.values(initialPosts[1]);
			values1.pop();
			values2.pop();
			for (let value of values1) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
			for (let value of values2) {
				expect(Object.values(response.body[1]).includes(value)).toBe(
					true
				);
			}
		});
	});
	describe("POST request", () => {
		const newPost = {
			title: "Testing",
			description: "Probando",
			user: "id",
		};

		test("Valid POST request should add a post into db", async () => {
			const users = await UserModel.find();
			newPost.id = users[0]._id;
			await api
				.post("/posts")
				.send(newPost)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/posts");
			expect(response.body).toHaveLength(initialUsers.length + 1);
		});
		test("Post added should be as intended", async () => {
			const users = await UserModel.find();
			newPost.id = users[0]._id;
			await api
				.post("/posts")
				.send(newPost)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/posts");
			let newPostKeys = Object.keys(newPost);
			let newPostValues = Object.values(newPost);
			newPostKeys.pop();
			newPostValues.pop();
			newPostValues.pop();
			for (let key of newPostKeys) {
				expect(
					response.body.find((post) => post.title === post.title)
				).toHaveProperty(key);
			}
			for (let value of newPostValues) {
				expect(
					Object.values(
						response.body.find(
							(post) => post.title === newPost.title
						)
					).includes(value)
				).toBe(true);
			}
		});
		test("Invalid POST request shouldn't add a post into db", async () => {
			const unvalidPost = {
				title: "juan",
			};
			await api.post("/posts").send(unvalidPost).expect(400);
			const response = await api.get("/posts").expect(200);
			expect(response.body).toHaveLength(initialPosts.length);
		});
	});

	describe("PUT request", () => {
		const updatePost = {
			title: "Nuevo testing",
			description: "Nuevo Probando",
			id: "id",
		};

		test("Valid PUT request should update a post", async () => {
			const users = await UserModel.find();
			updatePost.id = users[0]._id;
			await api
				.put("/posts")
				.send(updatePost)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/posts");
			expect(response.body).toHaveLength(initialPosts.length);
		});
		test("Post updated should be as intended", async () => {
			const users = await UserModel.find();
			updatePost.id = users[0]._id;
			await api
				.put("/posts")
				.send(updatePost)
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/posts");
			let updateKeys = Object.keys(updatePost).filter(
				(key) => key !== "user"
			);
			let updateValues = Object.values(updatePost).filter(
				(value) => value.length < 12
			);

			updateKeys.pop();
			updateValues.pop();

			for (let key of updateKeys) {
				expect(response.body[0]).toHaveProperty(key);
			}
			for (let value of updateValues) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
		test("Invalid POST request shouldn't add a user into db", async () => {
			const unvalidPost = {
				title: "juan",
			};
			await api.put("/posts").send(unvalidPost).expect(400);
			const response = await api.get("/posts").expect(200);
			let values = Object.values(initialPosts[0]);
			values.pop();
			for (let value of values) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
	});
	describe("DELETE request", () => {
		test("Valid DELETE request should delete a post", async () => {
			const posts = await PostModel.find();
			const id = posts[0]._id;
			await api
				.delete("/posts")
				.send({ id })
				.expect(200)
				.expect("Content-Type", /application\/json/);
			const response = await api.get("/posts");
			expect(response.body).toHaveLength(initialUsers.length - 1);
		});
		test("Invalid DELETE request shouldn't delete a post", async () => {
			const unvalidPost = {
				id: "2",
			};
			await api.delete("/posts").send(unvalidPost).expect(400);
			const response = await api.get("/posts").expect(200);
			let values = Object.values(initialPosts[0]);
			values.pop();
			for (let value of values) {
				expect(Object.values(response.body[0]).includes(value)).toBe(
					true
				);
			}
		});
	});
});
