const request = require('supertest');
const { setupMemoryDb, teardownMemoryDb } = require('./setupTestDb');
const app = require('../app');

describe('Contacts CRUD', () => {
  let token;
  let user;

  beforeAll(async () => {
    await setupMemoryDb();
    const email = `owner_${Date.now()}@example.com`;
    const password = 'Secret123!';
    const reg = await request(app).post('/auth/register').send({
      firstName: 'Owner',
      lastName: 'User',
      email,
      password
    });
    token = reg.body.token;
    user = reg.body.user;
  });

  afterAll(async () => {
    await teardownMemoryDb();
  });

  test('GET /contacts requires auth', async () => {
    const res = await request(app).get('/contacts');
    expect(res.status).toBe(401);
  });

  test('POST /contacts creates contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Alice',
        lastName: 'Smith',
        email: `alice_${Date.now()}@example.com`,
        phoneNumber: '1234567890',
        company: 'Acme',
        notes: 'VIP'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('userId');
  });

  test('GET /contacts returns user contacts', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /contacts/:id updates a contact', async () => {
    const create = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Bob', lastName: 'Jones', email: `bob_${Date.now()}@example.com`, phoneNumber: '1234567890' });
    const id = create.body._id;
    const res = await request(app)
      .put(`/contacts/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Updated Co', phoneNumber: '0987654321' });
    expect(res.status).toBe(200);
    expect(res.body.company).toBe('Updated Co');
    expect(res.body.phoneNumber).toBe('0987654321');
  });

  test('GET /contacts/:id returns a contact', async () => {
    const create = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Carol', lastName: 'Lee', email: `carol_${Date.now()}@example.com`, phoneNumber: '1234567890' });
    const id = create.body._id;
    const res = await request(app)
      .get(`/contacts/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('DELETE /contacts/:id deletes a contact', async () => {
    const create = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Dave', lastName: 'Kim', email: `dave_${Date.now()}@example.com`, phoneNumber: '1234567890' });
    const id = create.body._id;
    const res = await request(app)
      .delete(`/contacts/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});


