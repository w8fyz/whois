const request = require('supertest');
const app = require('../app');

async function registerAndLoginUser(overrides = {}) {
  const user = {
    firstName: 'Test',
    lastName: 'User',
    email: overrides.email || `user_${Date.now()}@test.com`,
    password: overrides.password || 'P@ssw0rd!'
  };

  const registerRes = await request(app).post('/auth/register').send(user);
  expect(registerRes.status).toBe(201);
  const token = registerRes.body.token;
  const createdUser = registerRes.body.user;
  return { token, user: createdUser };
}

module.exports = { app, registerAndLoginUser };


