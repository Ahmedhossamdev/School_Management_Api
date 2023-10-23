const {check} = require("express-validator");
const validatorMiddleware = require("./../../shared/middlewares/validator.middleware");
const User = require('../user/user.model');



exports.signupValidator = [

    check("name")
        .notEmpty()
        .withMessage('name is required')

        .isString()
        .matches(/^[\p{L} ]+$/u)
        .withMessage('Please enter a letter only')

        .isLength({min: 8})
        .withMessage('Too Short name')

        .isLength({max: 50})
        .withMessage('Too Long name'),

    check("email")
        .notEmpty()
        .withMessage('email must not be empty')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .custom(async (value) => {
            const user = await User.findOne({
                email: value,
            });
            if (user) throw new Error('Email is already in use');
            return true
        }),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
        .withMessage('Password must contain at least one uppercase letter and one lowercase letter'),

    check('passwordConfirm')
        .notEmpty().withMessage('Password confirmation is required')
        .custom((passwordConfirm, {req}) => {
            if (passwordConfirm !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    check("phoneNumber")
        .isMobilePhone('any')
        .withMessage('Please enter a valid phone number')
        .custom(async (value) => {
            const user = await User.findOne({
                phoneNumber: value,
            });
            if (user) throw new Error('Phone number is already in use');
            return true
        }),

    validatorMiddleware,
]

exports.signInValidator = [
    check("email")
        .notEmpty()
        .withMessage('Email must not be empty')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .bail() // stops the validation chain if previous validations have failed
        .custom(async (value , {req}) => {
            const user = await User.findOne({ email: value });

            if (!user) {
                throw new Error('Invalid credentials');
            }
            req.user = user;
            return true;
        }),
    check("password")
        .notEmpty()
        .withMessage('Password is required')
        .bail() // stops the validation chain if previous validations have failed
        .custom(async (value, { req }) => {

            if(!req.user){
                throw new Error('Invalid credentials');
            }
            const isMatched = await req.user.correctPassword(value);
            if (!isMatched) {
                throw new Error('Invalid credentials');
            }
            return true;
        }),
    validatorMiddleware,
];
