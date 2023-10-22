// Create Student
const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const Student = require("./student.model");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {paginate} = require("../../shared/utlis/pagination");
const School = require("../school/school.model");


const formatStudentData = student => ({
    id: student._id,
    name: student.name,
    email: student.email,
    contactNumber: student.contactNumber,
    address: student.address,
    classroom: student.classroom,
    age: student.age,
    gender: student.gender,
    createdAt: student.createdAt,
});

exports.addStudentToSchool = catchAsync(async (req, res) => {
    const { name, age, gender, address, contactNumber, email, school } = req.body;
    const newStudent = await Student.create({
        name,
        age,
        gender,
        address,
        contactNumber,
        email,
        school: school,
    });

    const response = apiResponse(true, formatStudentData(newStudent));
    return res.status(200).json(response);
});





exports.getAllStudentsInSchool = catchAsync(async (req, res) => {
    const schoolId = req.params.id;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = { school: schoolId };
    const result = await paginate(Student, filter, page, perPage);

    const formattedData = result.data.map(formatStudentData);

    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    return res.status(200).json(response);
});

// Get Student by ID
exports.getStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
        return next(new AppError("Student not found", 404));
    }

    const response = apiResponse(true, formatStudentData(student));
    return res.status(200).json(response);
});

// Update Student
exports.updateStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    const { name, age, gender, address, contactNumber, email, classroom } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
            name,
            age,
            gender,
            address,
            contactNumber,
            email,
            classroom
        },
        { new: true, runValidators: true }
    );

    if (!updatedStudent) {
        return next(new AppError('Student not found', 404));
    }

    const response = apiResponse(true, formatStudentData(updatedStudent));
    return res.status(200).json(response);
});

// Delete Student
exports.deleteStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
        return next(new AppError('Student not found', 404));
    }

    const response = apiResponse(true, { message: 'Student deleted successfully' });
    return res.status(200).json(response);
});