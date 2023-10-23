const {check} = require("express-validator");
const validatorMiddleware = require("./../../shared/middlewares/validator.middleware");
const School = require("./school.model");


exports.createSchoolValidator = [

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

    check("website")
        .notEmpty()
        .isString()
        .withMessage('website is required'),


    check("establishedYear")
        .notEmpty()
        .withMessage('establishedYear is required'),


    check("contactNumber")
        .isMobilePhone('any')
        .withMessage('Please enter a phone number')
        .custom(async (value, {req}) => {
            const user = await School.findOne({
                phoneNumber: value,
            });
            if (user) throw new Error('Phone number is already in use');
            return true
        }),

    validatorMiddleware,
]


exports.updateSchoolValidator = [
    check("name")
        .optional()
        .isString()
        .withMessage('name should be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('name length should be between 2 and 50 characters'),

    check("address")
        .optional()
        .isString()
        .withMessage('address should be a string'),

    check("website")
        .optional()
        .isString()
        .withMessage('website should be a string'),

    check("establishedYear")
        .optional()
        .isInt()
        .withMessage('establishedYear should be an integer'),

    check("contactNumber")
        .optional()
        .isMobilePhone('any')
        .withMessage('Please enter a valid phone number')
        .custom(async (value, {req}) => {
            const user = await School.findOne({
                phoneNumber: value,
                _id: { $ne: req.params.id }
            });
            if (user) throw new Error('Phone number is already in use');
            return true;
        }),

    validatorMiddleware,
];

