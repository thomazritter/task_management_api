import supertest from 'supertest';
import app from '../app.js';

describe('Health Check Endpoint', () => {
  it('should return API is running', async () => {
    const res = await supertest(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('API is running');
  });
});

describe('User Endpoints', () => {
  let testUser;
  let token;

  it('should create a user', async () => {
    const res = await supertest(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'testpass',
      });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toContain('testuser_');
    testUser = res.body.data;
  });

  it('should login and get a JWT token', async () => {
    const res = await supertest(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'testpass' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should get the created user by id', async () => {
    const res = await supertest(app)
      .get(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(testUser.email);
  });

  it('should update the user', async () => {
    const res = await supertest(app)
      .put(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User', email: testUser.email });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated User');
  });

  it('should delete the user', async () => {
    const res = await supertest(app)
      .delete(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
});

describe('Task Endpoints', () => {
  let user;
  let token;
  let task;

  beforeAll(async () => {
    // Create and login a user for task tests
    const userRes = await supertest(app)
      .post('/api/users')
      .send({
        name: 'Task User',
        email: `taskuser_${Date.now()}@example.com`,
        password: 'testpass',
      });
    user = userRes.body.data;
    const loginRes = await supertest(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: 'testpass' });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    // Clean up user
    await supertest(app).delete(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`);
  });

  it('should create a new task', async () => {
    const res = await supertest(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'A task for testing',
        assignedTo: user.id,
        status: 'pending',
      });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Test Task');
    task = res.body.data;
  });

  it('should get the created task by id', async () => {
    const res = await supertest(app)
      .get(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Test Task');
  });

  it('should update the task', async () => {
    const res = await supertest(app)
      .put(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task', description: 'Updated desc', status: 'completed' });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated Task');
    expect(res.body.data.status).toBe('completed');
  });

  it('should get tasks by user', async () => {
    const res = await supertest(app)
      .get(`/api/tasks?assignedTo=${user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((t) => t.id === task.id)).toBe(true);
  });

  it('should delete the task', async () => {
    const res = await supertest(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });
});
!(function () {
  try {
    var e =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : {},
      n = new e.Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = '58d84b13-9509-5c4b-9105-3dc0582c1a85'));
  } catch (e) {}
})();
//# debugId=58d84b13-9509-5c4b-9105-3dc0582c1a85
