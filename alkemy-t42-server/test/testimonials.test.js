const supertest = require('supertest');
const { app } = require('../app');
const { Testimony } = require('../models');
  
// Set supertest to fake api.
const api = supertest(app);

// Request GET for /api/users
describe('API route /api/testimonials - Request GET - Get all testomonies', () => {
  test('Get all testimonies without token Authorization.', async () => {
    await api
      .get('/api/testimonials')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });

  test('Get all testimonies with token not authorized.', async () => {
    await api
      .get('/api/testimonials')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyNTY5MjQxMywiaWF0IjoxNjI1NjkyNDEzfQ.2dWAo7gqeGIrjjdo1q0accWABPfg7dQ_Zz73LSWuscw'
      )
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });

  test('Get testimonies with token', async () => {
    const userLogged = await api
      .post('/api/auth/login/')
      .set('Content-Type', 'application/json')  
      .send({
        email: 'user@mail.com',
        password: '123456'
      });

    await api
      .get('/api/testimonials')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(200);     
  });
});

describe('API route /api/testimonial - Request POST - Post Testimony', () => {
  test('Post without being an admin', async() => {
    await api
      .post('/api/testimonials')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testtoken123')
      .send({
        name: 'Create a testimony',
        image: 'urlpostjest.com',
        content: 'content testimony post jest'
      })
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });

  test('POST testimony with token but without admin role', async() => {
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .post('/api/testimonials')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .send({
        name: 'create testimony jest',
        image: 'urlpostjest.com',
        content: 'content testimony post jest'
      })
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });

  test('Post being an admin and not fulfill fields requierements', async() => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    await api
      .post('/api/testimonials')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .send({
        name: 'do',
        image: 'do',
        content: 'content testimony post jest'
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('Post being an admin and more than fifty characters', async() => {
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
        name: 'create a testimony jest',
        image: 'urlpostjest.com',
        content: 'content testimony post jest with more than 50'
      });
  });
});

describe('API route /api/testimonial - Request PUT - Put Testimony', () => {
  test('Testimony do not exist. ID not is valid.', async() => {
    await api
      .put('/api/testimonials/9001')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testingwithjest')
      .expect('Content-Type', /json/)
      .expect(401);
  });
  
  test('Put without being an admin', async() => {
    await api
      .put('/api/testimonials/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testingwithjestandnotanadmin')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  test('PUT testimony with token and admin role', async () => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    const testimony = await Testimony.create({
      name: 'jet set',
      image: 'jesttesturl.com',
      content: 'jest content'
    });
    await api
      .put(`/api/testimonials/${testimony.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .send({
        name: 'changed jet set',
        image: 'urltestchanged.com',
        content: 'content testimony 1 test changed to another expresion'
      })
      .expect('Content-Type', /json/)
      .expect(200)
  });
})

describe('API route /api/testimonial/:id - Request DELETE - Delete Testimony', () => {
  test('Testimony do not exist. ID not is valid.', async () => {
    await api
      .delete('/api/testimonials/9001')
      .set('Content-Type', 'application/json')
      .expect(400);
  });

  test('DELETE testimony with token but without admin role', async () => {
    // Get a valid session to test token
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .delete('/api/testimonials/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });

  test('DELETE testimony with token and admin role', async () => {
    const testimony = await Testimony.create({
      name: 'jest test',
      image: 'jesttesturl.com',
      content: 'jest content'
    });
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    await api
      .delete(`/api/testimonials/${testimony.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect(204);
  });
});


