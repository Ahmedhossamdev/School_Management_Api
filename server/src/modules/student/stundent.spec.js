const supertest = require('supertest');
const app = require('./../../core/app');

const server = supertest(app);

// schooladmin
const userData = {
    "email" : "schooladmin@gmail.com",
    "password": "Test1234"
}


const newStudentData = {
    "name": "TestStudent",
    "email":"tesstStudent@gmail.com",
    "age": "8",
    "gender": "male",
    "address":"Alexandria, Egypt",
    "contactNumber":"01311101010",
    "school_id": "65367e7f93ae4341b8f24f87"
}

const updateStudent = {
    "name" : 'John Doe Test',
}
describe('Student API Tests', () => {
    let studentId;
    let schoolId = newStudentData.school_id;

    beforeAll(async () => {
        const res = await server.post('/api/v1/auth/signin').send(userData);
        userToken = res.body.content.meta.access_token;
        userId = res.body.content.data.id;
    });

    describe('POST /api/v1/student', () => {
        it('should add student to school', async () => {
            const res = await server.post('/api/v1/student').send(newStudentData).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            studentId = res.body.content.data.id;
        });
    });

    describe('GET /api/v1/student/:id', () => {
        it('should get student by ID', async () => {
            const res = await server.get(`/api/v1/student/${studentId}`).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });

    describe('GET /api/v1/student/school/:id', () => {
        it('should get all students in school', async () => {
            const res = await server.get(`/api/v1/student/school/${schoolId}`).set('Authorization', `Bearer ${userToken}`); // Replace with actual school ID
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });

    describe('PUT /api/v1/student/:id', () => {
        it('should update student', async () => {
            const res = await server.put(`/api/v1/student/${studentId}`).set('Authorization', `Bearer ${userToken}`).send(updateStudent);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        });
    });

    describe('DELETE /api/v1/student/:id', () => {
        it('should delete student', async () => {
            const res = await server.delete(`/api/v1/student/${studentId}`).set('Authorization', `Bearer ${userToken}`);
            expect(res.status).toEqual(204);
        });
    });
});
