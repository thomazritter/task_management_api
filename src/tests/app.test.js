import supertest from "supertest";
import app from "../app.js";

describe("Health Check Endpoint", () => {
  it("should return API is running", async () => {
    const res = await supertest(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("API is running");
  });
});

describe("User Endpoints", () => {
  let testUser;

  it("should create a user", async () => {
    const res = await supertest(app)
      .post("/api/users")
      .send({ name: "Test User", email: `testuser_${Date.now()}@example.com`, password: "testpass" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toContain("testuser_");
    testUser = res.body.data;
  });

  it("should get the created user by id", async () => {
    // Create user first
    const createRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Test User", email: `testuser_${Date.now()}@example.com`, password: "testpass" });
    const user = createRes.body.data;
    const res = await supertest(app).get(`/api/users/${user.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(user.email);
    // Clean up
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should update the user", async () => {
    // Create user first
    const createRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Test User", email: `testuser_${Date.now()}@example.com`, password: "testpass" });
    const user = createRes.body.data;
    const res = await supertest(app)
      .put(`/api/users/${user.id}`)
      .send({ name: "Updated User", email: user.email });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Updated User");
    // Clean up
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should delete the user", async () => {
    // Create user first
    const createRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Test User", email: `testuser_${Date.now()}@example.com`, password: "testpass" });
    const user = createRes.body.data;
    const res = await supertest(app).delete(`/api/users/${user.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});

describe("Task Endpoints", () => {
  it("should create a new task", async () => {
    // Create user first
    const userRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Task User", email: `taskuser_${Date.now()}@example.com`, password: "testpass" });
    const user = userRes.body.data;
    const res = await supertest(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "A task for testing",
        assignedTo: user.id,
        status: "pending"
      });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Test Task");
    // Clean up
    await supertest(app).delete(`/api/tasks/${res.body.data.id}`);
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should get the created task by id", async () => {
    // Create user and task first
    const userRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Task User", email: `taskuser_${Date.now()}@example.com`, password: "testpass" });
    const user = userRes.body.data;
    const taskRes = await supertest(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "A task for testing",
        assignedTo: user.id,
        status: "pending"
      });
    const task = taskRes.body.data;
    const res = await supertest(app).get(`/api/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("Test Task");
    // Clean up
    await supertest(app).delete(`/api/tasks/${task.id}`);
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should update the task", async () => {
    // Create user and task first
    const userRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Task User", email: `taskuser_${Date.now()}@example.com`, password: "testpass" });
    const user = userRes.body.data;
    const taskRes = await supertest(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "A task for testing",
        assignedTo: user.id,
        status: "pending"
      });
    const task = taskRes.body.data;
    const res = await supertest(app)
      .put(`/api/tasks/${task.id}`)
      .send({ title: "Updated Task", description: "Updated desc", status: "completed" });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("Updated Task");
    expect(res.body.data.status).toBe("completed");
    // Clean up
    await supertest(app).delete(`/api/tasks/${task.id}`);
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should get tasks by user", async () => {
    // Create user and task first
    const userRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Task User", email: `taskuser_${Date.now()}@example.com`, password: "testpass" });
    const user = userRes.body.data;
    const taskRes = await supertest(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "A task for testing",
        assignedTo: user.id,
        status: "pending"
      });
    const task = taskRes.body.data;
    const res = await supertest(app).get(`/api/tasks?assignedTo=${user.id}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some(t => t.id === task.id)).toBe(true);
    // Clean up
    await supertest(app).delete(`/api/tasks/${task.id}`);
    await supertest(app).delete(`/api/users/${user.id}`);
  });

  it("should delete the task", async () => {
    // Create user and task first
    const userRes = await supertest(app)
      .post("/api/users")
      .send({ name: "Task User", email: `taskuser_${Date.now()}@example.com`, password: "testpass" });
    const user = userRes.body.data;
    const taskRes = await supertest(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "A task for testing",
        assignedTo: user.id,
        status: "pending"
      });
    const task = taskRes.body.data;
    const res = await supertest(app).delete(`/api/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
    // Clean up user
    await supertest(app).delete(`/api/users/${user.id}`);
  });
});
