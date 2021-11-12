const supertest = require('supertest');
const { app } = require('../app');

const api = supertest(app)

describe('API route /api/members GET', () => {
    //Get all members
    test('Get all members', async () => {
        await api
            .get('/api/members')
            .expect(200)
    });
});

describe('API route /api/members POST', () => {
    //Creation test fails
    test('Creating a member without name beeing an admin should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .post('/api/members')
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                image: 'image.jpg'
            })
            .expect(422)
    });

    test('Creating a member without image beeing an admin should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .post('/api/members')
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                name: 'Mark'
            })
            .expect(422)
    });

    test('Creating a member beeing an user should fail', async () => {
        const user = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'user@mail.com',
                password: '123456'
            })
        await api
            .post('/api/members')
            .set('Content-Type', 'application/json')
            .set('Authorization', user.body.token)
            .send({
                name: 'Mark',
                image: 'image.jpg'
            })
            .expect(403)
    });

    test('Creating a member without a token should fail', async () => {
        await api
            .post('/api/members')
            .send({
                name: 'Mark',
                image: 'image.jpg'
            })
            .expect(400)
    });

    //Creation test succeed
    test('Creating a member beeing admin should succeed', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .post('/api/members')
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                name: 'Mark',
                image: 'image.jpg'
            })
            .expect(201)
    });
});

describe('API route /api/members/:id - PUT', () => {
    //Edit tests fail
    test('Editing a member beeing an user should fail', async () => {
        const user = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'user@mail.com',
                password: '123456'
            })
        await api
            .put('/api/members/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', user.body.token)
            .send({
                name: 'Mark edited',
                image: 'image.jpg'
            })
            .expect(403)
    });

    test('Editing a member without "name" beeing an admin should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .put('/api/members/2')
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                image: 'imageEdited.jpg',
            })
            .expect(422)
    });

    test('Editing a member without "image" beeing an admin should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .put('/api/members/2')
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                name: 'Mark edited',
            })
            .expect(422)
    });

    test('Editing a member that does not exist should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .put('/api/members/99') //this member doesn't exist
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                name: 'Mark edited',
                image: 'imageEdited.jpg'
            })
            .expect(404)
    });

    //Edit test succeed
    test('Editing a member beeing an admin should succeed', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })

        await api
            .put(`/api/members/1`)
            .set('Content-Type', 'application/json')
            .set('Authorization', admin.body.token)
            .send({
                name: 'Mark edited',
                image: 'iamgeEditada.jpg'
            })
            .expect(200)
    });
});

describe('API route api/members/:id DELETE', () => {

    //Delete test fail
    test('Deleting a member that does not exist should fail', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
        await api
            .delete('/api/members/99') //This memeber doesn't exist
            .set('Authorization', admin.body.token)
            .expect(404)
    });

    test('Deleting a member beeing an user should fail', async () => {
        const user = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'user@mail.com',
                password: '123456'
            })
        await api
            .delete('/api/members/2')
            .set('Authorization', user.body.token)
            .expect(403)
    });

    //Delete test succeed
    test('Deleting a member beeing an admin should succeed', async () => {
        const admin = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })

        const { body } = await api
            .get('/api/members')
        const { allMembers } = body

        await api
            .delete(`/api/members/${allMembers[1].id}`)
            .set('Authorization', admin.body.token)
            .expect(204)
    });
});
