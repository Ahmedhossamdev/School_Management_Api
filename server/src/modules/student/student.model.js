const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema({
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
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
});


studentSchema.pre(/^find/ , function(next) {
    this.populate({
        path: 'school',
    });
    next();
});



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
