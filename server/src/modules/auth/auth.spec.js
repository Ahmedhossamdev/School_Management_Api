const supertest = require('supertest');
const app = require('./../../core/app');
const User = require("../user/user.model");

const seconds = 100 * 500;
jest.setTimeout(seconds);

const userData = {
    "email" : "ahmedhossamdev1@gmail.com",
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
            expect(res.body.status).toEqual(true);
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
    let res1;
    it('should sign up new user', async () => {
        res1 = await server.post('/api/v1/auth/signup').send(newUserData);
        expect(res1.body.status).toEqual(true);
        expect(res1.status).toBe(201);
    });

    it('should say the email already exists', async () => {
        const res2 = await server.post('/api/v1/auth/signup').send(newUserData);
        expect(res2.body.status).toEqual(false);
        expect(res2.status).toBe(400);
    });

    afterEach(async () => {
        // Add cleanup logic here if necessary
        if (res1 && res1.body && res1.body.user && res1.body.user._id) {
            await User.findByIdAndDelete(res1.body.user._id);
        }
    });

});
