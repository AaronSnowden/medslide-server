const request = require("supertest");
const app = require("../../app"); // Import Express app

describe("Users API", () => {
  let userId;
  let userEmail = "testuser@example.com";
  let token = "testToken123"; // Mock token for authentication

  // Test creating a new user
  it("should create a new user", async () => {
    const newUser = { name: "Test User", email: userEmail, password: "123456" };
    const res = await request(app).post("/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  // Test authenticating a user
  it("should authenticate a user", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  // Test getting all users
  it("should fetch all users", async () => {
    const res = await request(app).get("/users/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test getting a user by ID
  it("should fetch a user by ID", async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", userId);
  });

  // Test getting a user by email
  it("should fetch a user by email", async () => {
    const res = await request(app)
      .get(`/users/email`)
      .query({ email: userEmail });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", userEmail);
  });

  // Test updating a user
  it("should update user details", async () => {
    const updatedUser = { name: "Updated Name", email: userEmail };
    const res = await request(app).post(`/users/${userId}`).send(updatedUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Updated Name");
  });

  // Test updating user token
  it("should update user token", async () => {
    const res = await request(app)
      .post("/user/token")
      .send({ userId, token: "newTestToken" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Token updated");
  });

  // Test following a user
  it("should follow a user", async () => {
    const followData = { followerId: userId, followingId: "otherUserId" };
    const res = await request(app).post("/users/follow").send(followData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User followed");
  });

  // Test unfollowing a user
  it("should unfollow a user", async () => {
    const unfollowData = { followerId: userId, followingId: "otherUserId" };
    const res = await request(app).post("/users/unfollow").send(unfollowData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User unfollowed");
  });
});
