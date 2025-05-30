import request from 'supertest';
import app from '../src/app.js';

describe('Task Management API', () => {
  describe('Users Endpoints', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/api/users').send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should fetch a user by ID', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('id');
    });
  });

  describe('Tasks Endpoints', () => {
    it('should create a new task', async () => {
      const res = await request(app).post('/api/tasks').send({
        title: 'Test Task',
        description: 'This is a test task',
        assignedTo: 1,
        status: 'pending'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should fetch a task by ID', async () => {
      const res = await request(app).get('/api/tasks/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('id');
    });
  });
});