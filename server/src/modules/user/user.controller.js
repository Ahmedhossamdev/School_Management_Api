const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const User = require("./user.model");
const {apiFeature} = require("../../shared/utlis/apiFeature");
const {validateMongoId} = require("../../config/validate.mongodb.id");

const{ formatUserData} = require("./../../shared/utlis/format.utlis");



/**
 * @async
 * @description Get all users
 * @route       GET api/v1/user
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */

const getAllUsers = catchAsync(async (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {};
    const result = await apiFeature(User, filter, page, perPage);

     if (!result){
         return next(new AppError("Users Not Found", 404));
     }
     const formattedData = result.data.map(formatUserData);
     const response = apiResponse(true, formattedData);
     res.status(200).json(response);
});



/**
 * @async
 * @description Update user by id
 * @route       PUT api/v1/user/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */

const updateUser = catchAsync(async (req, res, next) => {
    const updateFields = req.body;
    const userId = req.params.id;
    validateMongoId(userId);
    const user = await User.findByIdAndUpdate(
        userId,
        updateFields,
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    const response = apiResponse(true, formatUserData(user));
    return res.status(200).json(response);
});



/**
 * @async
 * @description Delete user by id
 * @route       DELETE api/v1/user/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */

const deleteUser = catchAsync(async (req, res, next) =>{
    const userId = req.params.id;
    validateMongoId(userId);
    const user = await User.findByIdAndDelete(userId);

    if (!user){
        return next(new AppError("User not found", 404));
    }

    return res.status(204).json({});
});




const getMe  = (req ,res , next) => {
    req.params.id = req.user.id;
    next();
}



/**
 * @async
 * @description  Get user by id
 * @route        GET api/v1/user/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 * @param       {Object} next - Express next middleware
 */
const getUser = catchAsync(async(req , res , next) =>{
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user){
        return next(new AppError("User not found" , 404));
    }

    const response = apiResponse(true,formatUserData(user));
    return res.status(200).json(response);
});




module.exports = {updateUser, getUser, getMe, getAllUsers, deleteUser};


