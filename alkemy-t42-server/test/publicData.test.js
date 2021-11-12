const supertest = require('supertest');
const { app } = require('../app');

let api;

describe('/api/organizations tests', () => {
  beforeAll(() => {
    api = supertest(app);
  });

  test('GET /organizations/1/public - get public data', async () => {
    const { body: data } = await api.get('/api/organizations/1/public')
      .expect(200);
    expect(data.publicData).toEqual(expect.objectContaining({
      name: 'Somos Más'
    }));
  });

  test('PUT /organizations/1/public - reject if trying to update data without permissions', async () => {
    await api.put('/api/organizations/1/public')
      .expect(400);
  });

  test('PUT /organizations/1/public - update data', async () => {
    const { body: loginResult } = await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      })
      .expect(200);

    const newData = {
      name: 'Somos Más',
      image: 'https://cdn-sp.radionacional.com.ar/wp-content/uploads/2017/04/ONG.png',
      phone: '1160112988',
      address: 'Address 1234, 0000 example',
      welcomeText: 'Welcome text example',
      facebook: 'https://www.facebook.com/Somos_Más',
      linkedin: 'https://www.linkedin.com/in/Somos_Más/',
      instagram: 'https://www.instagram.com/SomosMás',     
    }

    const { body: data } = await api
      .put('/api/organizations/1/public')
      .set('Content-Type', 'application/json')
      .set('Authorization', loginResult.token)
      .send(newData)
      .expect(200);

    expect(data).toEqual(expect.objectContaining(newData));
  });
});
