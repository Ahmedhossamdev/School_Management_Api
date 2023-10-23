const mongoose = require("mongoose");
const AppError = require("./../shared/utlis/appError");

exports.validateMongoId = (id) => {
    const ok = mongoose.Types.ObjectId.isValid(id);
    if (!ok) throw (new AppError("This id is not valid"));
}