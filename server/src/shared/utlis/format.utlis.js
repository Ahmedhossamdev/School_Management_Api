const formatClassroomData = classroom => ({
    id: classroom._id,
    name: classroom.name,
    created_at: classroom.created_at,
    updated_at: classroom.updated_at
});

const formatStudentInSchoolData = student => ({
    id: student._id,
    name: student.name,
    email: student.email,
    contactNumber: student.contactNumber,
    address: student.address,
    age: student.age,
    gender: student.gender,
    classroom: student.classroom ? {
        id: student.classroom._id,
        name: student.classroom.name,
    } : null,
    created_at: student.created_at,
    updated_at: student.updated_at,
});

const formatStudentInClassroomData = student => ({
    id: student._id,
    name: student.name,
    email: student.email,
    contactNumber: student.contactNumber,
    address: student.address,
    age: student.age,
    gender: student.gender,
    created_at: student.created_at,
    updated_at: student.updated_at,
});



const formatStudentData = student => ({
    id: student._id,
    name: student.name,
    email: student.email,
    contactNumber: student.contactNumber,
    address: student.address,
    age: student.age,
    gender: student.gender,
    school: student.school ? {
        id: student.school._id,
        name: student.school.name,
    } : null,
    classroom: student.classroom ? {
        id: student.classroom._id,
        name: student.classroom.name,
    } : null,
    created_at: student.created_at,
    updated_at: student.updated_at,
});


const formatSchoolData = school => ({
    id: school._id,
    name: school.name,
    address: school.address,
    website: school.website,
    contactNumber: school.contactNumber,
    establishedYear: school.establishedYear,
    created_at: school.created_at,
    updated_at: school.updated_at,
});

const formatAuthData = user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
});

module.exports = {
    formatClassroomData,
    formatStudentData,
    formatSchoolData,
    formatStudentInSchoolData,
    formatAuthData,
    formatStudentInClassroomData,
};
