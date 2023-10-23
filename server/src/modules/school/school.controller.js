const School = require("./school.model");
const apiResponse = require("./../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {apiFeature} = require("../../shared/utlis/apiFeature");
const Student = require("../student/student.model");
const {formatSchoolData} = require("./../../shared/utlis/format.utlis");




const createSchool = catchAsync(async (req, res) => {
    const {name, address, contactNumber, website, establishedYear} = req.body;
    const newSchool = await School.create({
        name,
        address,
        contactNumber,
        website,
        establishedYear,
    });

    const response = apiResponse(true, formatSchoolData(newSchool));
    return res.status(201).json(response);
});

const getAllSchools = catchAsync(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {};
    const result = await apiFeature(School, filter, page, perPage);

    const formattedData = result.data.map(formatSchoolData);

    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    return res.status(200).json(response);
});





const getSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const school = await School.findById(schoolId);

    if (!school) {
        return next(new AppError("school not found", 404));
    }

    const response = apiResponse(true, formatSchoolData(school));
    return res.status(200).json(response);
});

const updateSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const updateFields = req.body;

    const updatedSchool = await School.findByIdAndUpdate(
        schoolId,
        updateFields,
        { new: true, runValidators: true }
    );

    if (!updatedSchool) {
        return next(new AppError('School not found', 404));
    }

    const response = apiResponse(true, formatSchoolData(updatedSchool));
    return res.status(200).json(response);
});


const deleteSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const deletedSchool = await School.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
        return next(new AppError('School not found', 404));
    }

    const response = apiResponse(true, {message: 'School deleted successfully'});
    return res.status(200).json(response);
});

module.exports = {
    createSchool,
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
};
