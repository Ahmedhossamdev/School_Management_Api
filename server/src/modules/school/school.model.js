const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String
    },
    website: {
        type: String
    },
    establishedYear: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

const School = mongoose.model('School', SchoolSchema);
module.exports = School;