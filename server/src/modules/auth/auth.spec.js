const supertest = require('supertest');
const app = require('./../../core/app');
const User = require("../user/user.model");

const seconds = 100 * 500;
jest.setTimeout(seconds);

const userData = {
    "email" : "schooladmin@gmail.com",
    "password": "Test1234"
}
const fakeData = {
    "email": "test@gmail.com",
    "password":"fsd41",
}


const newUserData = {

    "name": "testuser",
    "email": "testuser@gmail.com",
    "phoneNumber": "+201011158711",
    "password": "Test1234",
    "passwordConfirm":"Test1234"

}


const server = supertest(app);
describe('auth tests', () => {
    describe('POST /api/v1/auth/signin', () => {
        it("Should signin user", async () => {
            const res = await server.post("/api/v1/auth/signin").send(userData);
            expect(res.body.status).toEqual('success');
            expect(res.status).toBe(200)
        });
    })
});


describe('POST /api/v1/auth/signin', () => {
    it("should prevent unregister users from login", async () => {
        const res = await server.post('/api/v1/auth/signin').send(fakeData);
        expect(res.status).toBe(400);
    })
})



describe('POST /api/v1/auth/signup', () => {
    let res;
    it('should sign up new user', async () => {
        res = await server.post('/api/v1/auth/signup').send(newUserData);
        expect(res.body.status).toEqual('success');
        expect(res.status).toBe(201);
    });

    afterEach(async () => {
        if (res && res.body && res.body.content && res.body.content.data && res.body.content.data.id) {
            await User.findByIdAndDelete(res.body.content.data.id);
        }
    });
});
