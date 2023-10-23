const supertest = require('supertest');
const app = require('./../../core/app');

const server = supertest(app);

// superadmin
const userData = {
    "email" : "superadmin@gmail.com",
    "password": "Test1234"
}


const updatedUserData = {
    "role" : "superadmin"
}
describe('User Tests', () => {
    let  userToken;
    let userId;

    beforeAll(async () => {
        const res = await server.post('/api/v1/auth/signin').send(userData);
        userToken = res.body.content.meta.access_token;
        userId = res.body.content.data.id;
    });


    describe('GET /api/v1/user/:id', () => {
        it('should get a specific user', async () => {
            const res = await server.get(`/api/v1/user/${userId}`).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            // Add more specific checks for the user data here
        });
    });

    describe('PUT /api/v1/user/:id', () => {
        it('should update a user', async () => {
            const updatedUserData = {
                // Insert the necessary updated user data
            };
            const res = await server.put(`/api/v1/user/${userId}`).set('Authorization', `Bearer ${userToken}`).send(updatedUserData);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            // Add more specific checks for the updated user data here
        });
    });

    describe('GET /api/v1/user/me', () => {
        it('should get the current user', async () => {
            const res = await server.get(`/api/v1/user/me`).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            // Add more specific checks for the current user data here
        });
    });
    // describe('DELETE /api/v1/users/:id', () => {
    //     it('should delete a user', async () => {
    //         const res = await server.delete(`/api/v1/user/${userId}`).set('Authorization', `Bearer ${userToken}`);
    //         expect(res.status).toEqual(200);
    //         expect(res.body.status).toEqual('success');
    //     });
    // });


});
