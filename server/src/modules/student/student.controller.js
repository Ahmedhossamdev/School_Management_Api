const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {apiFeature} = require("../../shared/utlis/apiFeature");
const {formatStudentData, formatStudentInSchoolData, formatStudentInClassroomData} = require("../../shared/utlis/format.utlis");
const {validateMongoId} = require("../../config/validate.mongodb.id");

const Student = require("./student.model");
const School = require("./../school/school.model")




/***
 * @async
 * @description Add student to school
 * @route       POST  /api/v1/student
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.addStudentToSchool = catchAsync(async (req, res) => {
    const { name, age, gender, address, contactNumber, email, school_id } = req.body;
    const newStudent = await Student.create({
        name,
        age,
        gender,
        address,
        contactNumber,
        email,
        school: school_id,
    });

    const response = apiResponse(true, formatStudentInClassroomData(newStudent));
    return res.status(200).json(response);
});




/***
 * @async
 * @description Get all students in school
 * @route       GET  /api/v1/student/school/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.getAllStudentsInSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    validateMongoId(schoolId);

    // Check if the school exists
    const school = await School.findById(schoolId);
    if (!school){
        return next(new AppError('School not found' , 404));
    }
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = { school: schoolId };
    const result = await apiFeature(Student, filter, page, perPage);
    const formattedData = result.data.map(formatStudentInSchoolData);
    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    return res.status(200).json(response);
});

/***
 * @async
 * @description Get student by id
 * @route       GET  /api/v1/student/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.getStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    validateMongoId(studentId);
    const student = await Student.findById(studentId);

    if (!student) {
        return next(new AppError("Student not found", 404));
    }

    const response = apiResponse(true, formatStudentData(student));
    return res.status(200).json(response);
});

/***
 * @async
 * @description Update student by id
 * @route       PUT  /api/v1/student/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.updateStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    validateMongoId(studentId);
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



/***
 * @async
 * @description Delete student by id
 * @route       DELETE  /api/v1/student/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.deleteStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;
    validateMongoId(studentId);
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
        return next(new AppError('Student not found', 404));
    }

    return res.status(204).json({});
});
