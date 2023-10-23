function apiResponse(status, data, meta = null) {
    const content = { data };
    let responseStatus = status ? 'success' : 'fail';

    if (meta !== null) {
        content.meta = meta;
    }

    return {
        status: responseStatus,
        content: meta !== null ? { meta, ...content } : { ...content },
    };
}

module.exports = apiResponse;
