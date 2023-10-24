const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('./../../shared/helpers/jwt_helper')

const User = require('../user/user.model');
const client = require('./../../shared/helpers/inti_redis');
const catchAsync = require("./../../shared/utlis/catchAsync");
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const apiResponse = require("./../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const {formatAuthData} = require("./../../shared/utlis/format.utlis");

/**
 * @async
 * @description Register a new user
 * @route       POST api/v1/auth/signup
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.signup = catchAsync(async (req, res) => {
    const { name, email, phoneNumber, password, passwordConfirm } = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        phoneNumber,
    });


    const access_token = await generateAccessToken(newUser._id);
    const refresh_token = await generateRefreshToken(newUser._id);


    const response = apiResponse(true, formatAuthData(newUser), { access_token,refresh_token } );

    res.status(201).json(response);
});


/**
 * @async
 * @description Signin user
 * @route       POST api/v1/auth/signin
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
exports.signin = catchAsync(async (req, res) => {

    const {email} = req.body;
    const user = req.user;

    const access_token = await generateAccessToken(user._id);
    const refresh_token = await generateRefreshToken(user._id);

    const response = apiResponse(true, formatAuthData(user), {access_token,refresh_token});
    res.status(200).json(response);

});


/**
 * @async
 * @description Generate new refresh token
 * @route       POST api/v1/auth/refresh-token
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */
exports.refreshToken = catchAsync(async (req, res, next) => {

    const {refreshToken} = req.body;
    if (!refreshToken) {
        return next(new AppError("Invalid refresh token", 402));
    }
    const userId = await verifyRefreshToken(refreshToken);


    const access_token = await generateAccessToken(userId);
    const refresh_token = await generateRefreshToken(userId);


    const response = apiResponse(true, {}, {access_token, refresh_token});
    res.status(200).json(response);
});


/**
 * @async
 * @description Logout the user
 * @route       DELETE api/v1/auth/logout
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */
exports.logout = catchAsync(async (req, res, next) => {
    const {refreshToken} = req.body
    if (!refreshToken) {
        return next(new AppError("Invalid refresh token", 402));
    }
    const userId = await verifyRefreshToken(refreshToken);
    client.DEL(userId, (err, val) => {
        if (err) {
            return next(new AppError("Please try again", 402));
        }
    });

    const response = apiResponse(true , {message: 'Logged out successfully'})
    res.status(204).json(response);
});


/**
 * @async
 * @description Authorization
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */
exports.protect = catchAsync(async (req, res, next) => {

    // 1) Getting token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return next(new AppError('Unauthorized', 401));

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.aud);

    if (!currentUser) {
        return next(new AppError('The token belonging to this user does no longer exist', 401));
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});


/**
 * @async
 * @description ROLE Authorization
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */
exports.restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};


