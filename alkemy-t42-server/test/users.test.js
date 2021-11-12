const supertest = require('supertest');
const { app } = require('../app');
const { User } = require('../models');
// Set supertest to fake api.
const api = supertest(app);
// Request GET for /api/users
describe('API route /api/users - Request GET - Get all users', () => {
  test('Get all users without token Authorization.', async () => {
    await api
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'No token provided' });
  });

  test('Get all users with token not authorized.', async () => {
    await api
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsdGVzdDE1QGdtYWlsLmNvbSIsImlkIjoiYWJjOGNkNGUtMGJlOC00ZmNhLTk3YjctMjAzZGE4MTQ2OTFhIiwiaWF0IjoxNjE5MzgyNDc0fQ.wuII5U9ocwEe18IKROlTAQLFEHBtbi88qiDLu0_Akwk'
      )
      .expect('Content-Type', /json/)
      .expect(401, { error: 'Unauthorized' });
  });

  test('Get all users with token but user not is admin.', async () => {
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
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', userLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(403, { error: 'Admin role required' });
  });

  test('Get all users with token valid and is admin.', async () => {
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
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminLogged.body.token)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
// Request DELETE for /api/users/:id
describe('API route /api/users/:id - Request DELETE - Delete User', () => {
  test('User do not exist. ID not is valid.', async () => {
    await api
      .delete('/api/users/1000')
      .set('Content-Type', 'application/json')
      .expect(404);
  });

  test('Create an user and remove.', async () => {
    // Make a new user with model on sequelize.
    const user = await User.create({
      firstName: 'TestDelete',
      lastName: 'JestDelete',
      email: 'testjestDelete@gmail.com',
      password: '12345678',
      roleId: 2
    });
    // Delete new user.
    await api
      .delete(`/api/users/${user.dataValues.id}`)
      .set('Content-Type', 'application/json')
      .expect(204);
  });
});
