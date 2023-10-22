// Create Student
const apiResponse = require("../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const User = require("./user.model");

const formatUserData = user => ({
    id: user._id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
    photo: user.photo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const updateUserRole = catchAsync(async (req, res, next) => {
    const role = req.body.role;
    const userId = req.params.id;

    if (role !== 'superadmin' && role !== 'admin' && role !== 'teacher' && role !== 'student'){
          return next(new AppError("Enter a valid role", 402));
    }
    const user = await User.findByIdAndUpdate(
        userId,
        {
            role,
        },
        {new: true, runValidators: true}
    );

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    const response = apiResponse(true, formatUserData(user));
    return res.status(200).json(response);
});

module.exports = {updateUserRole};


