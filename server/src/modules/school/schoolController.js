const School = require("./schoolModel");
const apiResponse = require("./../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");




exports.createSchool = catchAsync(async (req , res) => {
    const {name, address, contactNumber, website, establishedYear} = req.body;

    const newSchool = await School.create({
        name,
        address,
        contactNumber,
        website,
        establishedYear
    });

    const response = apiResponse(true, {
        id: newSchool._id,
        name: newSchool.name,
        address: newSchool.address,
        contactNumber: newSchool.contactNumber,
        establishedYear: newSchool.establishedYear,
    }, );

    res.status(200).json(response);
});