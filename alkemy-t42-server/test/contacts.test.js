const supertest = require('supertest');
const { app } = require('../app');
const { Contact } = require('../models');
// Set supertest to fake api.
const api = supertest(app);

// Request GET for /api/contacts
describe('API route /api/contacts - Request GET - Get all contacts', () => {
  test('Get all contacts without token Authorization.', async () => {
    await api
      .get('/api/contacts')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });

  test('Get all contacts with token not authorized.', async () => {
    await api
      .get('/api/contacts')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsdGVzdDE1QGdtYWlsLmNvbSIsImlkIjoiYWJjOGNkNGUtMGJlOC00ZmNhLTk3YjctMjAzZGE4MTQ2OTFhIiwiaWF0IjoxNjE5MzgyNDc0fQ.wuII5U9ocwEe18IKROlTAQLFEHBtbi88qiDLu0_Akwk'
      )
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });

  test('Get all contacts with token but user not is admin.', async () => {
    // Login with normal user.
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    // Check api with userLogged.body.token
    await api
      .get('/api/contacts')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });

  test('Get all contacts with token valid and is admin.', async () => {
    // Login with admin user.
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    // Check api with adminLogged.body.token
    await api
      .get('/api/contacts')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

// Request POST for /api/contacts

describe('API route /api/contacts POST', () => {
  // Check Middleware
  test('Creating a contact with name fail', async () => {
    await api
      .post('/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'M'
      })
      .expect(422);
  });
  test('Creating a contact with email fail', async () => {
    await api
      .post('/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Jorge',
        email: ''
      })
      .expect(422);
  });
  test('Creating a contact with message fail', async () => {
    await api
      .post('/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Jorge',
        email: 'jorge@mail.com',
        message: 'fail'
      })
      .expect(422);
  });
  // Check Create Success
  test('Creating a contact success', async () => {
    await api
      .post('/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Jorge',
        email: 'jorge@mail.com',
        message: 'Esto es un test de prueba'
      })
      .expect(201);
  });
});
// DELETE Request contact

describe('DELETE Request to api/contacts/:id', () => {
  test('DELETE contact without token', async () => {
    await api
      .delete('/api/contacts/1')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });
  test('DELETE contact with invalid token', async () => {
    await api
      .delete('/api/contacts/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'testtoken123')
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });
  test('DELETE contact with token but without admin role', async () => {
    // Get a valid session to test token
    const userLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@mail.com',
        password: '123456'
      });
    await api
      .delete('/api/contacts/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });
  test('Contact do not exist. ID not is valid.', async () => {
    // Login with admin user.
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    await api
      .delete('/api/contacts/2000')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect(404);
  });

  test('Create an contact and remove.', async () => {
    const adminLogged = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      });
    // Make a new contact with model on sequelize.
    const contact = await Contact.create({
      name: 'TestDelete',
      email: 'testjestDelete@gmail.com',
      message: 'Esto es un test'
    });
    // Delete new contact.
    await api
      .delete(`/api/contacts/${contact.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect(204);
  });
});
