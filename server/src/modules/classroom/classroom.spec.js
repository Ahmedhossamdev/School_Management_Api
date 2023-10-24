const supertest = require('supertest');
const app = require('./../../core/app');

const seconds = 100 * 500;
jest.setTimeout(seconds);

// schooladmin
const userData = {
    "email" : "schooladmin@gmail.com",
    "password": "Test1234"
}
const classRoomData = {

    "name": "Class E",
    "school_id": "65367e7f93ae4341b8f24f87"

}

const server = supertest(app);
describe('Classroom Tests', () => {
    let userToken;
    let classroomId; // Variable to store the classroom ID
    let schoolId = classRoomData.school_id;

    beforeAll(async () => {
        const res = await server.post('/api/v1/auth/signin').send(userData);
        userToken = res.body.content.meta.access_token;
    });



    describe('POST /api/v1/classroom', () => {
        it('should create classroom', async () => {
            const res = await server.post('/api/v1/classroom').set('Authorization', `Bearer ${userToken}`).send(classRoomData);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            classroomId = res.body.content.data.id;

        });
    });
    describe('POST /api/v1/classroom/school/:id', () => {
        it('Get All Classrooms in school', async () => {
            const res = await server.get('/api/v1/classroom/school/65367e7f93ae4341b8f24f87').set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });
    describe('GET /api/v1/classroom/:id/students', () => {
        it('should get all student in classroom', async () => {
            const res = await server.get('/api/v1/classroom/65368e401b483bbca516e2d4/students').set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });

    describe('GET /api/v1/classroom/:id', () => {
        it('should get classroom', async () => {
            const res = await server.get(`/api/v1/classroom/${classroomId}`).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });

    afterAll(async () => {
        // Logic for deleting the created classroom
        if (classroomId && schoolId) {
            await server.delete(`/api/v1/classroom/${classroomId}`).send({ school_id: schoolId }).set('Authorization', `Bearer ${userToken}`);
        }
    });

    //
    // describe('PUT /api/v1/school/:id', () => {
    //     it('should update school by id', async () => {
    //         const res = await server.put('/api/v1/school/65343b37f36e065520cd72bc').set('Authorization', `Bearer ${userToken}`).send(updateSchool);
    //         expect(res.status).toEqual(200);
    //         expect(res.body.status).toEqual('success');
    //     });
    // });
    //
    //
    // describe('DELETE /api/v1/school/:id', () => {
    //     it('should update school by id', async () => {
    //
    //         const res = await server.delete(`/api/v1/school/${newSchoolId.toString()}`).set('Authorization', `Bearer ${userToken}`).send(updateSchool);
    //         expect(res.status).toEqual(200);
    //         expect(res.body.status).toEqual('success');
    //     });
    // });

});

