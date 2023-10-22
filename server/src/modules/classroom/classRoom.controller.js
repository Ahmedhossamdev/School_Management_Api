// Create Classroom


const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const Classroom = require("./classRoom.model");
const Student = require("./../student/student.model");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {paginate} = require("../../shared/utlis/pagination");


const formatClassroomData = classroom => ({
    id: classroom._id,
    name: classroom.name,
    // school: classroom.school,
    created_at: classroom.created_at,
    updated_at: classroom.updated_at
});
// TODO REMOVE THIS
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

exports.createClassroom = catchAsync(async (req, res) => {


    const { name, school } = req.body;
    const newClassroom = await Classroom.create({ name, school });

    const response = apiResponse(true, formatClassroomData(newClassroom));
    res.status(200).json(response);
});

// Get All Classrooms
exports.getAllClassrooms = catchAsync(async (req, res) => {
    const schoolId = req.params.id;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {school : schoolId};
    const result = await paginate(Classroom, filter, page, perPage);

    const formattedData = result.data.map(formatClassroomData);

    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    return res.status(200).json(response);
});


exports.addStudentToClass = catchAsync(async (req, res, next) => {
    const { student_id, classroom_id } = req.body;

    const student = await Student.findById(student_id);
    if (!student) {
        return next(new AppError("Student Not Found",404))
    }

    const classroom = await Classroom.findById(classroom_id);
    if (!classroom) {
        return next(new AppError("Classroom Not Found",404))
    }

    student.classroom = classroom_id;
    await student.save();

    return res.status(200).json({ message: 'Student added to class successfully' });
});


exports.removeStudentFromClass = catchAsync(async (req, res, next) => {
    const { student_id, classroom_id } = req.body;

    console.log(classroom_id);
    const student = await Student.findById(student_id);
    if (!student) {
        return next(new AppError("Student Not Found",404))
    }

    const classroom = await Classroom.findById(classroom_id);
    if (!classroom) {
        return next(new AppError("Classroom Not Found",404))
    }

    if (student.classroom.toString() !== classroom_id) {
        return next(new AppError("Student not found in the provided classroom",404))
    }

    student.classroom = null;
    await student.save();

    return res.status(200).json({ message: 'Student removed from class successfully' });
});







exports.getAllStudentsInClassroom = catchAsync(async (req, res) => {
    const classroomId = req.params.id;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = { classroom: classroomId };

    const result = await paginate(Student, filter, page, perPage);

    const formattedData = result.data.map(formatStudentData);
    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });

    return res.status(200).json(response);
});


// Get Classroom by ID
exports.getClassroom = catchAsync(async (req, res, next) => {
    const classroomId = req.params.id;
    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
        return next(new AppError("Classroom not found", 404));
    }

    const response = apiResponse(true, formatClassroomData(classroom));
    res.status(200).json(response);
});

// Update Classroom
exports.updateClassroom = catchAsync(async (req, res, next) => {
    const classroomId = req.params.id;
    const { name, school } = req.body;

    const updatedClassroom = await Classroom.findByIdAndUpdate(
        classroomId,
        { name, school },
        { new: true, runValidators: true }
    );

    if (!updatedClassroom) {
        return next(new AppError('Classroom not found', 404));
    }

    const response = apiResponse(true, formatClassroomData(updatedClassroom));
    res.status(200).json(response);
});

// Delete Classroom
exports.deleteClassroom = catchAsync(async (req, res, next) => {
    const classroomId = req.params.id;
    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);

    if (!deletedClassroom) {
        return next(new AppError('Classroom not found', 404));
    }

    const response = apiResponse(true, { message: 'Classroom deleted successfully' });
    res.status(200).json(response);
});
