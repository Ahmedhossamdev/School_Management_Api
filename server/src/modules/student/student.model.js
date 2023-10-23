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
    classroom: {
        type: Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
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


studentSchema.pre(/^find/ , function(next) {
    this.populate({
        path: 'school',
    });
    next();
});

studentSchema.pre(/^find/ , function(next) {
    this.populate({
        path: 'classroom',
        select : '_id name'
    });
    next();
});




const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
