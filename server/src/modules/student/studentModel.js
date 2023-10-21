const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    address: {
        type: String
    },
    contactNumber: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    classroom: {
        type: Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
