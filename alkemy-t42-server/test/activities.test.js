const supertest = require('supertest');
const { app } = require('../app');
const { Activity } = require('../models');
// Set supertest to fake api.
const api = supertest(app);

//GET Request Activities

describe('GET Request to api/activities', () => {
  test('GET all activities', async () => {
    await api.get('/api/activities').expect('Content-Type', /json/).expect(200);
  });
  test('GET one activity', async () => {
    const activity = await Activity.create({
      name: 'jest test',
      image: 'jesttesturl.com',
      content: 'jest content'
    });
    await api
      .get(`/api/activities/${activity.dataValues.id}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('GET an activity that doesnt exist', async () => {
    await api.get('/api/activities/-1').expect(404);
  });
});

//PUT Request Activities

describe('PUT Request to api/activities/:id', () => {
  test('PUT activity without token', async () => {
    await api
      .put('/api/activities/1')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });
  test('PUT activity with invalid token', async () => {
    await api
      .put('/api/activities/1')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .set('Authorization', 'testtoken123')
      .expect(401, { error: 'Unauthorized' });
  });
  test('PUT activity with token but without admin role', async () => {
    // Get a valid session to test token
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .put('/api/activities/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });
  test('PUT activity with token and admin role', async () => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    const activity = await Activity.create({
      name: 'jest test',
      image: 'jesttesturl.com',
      content: 'jest content'
    });
    await api
      .put(`/api/activities/${activity.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .send({
        name: 'activity 1 test',
        image: 'urltestactivity1.com',
        content: 'content activity 1 test'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'activity 1 test',
          image: 'urltestactivity1.com',
          content: 'content activity 1 test',
          deleteAt: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

//POST Request Activities

describe('POST Request to api/activities', () => {
  test('POST activity without token', async () => {
    await api
      .post('/api/activities')
      .set('Content-Type', 'application/json')
      .send({
        name: 'create activity jest',
        image: 'urlpostjest.com',
        content: 'content activity post jest'
      })
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });
  test('POST activity with invalid token', async () => {
    await api
      .post('/api/activities')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testtoken123')
      .send({
        name: 'create activity jest',
        image: 'urlpostjest.com',
        content: 'content activity post jest'
      })
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });
  test('POST activity with token but without admin role', async () => {
    // Get a valid session to test token
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .post('/api/activities')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .send({
        name: 'create activity jest',
        image: 'urlpostjest.com',
        content: 'content activity post jest'
      })
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });
  test('POST activity with token and admin role', async () => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    await api

      .post('/api/activities')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .send({
        name: 'create activity jest',
        image: 'urlpostjest.com',
        content: 'content activity post jest'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'create activity jest',
          image: 'urlpostjest.com',
          content: 'content activity post jest',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

//DELETE Request activities

describe('DELETE Request to api/activities/:id', () => {
  test('DELETE activity without token', async () => {
    await api
      .delete('/api/activities/1')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });
  test('DELETE activity with invalid token', async () => {
    await api
      .delete('/api/activities/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testtoken123')
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });
  test('DELETE activity with token but without admin role', async () => {
    // Get a valid session to test token
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .delete('/api/activities/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });
  test('DELETE activity with token and admin role', async () => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    const activity = await Activity.create({
      name: 'jest test',
      image: 'jesttesturl.com',
      content: 'jest content'
    });
    await api
      .delete(`/api/activities/${activity.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect(204);
  });
});
