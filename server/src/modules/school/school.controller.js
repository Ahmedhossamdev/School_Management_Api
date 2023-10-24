const School = require("./school.model");
const apiResponse = require("./../../shared/utlis/apiResponse");
const AppError = require("../../shared/utlis/appError");
const catchAsync = require("./../../shared/utlis/catchAsync");
const {apiFeature} = require("../../shared/utlis/apiFeature");
const {formatSchoolData} = require("./../../shared/utlis/format.utlis");
const {validateMongoId} = require("../../config/validate.mongodb.id");



/**
 * @async
 * @description Create new school
 * @route       POST /api/v1/school
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
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



/**
 * @async
 * @description Get all school
 * @route       GET /api/v1/school
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
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



/***
* @async
* @description Get school by id
* @route       GET /api/v1/school/:id
* @param       {Object} req - Express request object
* @param       {Object} res - Express response object
*/
const getSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    validateMongoId(schoolId);
    const school = await School.findById(schoolId);

    if (!school) {
        return next(new AppError("school not found", 404));
    }

    const response = apiResponse(true, formatSchoolData(school));
    return res.status(200).json(response);
});


/***
 * @async
 * @description Update school by id
 * @route       PUT /api/v1/school/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
const updateSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    validateMongoId(schoolId);
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

/***
 * @async
 * @description Delete school by id
 * @route       DELETE /api/v1/school/:id
 * @param       {Object} req - Express request object
 * @param       {Object} res - Express response object
 */
const deleteSchool = catchAsync(async (req, res, next) => {
    const schoolId = req.params.id;
    validateMongoId(schoolId);
    const deletedSchool = await School.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
        return next(new AppError('School not found', 404));
    }

    return res.status(204).json({});
});

module.exports = {
    createSchool,
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
};
