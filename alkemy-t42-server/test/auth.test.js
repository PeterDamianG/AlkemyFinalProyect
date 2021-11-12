const supertest = require('supertest');
const { app } = require('../app');

let api;

describe('/api/auth tests', () => {
  beforeAll(() => {
    api = supertest(app);
  });

  test('/api/auth/login - login as regular user', async () => {
    const res = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      })
      .expect(200);

    const { user } = res.body;

    expect(user).toEqual(expect.objectContaining({
      email: 'user@mail.com',
      roleId: 2 // regular user
    }));
  });

  test('/api/auth/login - login as admin', async () => {
    const res = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      })
      .expect(200);

    const { user } = res.body;

    expect(user).toEqual(expect.objectContaining({
      email: 'admin@mail.com',
      roleId: 1 // admin user
    }));
  });

  test('/api/auth/login - send login api call with missing fields', async () => {
    await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com'
      })
      .expect(400);
  });

  test('/api/auth/login - send login api call with bad credentials', async () => {
    await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: 'wrong_password'
      })
      .expect(401);
  });


  test('/api/auth/register - create account', async () => {
    const email = `user${require('crypto').randomInt(1, 10000)}@mail.com`;
    const res = await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email,
        password: '123456'
      })
      .expect(201);

    const { user } = res.body;

    expect(user).toEqual(expect.objectContaining({
      email,
      roleId: 2 // regular user
    }));
  });

  test('/api/auth/register - send register api call with missing fields', async () => {
    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com'
      })
      .expect(400);
  });

  test('/api/auth/register - send register api call with duplicated email', async () => {
    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@mail.com',
        password: '123456'
      })
      .expect(400);
  });

  test('/api/auth/me - get info about logged in user', async () => {
    const email = 'user@mail.com';
    const { body: loginResult } = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password: '123456'
      })
      .expect(200);

    const { body: userInfo } = await api
      .get('/api/auth/me')
      .set('Content-Type', 'application/json')
      .set('Authorization', loginResult.token)
      .expect(200);

    expect(userInfo).toEqual(expect.objectContaining({
      email,
      roleId: 2 // regular user
    }));
  });

  test('/api/auth/me - test without logging in', async () => {
    await api
      .get('/api/auth/me')
      .set('Content-Type', 'application/json')
      .expect(400);
  });
});
