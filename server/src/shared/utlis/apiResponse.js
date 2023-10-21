function apiResponse(status, data, meta = null) {
    const content = { data };

    if (meta !== null) {
        content.meta = meta;
    }

    return {
        status,
        content,
    };
}


module.exports = apiResponse;
