const School = require("./school.model");
const apiResponse = require("./../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const { paginate } = require("../../shared/utlis/pagination");

const formatSchoolData = school => ({
    id: school._id,
    name: school.name,
    address: school.address,
    website: school.website,
    contactNumber: school.contactNumber,
    establishedYear: school.establishedYear,
    created_at: school.created_at,
    updated_at: school.updated_at,
});

const createSchool = catchAsync(async (req, res) => {
    const { name, address, contactNumber, website, establishedYear } = req.body;
    const newSchool = await School.create({
        name,
        address,
        contactNumber,
        website,
        establishedYear,
    });

    const response = apiResponse(true, formatSchoolData(newSchool));
    res.status(200).json(response);
});

const getAllSchools = catchAsync(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 10;
    const filter = {};
    const result = await paginate(School, filter, page, perPage);

    const formattedData = result.data.map(formatSchoolData);

    const response = apiResponse(true, formattedData, {
        total: result.total,
        pages: result.totalPages,
        page,
    });
    res.status(200).json(response);
});

const getSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const school = await School.findById(schoolId);

    if (!school) {
        return next(new AppError("school not found", 404));
    }

    const response = apiResponse(true, formatSchoolData(school));
    res.status(200).json(response);
});

const updateSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const { name, address, contactNumber, website, establishedYear } = req.body;

    const updatedSchool = await School.findByIdAndUpdate(
        schoolId,
        {
            name,
            address,
            contactNumber,
            website,
            establishedYear,
        },
        { new: true, runValidators: true }
    );

    if (!updatedSchool) {
        return next(new AppError('School not found', 404));
    }

    const response = apiResponse(true, formatSchoolData(updatedSchool));
    res.status(200).json(response);
});

const deleteSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    const deletedSchool = await School.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
        return next(new AppError('School not found', 404));
    }

    const response = apiResponse(true, { message: 'School deleted successfully' });
    res.status(200).json(response);
});

module.exports = {
    createSchool,
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
};
