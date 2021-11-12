const supertest = require('supertest');
const { app } = require('../app');

const api = supertest(app);


describe("Testing API route /api/news - Request GET all news", () => {
    test("Trying to get all news without token", async () => {
        await api
            .get("/api/news")
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, { error: 'No token provided' });
    });

    test("Trying to get all news with token", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });
        await api
            .get("/api/news")
            .set("Content-Type", "application/json")
            .set("Authorization", userLogged.body.token)
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe("API route /api/news/:id - Request GET", () => {
    test("Trying to get a new without providing a token", async () => {
        await api
            .get("/api/news/1")
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, { error: 'No token provided' });
    })
    test("Tryng to get a new with token", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });
        await api
            .get("/api/news/1")
            .set("Content-Type", "application/json")
            .set("Authorization", userLogged.body.token)
            .expect('Content-Type', /json/)
            .expect(200)
    })
    test("Tryng to get a new with wrong id", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });
        await api
            .get("/api/news/wrong_id")
            .set("Content-Type", "application/json")
            .set("Authorization", userLogged.body.token)
            .expect("Content-Type", /json/)
            .expect(404, { Error: "Entry not found" })
    })
})

describe("API route /api/news/ - Request POST", () => {
    test("Sending request without token", async () => {
        const entryData = {
            name: "test",
            content: "This is me just testing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        await api
            .post("/api/news")
            .set('Content-Type', 'application/json')
            .send(entryData)
            .expect(400, { error: 'No token provided' });



    });

    test("Sending request with no admin token", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });

        const entryData = {
            name: "test",
            content: "This is me just testing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        await api
            .post("/api/news")
            .set('Content-Type', 'application/json')
            .set("Authorization", userLogged.body.token)
            .send(entryData)
            .expect(403, { error: 'Admin role required' });
    })

    test("Sending empty request", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });

        await api
            .post("/api/news")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .expect(422);
    })
    test("Sending good request with right token", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });

        const entryData = {
            name: "test",
            content: "This is me just testing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        const res = await api
            .post("/api/news")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .send(entryData)
            .expect(201);

        const entry = res.body;
        console.log(entry);

        expect(entry).toEqual(expect.objectContaining(entryData));

    })

})

describe("API route /api/news/:id - Request PUT", () => {
    test("Sending request without token", async () => {
        const entryData = {
            name: "test",
            content: "This is me just testing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        await api
            .put("/api/news/1")
            .set('Content-Type', 'application/json')
            .send(entryData)
            .expect(400, { error: 'No token provided' });
    })
    test("Sending request with no token admin", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });

        const entryData = {
            name: "test",
            content: "This is me just testing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        await api
            .put("/api/news/1")
            .set('Content-Type', 'application/json')
            .set("Authorization", userLogged.body.token)
            .send(entryData)
            .expect(403, { error: 'Admin role required' });
    })
    test("Sending empty request", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });

        await api
            .put("/api/news/1")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .expect(422);
    })

    test("Sending request with wrong id", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });
        const entryData = {
            name: "test",
            content: "This is me just editing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        await api
            .put("/api/news/wrong_id")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .send(entryData)
            .expect(404, { Error: "Entry not found" });

    })
    test("Sending good request with right token", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });

        const entryData = {
            name: "test",
            content: "This is me just editing the new's endpoint",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        }

        const res = await api
            .put("/api/news/1")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .send(entryData)
            .expect(200);

        const entry = res.body;

        expect(entry).toEqual(expect.objectContaining(entryData));

    })
})

describe("API route /api/news/:id - Request DELETE", () => {
    test("Sending request without token", async () => {
        await api
            .delete("/api/news/1")
            .set('Content-Type', 'application/json')
            .expect(400, { error: 'No token provided' });
    })
    test("Sending request with no token admin", async () => {
        const userLogged = await api
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: "user@mail.com",
                password: "123456"
            });

        await api
            .delete("/api/news/1")
            .set('Content-Type', 'application/json')
            .set("Authorization", userLogged.body.token)
            .expect(403, { error: 'Admin role required' });
    })
    test("Sending request with wrong id", async () => {
        const adminLogged = await api
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "admin@mail.com",
                "password": "123456"
            });

        await api
            .delete("/api/news/wrong_id")
            .set('Content-Type', 'application/json')
            .set('Authorization', adminLogged.body.token)
            .expect(404, { Error: "Entry not found" });

    })
    test("Sending request with valid id", async() =>{
        const adminLogged = await api
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            "email": "admin@mail.com",
            "password": "123456"
        });

        const entry = await api
        .post("/api/news")
        .set("Content-Type", "application/json")
        .set("Authorization", adminLogged.body.token)
        .send({
            name: "test",
            content: "This is the entry's content",
            image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            categoryId: 1,
            type: "Event"
        })
        .expect(201)

        await api
            .delete(`/api/news/${entry.body.id}`)
            .set("Content-Type", "application/json")
            .set("Authorization", adminLogged.body.token)
            .expect(200, '"Entry successfully deleted"')
    })
})