const app = require("../src/app");
const session = require("supertest-session");
const agent = session(app);

//jest.useFakeTimers();

afterAll((done) => {
	setTimeout(done);
});

describe("Testing DEFAULT", () => {
	test("Testing default route /", () => {
		agent.get("/").then((res) => {
			expect(res.body.message).toBe("Cannot GET");
		});
	});
});

describe("Testing /users", () => {
	test("GET responds with 200", () => {
		agent.get("/users").expect(200);
	});
	test("GET responds with an array containing users", async () => {
		agent.get("/users").then((res) => {
			expect(typeof res.body.message).toBe("array");
		});
	});
});
