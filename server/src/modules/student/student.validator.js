const {check} = require("express-validator");
const validatorMiddleware = require("./../../shared/middlewares/validator.middleware");
const Student = require("./student.model");



exports.createStudentValidator = [

    check("email")
        .custom(async (value, { req }) => {
            const student = await Student.findOne({ email: value });

            if (student) {
                throw new Error('Email Already Exists');
            }
            return true;
        }),

    check("name")
        .notEmpty()
        .isString()
        .withMessage('name is required')

        .isLength({min: 2})
        .withMessage('Too Short name')

        .isLength({max: 50})
        .withMessage('Too Long name'),

    check("address")
        .notEmpty()
        .withMessage('address must not be empty'),

    check("age")
        .notEmpty()
        .isNumeric()
        .withMessage('age is required'),


    check("contactNumber")
        .isMobilePhone('any')
        .withMessage('Please enter a phone number')
        .custom(async (value, {req}) => {
            const user = await Student.findOne({
                phoneNumber: value,
            });
            if (user) throw new Error('Phone number is already in use');
            return true
        }),

    validatorMiddleware,
]

exports.updateStudentValidator = [

    check("email")
        .optional()
        .custom(async (value, { req }) => {
            const student = await Student.findOne({ email: value });

            if (student) {
                throw new Error('Email Already Exists');
            }
            return true;
        }),

    check("name")
        .optional()
        .notEmpty()
        .isString()
        .withMessage('name is required')

        .isLength({min: 2})
        .withMessage('Too Short name')

        .isLength({max: 50})
        .withMessage('Too Long name'),

    check("address")
        .optional()
        .notEmpty()
        .withMessage('address must not be empty'),

    check("age")
        .optional()
        .notEmpty()
        .isNumeric()
        .withMessage('age is required'),


    check("contactNumber")
        .optional()
        .isMobilePhone('any')
        .withMessage('Please enter a phone number')
        .custom(async (value, {req}) => {
            const user = await Student.findOne({
                phoneNumber: value,
            });
            if (user) throw new Error('Phone number is already in use');
            return true
        }),

    validatorMiddleware,
]