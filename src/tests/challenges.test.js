const request = require("supertest");
const app = require("../server"); // Import Express app

describe("Challenges API", () => {
  let challengeId;

  // Test creating a new challenge
  it("should create a new challenge", async () => {
    const newChallenge = {
      challenger: { name: "UserA", id: "123" },
      challengee: { name: "UserB", id: "456" },
      weapon: "Quiz",
      isDone: false,
    };
    const res = await request(app).post("/challenges").send(newChallenge);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    challengeId = res.body.id;
  });

  // Test fetching all challenges
  it("should fetch all challenges", async () => {
    const res = await request(app).get("/challenges/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test fetching settled challenges
  it("should fetch settled challenges", async () => {
    const res = await request(app).get("/challenges/settled");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test fetching a specific challenge by ID
  it("should fetch a challenge by ID", async () => {
    const res = await request(app).get(`/challenges/${challengeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", challengeId);
  });

  // Test updating a challenge winner
  it("should update challenge winner", async () => {
    const updateData = { winner: "UserA" };
    const res = await request(app)
      .post(`/challenges/${challengeId}`)
      .send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("winner", "UserA");
  });
});
