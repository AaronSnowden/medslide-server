const request = require("supertest");
const app = require("../../app"); // Import Express app
const path = require("path");

describe("Courses API", () => {
  let courseId;

  // Test creating a new course
  it("should create a new course", async () => {
    const newCourse = {
      title: "Test Course",
      description: "This is a test course",
    };
    const res = await request(app).post("/courses").send(newCourse);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    courseId = res.body.id;
  });

  // Test getting all courses
  it("should fetch all courses", async () => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test getting a specific course by ID
  it("should fetch a course by ID", async () => {
    const res = await request(app).get(`/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", courseId);
  });

  // Test updating a course topic
  it("should update course topic", async () => {
    const updateData = { topic: "Updated Topic" };
    const res = await request(app)
      .post(`/courses/${courseId}`)
      .send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("topic", "Updated Topic");
  });

  // Test file upload (assuming the endpoint accepts file uploads)
  it("should upload a file", async () => {
    const res = await request(app)
      .post("/courses/uploadFile")
      .attach("file", path.join(__dirname, "testFile.txt"));
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "File uploaded successfully");
  });

  // Test PDF upload (assuming the endpoint accepts PDF uploads)
  it("should upload a PDF", async () => {
    const res = await request(app)
      .post("/courses/uploadPdf")
      .attach("pdf", path.join(__dirname, "testFile.pdf"));
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "PDF uploaded successfully");
  });

  // Test deleting a course topic
  it("should delete a course topic", async () => {
    const res = await request(app)
      .delete("/courses/topics")
      .send({ topicId: "12345" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Topic deleted successfully");
  });
});
