const paginate = async (model, filter, page, perPage, populateOptions) => {
    const total = await model.countDocuments(filter);
    const totalPages = Math.ceil(total / perPage);

    const data = await model
        .find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate(populateOptions)
        .exec();

    return {
        total,
        totalPages,
        page,
        data,
    };
};

module.exports = {paginate};