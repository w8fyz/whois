const request = require('supertest');
const { setupMemoryDb, teardownMemoryDb } = require('./setupTestDb');
const app = require('../app');

describe('Auth endpoints', () => {
  beforeAll(async () => {
    await setupMemoryDb();
  });

  afterAll(async () => {
    await teardownMemoryDb();
  });

  test('POST /auth/register creates a user and returns token', async () => {
    const res = await request(app).post('/auth/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: `john_${Date.now()}@example.com`,
      password: 'Secret123!'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).not.toHaveProperty('password');
  });

  test('POST /auth/register fails on duplicate email', async () => {
    const email = `dup_${Date.now()}@example.com`;
    const payload = { firstName: 'A', lastName: 'B', email, password: 'Secret123!' };
    const first = await request(app).post('/auth/register').send(payload);
    expect(first.status).toBe(201);
    const second = await request(app).post('/auth/register').send(payload);
    expect([403, 409]).toContain(second.status);
  });

  test('POST /auth/login authenticates and returns token', async () => {
    const email = `login_${Date.now()}@example.com`;
    const password = 'Secret123!';
    await request(app).post('/auth/register').send({ firstName: 'C', lastName: 'D', email, password });
    const res = await request(app).post('/auth/login').send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login fails with wrong password', async () => {
    const email = `bad_${Date.now()}@example.com`;
    const password = 'Secret123!';
    await request(app).post('/auth/register').send({ firstName: 'E', lastName: 'F', email, password });
    const res = await request(app).post('/auth/login').send({ email, password: 'WrongPass1!' });
    expect(res.status).toBe(401);
  });
});


