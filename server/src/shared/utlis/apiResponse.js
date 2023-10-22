function apiResponse(status, data, meta = null) {
    const content = { data };

    if (meta !== null) {
        content.meta = meta;
    }

    return {
        status,
        content: meta !== null ? { meta, ...content } : { ...content },
    };
}

module.exports = apiResponse;
