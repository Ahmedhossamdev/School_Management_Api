const supertest = require('supertest');
const app = require('./../../core/app');

const seconds = 100 * 500;
jest.setTimeout(seconds);

// superadmin
const userData = {
    "email" : "ahmedhossamdev1@gmail.com",
    "password": "Test1234"
}


const school = {
    "name":"TestSchool",
    "address":"Damnhour, Egypt",
    "website": "www.Test.com",
    "contactNumber":"+201121128781",
    "establishedYear":2015
}

const updateSchool = {
    "name": "Test Update School",
}
let newSchoolId;

const server = supertest(app);
describe('Comment Tests', () => {
    let userToken;
    beforeAll(async () => {
        const res = await server.post('/api/v1/auth/signin').send(userData);
        userToken = res.body.content.meta.access_token;
    });

    describe('POST /api/v1/school', () => {
        it('should create new school', async () => {
            const res = await server.post('/api/v1/school').set('Authorization', `Bearer ${userToken}`).send(school);
            newSchoolId = res.body.content.data.id;
            expect(res.status).toEqual(201);
            expect(res.body.status).toEqual(true);
        });
    });
    describe('GET /api/v1/school', () => {
        it('should get all schools', async () => {
            const res = await server.get('/api/v1/school').set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual(true);
        });
    });
    describe('GET /api/v1/school/:id', () => {
        it('should get school by id', async () => {
            const res = await server.get('/api/v1/school/65343b37f36e065520cd72bc').set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual(true);
        });
    });

    describe('PUT /api/v1/school/:id', () => {
        it('should update school by id', async () => {
            const res = await server.put('/api/v1/school/65343b37f36e065520cd72bc').set('Authorization', `Bearer ${userToken}`).send(updateSchool);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual(true);
        });
    });


    describe('DELETE /api/v1/school/:id', () => {
        it('should update school by id', async () => {

            const res = await server.delete(`/api/v1/school/${newSchoolId.toString()}`).set('Authorization', `Bearer ${userToken}`).send(updateSchool);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual(true);
        });
    });

});

