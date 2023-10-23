const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const Classroom = require("./classRoom.model");
const Student = require("./../student/student.model");
const School = require("./../school/school.model");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {apiFeature} = require("../../shared/utlis/apiFeature");
const {formatClassroomData, formatStudentData} = require("../../shared/utlis/format.utlis");
const {validateMongoId} = require("../../config/validate.mongodb.id");


exports.createClassroom = catchAsync(async (req, res, next) => {

    const {name, school_id} = req.body;
    validateMongoId(school_id);
    const school = await School.findById(school_id);
    if (!school){
         return next(new AppError("School not found" , 404));
    }
    const newClassroom = await Classroom.create({name, school_id});

    const response = apiResponse(true, formatClassroomData(newClassroom));
    return res.status(200).json(response);
});

// Get All Classrooms
exports.getAllClassrooms = catchAsync(async (req, res) => {
    const schoolId = req.params.id;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {school: schoolId};
    const result = await apiFeature(Classroom, filter, page, perPage);

    const formattedData = result.data.map(formatClassroomData);

    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    return res.status(200).json(response);
});


exports.addStudentToClass = catchAsync(async (req, res, next) => {
    const {student_id, classroom_id} = req.body;

    validateMongoId(student_id);
    validateMongoId(classroom_id);
    const student = await Student.findById(student_id);
    if (!student) {
        return next(new AppError("Student Not Found", 404))
    }

    const classroom = await Classroom.findById(classroom_id);
    if (!classroom) {
        return next(new AppError("Classroom Not Found", 404))
    }

    student.classroom = classroom;
    await student.save();

    const response = apiResponse(true, formatStudentData(student));
    return res.status(200).json(response);
});


exports.removeStudentFromClass = catchAsync(async (req, res, next) => {
    const { student_id, classroom_id } = req.body;

    const student = await Student.findById(student_id);
    if (!student) {
        return next(new AppError("Student not found", 404));
    }

    const classroom = await Classroom.findById(classroom_id);
    if (!classroom) {
        return next(new AppError("Classroom not found", 404));
    }

    if (!student.classroom || student.classroom.id !== classroom_id) {
        return next(new AppError("Student not found in the provided classroom", 404));
    }

    student.classroom = null;
    await student.save();

    const response = apiResponse(true, { message: "Student removed from class successfully" });
    return res.status(201).json(response);
});


exports.getAllStudentsInClassroom = catchAsync(async (req, res) => {
    const classroomId = req.params.id;
    validateMongoId(classroomId);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {classroom: classroomId};

    const result = await apiFeature(Student, filter, page, perPage);

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
    validateMongoId(classroomId);
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
    validateMongoId(classroomId);
    const {name} = req.body;

    const updatedClassroom = await Classroom.findByIdAndUpdate(
        classroomId,
        {name},
        {new: true, runValidators: true}
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
    validateMongoId(classroomId);
    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);

    if (!deletedClassroom) {
        return next(new AppError('Classroom not found', 404));
    }

    const response = apiResponse(true, {message: 'Classroom deleted successfully'});
    res.status(200).json(response);
});
