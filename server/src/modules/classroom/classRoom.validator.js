
const {check} = require("express-validator");
const validatorMiddleware = require("./../../shared/middlewares/validator.middleware");
const ClassRoom = require("../classroom/classRoom.model");

exports.createClassroomValidator = [

    check("name")
        .custom(async (value) => {
            const name = value.toLowerCase();
            const classRoomName = await ClassRoom.findOne({ name: name });

            if (classRoomName) {
                throw new Error('Classroom name already exists');
            }
            return true;
        })

        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 to 50 characters'),


    check("school")
        .notEmpty()
        .withMessage('School must not be empty'),

    validatorMiddleware,
];

exports.addStudentToClassValidator = [
    check("student_id")
        .notEmpty()
        .withMessage('Student ID is required'),

    check("classroom_id")
        .notEmpty()
        .withMessage('Classroom ID is required'),

    validatorMiddleware,
];


exports.updateClassroomValidator = [
    check("name")
        .notEmpty()
        .withMessage('Name is required'),

    validatorMiddleware,
];


exports.removeStudentFromClassValidator = [
    check("student_id")
        .notEmpty()
        .withMessage('Student ID is required'),

    check("classroom_id")
        .notEmpty()
        .withMessage('Classroom ID is required'),

    validatorMiddleware,
];


